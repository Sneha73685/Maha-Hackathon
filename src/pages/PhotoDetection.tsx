
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PhotoDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  // resultUrl is always /result/image after detection (API contract given)
  const [resultReady, setResultReady] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept images
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPG, PNG, GIF)",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setResultReady(false);
    handleDetection(file);
  };

  const handleDetection = async (file: File) => {
    setIsLoading(true);

    // Prepare FormData for API
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload file to the fastapi backend
      const response = await fetch("/predict/image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Optionally check for "result_image_url" in response, but we assume /result/image
        toast({
          title: "Photo Analysis Complete",
          description: "Drone analysis for the uploaded photo is finished.",
        });
        setResultReady(true);
      } else {
        toast({
          title: "Upload failed",
          description: "Could not analyze the photo. Please try again.",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Network error",
        description: "Failed to upload photo for analysis.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    // Download from the known result endpoint
    const link = document.createElement("a");
    link.href = "/result/image";
    link.download = uploadedFile
      ? `detected-${uploadedFile.name.replace(/\.(jpg|jpeg|png|gif)$/i, "")}.jpg`
      : "detection-result.jpg";
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="bg-dome-darker border-dome-purple/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <ImageIcon className="h-6 w-6" />
            Photo Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
              <Loader className="h-12 w-12 text-dome-purple animate-spin" />
              <p className="text-dome-purple-light">Analyzing uploaded photo...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-dome-purple/20 rounded-lg p-8 text-center hover:border-dome-purple/40 transition-colors"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={handleFileUpload}
                />
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-dome-purple-light" />
                <p className="text-dome-purple-light mb-2">
                  Drag and drop or click to upload a photo
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, GIF image files
                </p>
              </div>

              {uploadedFile && (
                <div className="p-4 bg-dome-purple/10 rounded-lg flex flex-col gap-2 items-center">
                  <p className="text-dome-purple-light mb-2">
                    Selected photo: {uploadedFile.name}
                  </p>
                  {resultReady && (
                    <Button
                      className="flex items-center gap-2 bg-dome-green hover:bg-dome-green/80 text-white"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                      Download Analyzed Photo
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
