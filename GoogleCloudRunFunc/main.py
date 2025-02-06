import os
import tempfile
import requests
import cv2
import numpy as np
from google.cloud import aiplatform
from flask import jsonify
import functions_framework
# from ultralytics import YOLO  # Import YOLO for object detection

# Initialize Vertex AI
aiplatform.init(project="951662577119", location="us-central1")

# Load YOLO model globally to avoid reloading for every request
# yolo_model = YOLO("yolov8n.pt")  # Load YOLO model

# Function to detect ball-and-bat collision using YOLO at reduced frame rate
# def detect_collision(cap, yolo_model):
#     total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#     original_fps = int(cap.get(cv2.CAP_PROP_FPS))
#     target_fps = 5  # Target frame rate
#     frame_step = max(1, original_fps // target_fps)  # Calculate step size to achieve target FPS
    
#     cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Start from the beginning
#     collision_frame_id = 50
    
#     for frame_id in range(0, total_frames, frame_step):  # Process every `frame_step`-th frame
#         cap.set(cv2.CAP_PROP_POS_FRAMES, frame_id)
#         ret, frame = cap.read()
#         if not ret:
#             break
        
#         results = yolo_model(frame, verbose=False)
#         detected_objects = results[0].boxes.data.cpu().numpy() if results[0].boxes is not None else []
        
#         ball_detected = any(obj[5] == 32 for obj in detected_objects)  # Ball class ID
#         bat_detected = any(obj[5] == 34 for obj in detected_objects)  # Bat class ID
        
#         if ball_detected and bat_detected:
#             collision_frame_id = frame_id
#             break
    
#     cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Reset video capture position
#     return collision_frame_id

# Edge-Based Collision Detection
def detect_collision(cap):
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    collision_frame_id = 50  # Default value if no collision is detected
    
    for frame_id in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break
        
        # Convert to grayscale
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Apply Gaussian blur to reduce noise
        blurred_frame = cv2.GaussianBlur(gray_frame, (5, 5), 0)
        
        # Perform Canny edge detection
        edges = cv2.Canny(blurred_frame, threshold1=50, threshold2=150)
        
        # Find contours in the edge-detected image
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        ball_detected = False
        bat_detected = False
        
        for contour in contours:
            area = cv2.contourArea(contour)
            if area < 100:  # Ignore small contours (noise)
                continue
            
            # Approximate the contour to a polygon
            perimeter = cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, 0.02 * perimeter, True)
            
            # Detect ball (circular shape)
            if len(approx) > 6 and 100 < area < 500:  # Circular objects have many vertices
                ball_detected = True
            
            # Detect bat (elongated shape)
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = float(w) / h
            if 2 < aspect_ratio < 10 and 500 < area < 2000:  # Bat has an elongated shape
                bat_detected = True
        
        # If both ball and bat are detected, record the collision frame ID and exit
        if ball_detected and bat_detected:
            collision_frame_id = frame_id
            break
    
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Reset video capture position
    return collision_frame_id


# Function to extract frames from video
def preprocess_video(video_path, frame_count=5):
    try:
        cap = cv2.VideoCapture(video_path)
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        
        # Detect ball-and-bat collision using YOLO
        collision_frame_id = detect_collision(cap)
        if collision_frame_id == -1:
            print("No collision detected.")
            cap.release()
            return None
        
        # Extract frames starting from the collision frame with an interval of fps//2
        start_frame_id = collision_frame_id
        frame_interval = fps // 2  # Interval of half a second
        selected_frames = []
        
        for i in range(frame_count):
            frame_id = start_frame_id + i * frame_interval
            if frame_id < int(cap.get(cv2.CAP_PROP_FRAME_COUNT)):  # Ensure we don't exceed total frames
                cap.set(cv2.CAP_PROP_POS_FRAMES, frame_id)
                ret, frame = cap.read()
                if ret:
                    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                    frame = cv2.resize(frame, (128, 128))  # Resize to 128x128
                    frame = np.uint8(frame)
                    frame = np.expand_dims(frame, axis=-1)  # Add channel dimension
                    selected_frames.append(frame)
            else:
                break
        
        cap.release()
        if len(selected_frames) != frame_count:
            return None
        return np.array(selected_frames, dtype=np.float16)  # Use float16 to reduce size
    except Exception as e:
        print(f"Error during video preprocessing: {e}")
        return None

@functions_framework.http
def hello_http(request):
    """
    HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
    Returns:
        The response text or JSON object containing the prediction results.
    """
    # Handle CORS preflight request
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
        return ("", 204, headers)
    
    # Set CORS headers for the main request
    headers = {"Access-Control-Allow-Origin": "*"}
    
    # Check if the request contains form data (file upload)
    if 'file' in request.files:
        file = request.files['file']
        # Save the uploaded file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
            file.save(temp_file.name)
            video_path = temp_file.name
    elif request.json and 'video_url' in request.json:
        # Download the video from the provided URL
        video_url = request.json['video_url']
        video_path = "/tmp/temp_video.mp4"
        try:
            response = requests.get(video_url, stream=True)
            response.raise_for_status()
            with open(video_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=1024):
                    f.write(chunk)
        except Exception as e:
            return jsonify({"error": f"Failed to download video: {str(e)}"}), 400, headers
    else:
        return jsonify({"error": "Missing 'video_url' or 'file' in request"}), 400, headers
    
    # Preprocess the video
    video_frames = preprocess_video(video_path)
    if video_frames is None:
        return jsonify({"error": "Video preprocessing failed"}), 400, headers
    
    # Convert float16 data to list of float32 for JSON serialization compatibility
    instances = video_frames.astype(np.float32).tolist()
    
    endpoint_id = "2757532281508724736"
    try:
        endpoint = aiplatform.Endpoint(
            endpoint_name=f"projects/951662577119/locations/us-central1/endpoints/{endpoint_id}"
        )
        prediction = endpoint.predict(instances=[instances])
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500, headers
    
    # Clean up temporary files
    if os.path.exists(video_path):
        os.remove(video_path)
    
    return jsonify({"prediction": prediction.predictions}), 200, headers