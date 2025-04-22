// api.js - Central service for API communication
// Place this in your frontend project's services directory

const API_BASE_URL = 'http://localhost:8000'; // Change this to match your backend server URL
let streamActive = false;
let streamImage = null;
/**
 * DomeWatch API Service
 * Handles all communication with the backend services
 */
class DomeWatchAPI {
  /**
   * Health check to verify backend connectivity
   * @returns {Promise<Object>} Health status information
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Backend service unavailable');
    }
  }

  /**
   * Image-based drone detection
   * @param {File} imageFile - The image file to analyze
   * @returns {Promise<Object>} Detection results with annotated image URL and detection data
   */
  async detectDronesInImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch(`${API_BASE_URL}/predict/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Image processing failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Image detection failed:', error);
      throw error;
    }
  }

  /**
   * Video-based drone detection
   * @param {File} videoFile - The video file to analyze
   * @param {Function} onProgress - Optional callback for progress updates
   * @returns {Promise<Blob>} Processed video as blob
   */
  async detectDronesInVideo(videoFile, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('file', videoFile);

      const response = await fetch(`${API_BASE_URL}/predict/video`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Video processing failed');
      }

      return await response.blob();
    } catch (error) {
      console.error('Video detection failed:', error);
      throw error;
    }
  }

  /**
   * Start the webcam stream
   * @returns {Promise<Object>} Status of the stream start operation
   */
  async startWebcamStream() {
    try {
      
            // Start the stream on the server
            await fetch('/stream/start');
            
            // Create image element if it doesn't exist
            if (!streamImage) {
                streamImage = document.createElement('img');
                streamImage.className = 'webcam-feed';
                streamImage.alt = 'Webcam Feed';
            }
            
            // Set the source with cache-busting parameter
            streamImage.src = '/stream/webcam?t=' + new Date().getTime();
            
            // Replace placeholder with stream
            const streamContainer = document.getElementById('stream-container');
            streamContainer.innerHTML = '';
            streamContainer.appendChild(streamImage);
            
            streamActive = true;
        } catch (error) {
            console.error('Error starting stream:', error);
            alert('Error starting webcam stream');
            stopWebcamStream();
        }
  }

  /**
   * Stop the webcam stream
   * @returns {Promise<Object>} Status of the stream stop operation
   */
  async stopWebcamStream() {
    try {
      const response = await fetch(`${API_BASE_URL}/stream/stop`);
      return await response.json();
    } catch (error) {
      console.error('Failed to stop stream:', error);
      throw new Error('Unable to stop webcam stream');
    }
  }

  /**
   * Get the current stream status
   * @returns {Promise<Object>} Stream status information
   */
  async getStreamStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/stream/status`);
      return await response.json();
    } catch (error) {
      console.error('Failed to get stream status:', error);
      throw new Error('Unable to check stream status');
    }
  }

  /**
   * Get the webcam stream URL with cache busting
   * @returns {string} URL for the webcam stream
   */
  getWebcamStreamUrl() {
    return `${API_BASE_URL}/stream/webcam?t=${new Date().getTime()}`;
  }

  /**
   * Get the URL for a result image
   * @param {string} filename - The filename of the result image
   * @returns {string} Full URL to the result image
   */
  getResultImageUrl(filename) {
    return `${API_BASE_URL}/result/image/${filename}`;
  }
}

export default new DomeWatchAPI();