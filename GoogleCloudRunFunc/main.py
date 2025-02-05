import os
import requests
import cv2
import numpy as np
from google.cloud import aiplatform
import functions_framework

# Initialize Vertex AI
aiplatform.init(project="951662577119", location="us-central1")

# Function to download video
def download_video(video_url, save_path):
    response = requests.get(video_url, stream=True)
    with open(save_path, 'wb') as file:
        for chunk in response.iter_content(chunk_size=1024):
            file.write(chunk)

# Function to detect ball-and-bat collision
def detect_collision(cap):
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    prev_frame = None
    collision_frame_id = 0

    for frame_id in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray_frame = cv2.GaussianBlur(gray_frame, (21, 21), 0)

        if prev_frame is None:
            prev_frame = gray_frame
            continue

        frame_diff = cv2.absdiff(prev_frame, gray_frame)
        _, thresh = cv2.threshold(frame_diff, 30, 255, cv2.THRESH_BINARY)
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        if any(cv2.contourArea(contour) > 500 for contour in contours):
            collision_frame_id = frame_id
            break

        prev_frame = gray_frame

    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    return collision_frame_id

# Function to extract frames from video
def preprocess_video(video_url, frame_count=5):
    try:
        video_path = "/tmp/temp_video.mp4"
        download_video(video_url, video_path)
        cap = cv2.VideoCapture(video_path)

        # Detect ball-and-bat collision
        collision_frame_id = detect_collision(cap)

        frames = []
        cap.set(cv2.CAP_PROP_POS_FRAMES, collision_frame_id)

        for _ in range(frame_count):
            ret, frame = cap.read()
            if not ret:
                break

            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            frame = cv2.resize(frame, (128, 128))  # Updated resolution

            frame = np.uint8(frame)  
            frame = np.expand_dims(frame, axis=-1)  

            frames.append(frame)

        cap.release()
        os.remove(video_path)

        if len(frames) != frame_count:
            return None
        
        return np.array(frames, dtype=np.float16)  # Use float16 to reduce size
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
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'video_url' in request_json:
        video_url = request_json['video_url']
    elif request_args and 'video_url' in request_args:
        video_url = request_args['video_url']
    else:
        return {"error": "Missing 'video_url' in request"}, 400

    video_frames = preprocess_video(video_url)
    if video_frames is None:
        return {"error": "Video preprocessing failed"}, 400

    # Convert float16 data to list of float32 for JSON serialization compatibility
    instances = video_frames.astype(np.float32).tolist()

    endpoint_id = "4199810062174126080"
    try:
        endpoint = aiplatform.Endpoint(
            endpoint_name=f"projects/951662577119/locations/us-central1/endpoints/{endpoint_id}"
        )
        prediction = endpoint.predict(instances=[instances])
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}, 500

    return {"prediction": prediction.predictions}, 200
