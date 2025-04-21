
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Webcam } from "lucide-react";

export default function CameraDetection() {
  const [isStreaming, setIsStreaming] = useState(false);
  
  const toggleCamera = async () => {
    if (!isStreaming) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.getElementById('camera-feed') as HTMLVideoElement;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
        setIsStreaming(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      const videoElement = document.getElementById('camera-feed') as HTMLVideoElement;
      const stream = videoElement?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      if (videoElement) {
        videoElement.srcObject = null;
      }
      setIsStreaming(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="bg-dome-darker border-dome-purple/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Webcam className="h-6 w-6" />
            Camera Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                id="camera-feed"
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              onClick={toggleCamera}
              className="bg-dome-purple hover:bg-dome-purple-dark text-white"
            >
              {isStreaming ? 'Stop Camera' : 'Start Camera'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
