//  - Main detection component for DomeWatch
// Place this in your frontend project's components directory

import React, { useState, useEffect, useRef } from 'react';
import DomeWatchAPI from '../services/api';

const DroneDetection = () => {
  const [activeTab, setActiveTab] = useState('webcam');
  const [streamActive, setStreamActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null);
  
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    // Check stream status on component mount
    const checkStreamStatus = async () => {
      try {
        const { active } = await DomeWatchAPI.getStreamStatus();
        setStreamActive(active);
      } catch (err) {
        console.error('Error checking stream status:', err);
      }
    };

    checkStreamStatus();

    // Clean up when component unmounts
    return () => {
      if (streamActive) {
        DomeWatchAPI.stopWebcamStream().catch(console.error);
      }
      if (processedVideoUrl) {
        URL.revokeObjectURL(processedVideoUrl);
      }
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset results when changing tabs
    setDetectionResults(null);
    setProcessedVideoUrl(null);
    setError(null);
  };

  const startStream = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await DomeWatchAPI.startWebcamStream();
      setStreamActive(true);
      
      if (streamRef.current) {
        streamRef.current.src = DomeWatchAPI.getWebcamStreamUrl();
        streamRef.current.onerror = () => {
          setError('Error loading stream. Please try again.');
          stopStream();
        };
      }
    } catch (err) {
      setError(`Failed to start stream: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const stopStream = async () => {
    setIsLoading(true);
    
    try {
      await DomeWatchAPI.stopWebcamStream();
      setStreamActive(false);
      if (streamRef.current) {
        streamRef.current.src = '';
      }
    } catch (err) {
      setError(`Failed to stop stream: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    
    if (!file) {
      setError('Please select an image file');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDetectionResults(null);
    
    try {
      const results = await DomeWatchAPI.detectDronesInImage(file);
      setDetectionResults(results);
    } catch (err) {
      setError(`Detection failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    const file = videoInputRef.current.files[0];
    
    if (!file) {
      setError('Please select a video file');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessedVideoUrl(null);
    
    try {
      const videoBlob = await DomeWatchAPI.detectDronesInVideo(file);
      const videoUrl = URL.createObjectURL(videoBlob);
      setProcessedVideoUrl(videoUrl);
    } catch (err) {
      setError(`Video processing failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="drone-detection-container">
      <h1>DomeWatch - AI Drone Detection</h1>
      
      <div className="detection-tabs">
        <button 
          className={activeTab === 'webcam' ? 'active' : ''} 
          onClick={() => handleTabChange('webcam')}
        >
          Live Detection
        </button>
        <button 
          className={activeTab === 'image' ? 'active' : ''} 
          onClick={() => handleTabChange('image')}
        >
          Image Upload
        </button>
        <button 
          className={activeTab === 'video' ? 'active' : ''} 
          onClick={() => handleTabChange('video')}
        >
          Video Upload
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Webcam Stream Tab */}
      {activeTab === 'webcam' && (
        <div className="webcam-section">
          <h2>Live Drone Detection</h2>
          <div className="stream-container">
            {streamActive ? (
              <img 
                ref={streamRef}
                className="webcam-stream" 
                src={DomeWatchAPI.getWebcamStreamUrl()} 
                alt="Live drone detection stream" 
              />
            ) : (
              <div className="stream-placeholder">
                <p>Stream not active. Click Start to begin detection.</p>
              </div>
            )}
          </div>
          <div className="stream-controls">
            <button 
              onClick={startStream} 
              disabled={streamActive || isLoading}
              className="start-button"
            >
              {isLoading ? 'Starting...' : 'Start Detection'}
            </button>
            <button 
              onClick={stopStream} 
              disabled={!streamActive || isLoading}
              className="stop-button"
            >
              {isLoading ? 'Stopping...' : 'Stop Detection'}
            </button>
          </div>
        </div>
      )}

      {/* Image Upload Tab */}
      {activeTab === 'image' && (
        <div className="image-upload-section">
          <h2>Image-based Drone Detection</h2>
          <form onSubmit={handleImageUpload}>
            <div className="file-input-container">
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="detect-button"
            >
              {isLoading ? 'Processing...' : 'Detect Drones'}
            </button>
          </form>

          {detectionResults && (
            <div className="detection-results">
              <h3>Detection Results</h3>
              <div className="result-image-container">
                <img 
                  src={`${detectionResults.result_image_url}?t=${new Date().getTime()}`}
                  alt="Detection results" 
                  className="result-image"
                />
              </div>
              <div className="detection-stats">
                <p>Detected {detectionResults.midpoints.length} object(s)</p>
                {detectionResults.midpoints.length > 0 && (
                  <div className="midpoints-list">
                    <h4>Object Coordinates:</h4>
                    <ul>
                      {detectionResults.midpoints.map((point, index) => (
                        <li key={index}>
                          Object {index + 1}: ({point.mid_x}, {point.mid_y})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Video Upload Tab */}
      {activeTab === 'video' && (
        <div className="video-upload-section">
          <h2>Video-based Drone Detection</h2>
          <form onSubmit={handleVideoUpload}>
            <div className="file-input-container">
              <input 
                type="file" 
                ref={videoInputRef}
                accept="video/*" 
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="process-button"
            >
              {isLoading ? 'Processing Video...' : 'Process Video'}
            </button>
          </form>

          {isLoading && activeTab === 'video' && (
            <div className="processing-message">
              <p>Processing video... This may take several minutes depending on video length and complexity.</p>
            </div>
          )}

          {processedVideoUrl && (
            <div className="video-results">
              <h3>Processed Video</h3>
              <div className="video-player-container">
                <video 
                  controls 
                  className="processed-video"
                  src={processedVideoUrl}
                ></video>
              </div>
              <a 
                href={processedVideoUrl} 
                download="domewatch_detection.mp4"
                className="download-button"
              >
                Download Processed Video
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DroneDetection;