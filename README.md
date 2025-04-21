# DomeWatch – Hybrid Anti-Drone Security System

**DomeWatch** is a hybrid anti-drone security system designed to detect and track unauthorized drones using AI-powered computer vision. It is aimed at enhancing airspace security for restricted areas such as borders, airports, military zones, and public events. This prototype was developed as part of a hackathon project and lays the foundation for future integration with IoT-based countermeasures.

---

## Features

- Real-time drone detection using computer vision techniques  
- Deep learning-based object detection model (YOLOv8)  
- Surveillance through live video stream analysis  
- Logging of drone detections with timestamps  
- Modular structure for easy integration with additional systems (e.g., jammers, alert systems)

---

## Project Structure

DomeWatch/ │ ├── dataset/ # Sample dataset for training or testing ├── models/ # YOLOv8 weights ├── src/ # Source code │ ├── detector.py # Drone detection logic │ ├── camera_stream.py # Video input stream setup │ └── utils.py # Utility functions ├── results/ # Output screenshots or logs ├── requirements.txt # List of dependencies └── README.md # Project documentation

yaml
Copy
Edit

---

## How It Works

1. Captures video input from a webcam or external camera.
2. Processes each frame using a YOLOv8-based object detection model.
3. Identifies drones and logs the detection time and data.
4. Can be extended to trigger alerts or activate defense mechanisms.

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip
- OpenCV
- PyTorch
- Ultralytics (YOLOv8)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Sneha73685/DomeWatch.git
   cd DomeWatch
Install the required dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Download the YOLOv8 weights and place them in the models/ folder.

Run the detection script:

bash
Copy
Edit
python src/detector.py
Use Cases
Securing national borders

Airport and airspace surveillance

Protection of military zones

Safety at public events and private properties

Future Enhancements
Integration with radar and RF-based tracking

Automatic counter-drone actions (e.g., jammers, signal disruptors)

Real-time dashboard for monitoring

Alerts via SMS, email, or siren systems

Drone classification and threat level assessment

Team & Acknowledgements
This project was developed by Sneha and team during a national-level hackathon.
Special thanks to the open-source community, especially contributors of the YOLOv8 framework by Ultralytics.

License
This project is licensed under the MIT License.

vbnet
Copy
Edit

You can copy this and paste it directly into your GitHub repo’s `README.md` file. Let me know if you'd like to add demo images, a video walkthrough, or contributor details.








