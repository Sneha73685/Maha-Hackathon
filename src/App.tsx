import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MongoDBProvider } from "@/context/MongoDBContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./i18n/config";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Detection from "./pages/Detection";
import Countermeasures from "./pages/Countermeasures";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Operators from "./pages/Operators";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CameraDetection from "./pages/CameraDetection";
import PhotoDetection from "./pages/PhotoDetection";
import VideoDetection from "./pages/VideoDetection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MongoDBProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/detection" element={<Detection />} />
              <Route path="/camera-detection" element={<CameraDetection />} />
              <Route path="/photo-detection" element={<PhotoDetection />} />
              <Route path="/video-detection" element={<VideoDetection />} />
              <Route path="/countermeasures" element={<Countermeasures />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/operators" element={<Operators />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </MongoDBProvider>
  </QueryClientProvider>
);

export default App;
