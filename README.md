# Google MLB Hackathon 

---

## **Overview**
This project aims to predict key metrics of a baseball hit—**Exit Velocity**, **Hit Distance**, and **Launch Angle**—from video footage of the ball-and-bat collision. The solution leverages a combination of deep learning models, computer vision techniques, and Google Cloud services to preprocess videos, extract features, and make predictions.

The model architecture is designed to handle sequential data (video frames) using a hybrid approach that combines a pre-trained **MobileNetV2** convolutional neural network (CNN) for feature extraction and an **LSTM** (Long Short-Term Memory) network for temporal modeling. The system is deployed on **Google Vertex AI** for scalable machine learning inference and **Google Cloud Functions** for serverless API handling.

---

## Tech Stack

### **Frontend Development**
The frontend is built using modern web development tools to ensure a responsive and user-friendly interface.

#### **1. React.js**
#### **2. TypeScript**
#### **3. Tailwind CSS**
---

### **Backend Development**
#### **4. Flask**
#### **5. Google Cloud Functions**

---

### **Machine Learning**
The core of the system relies on advanced machine learning techniques to analyze video frames and predict baseball metrics.

#### **6. CNN (Convolutional Neural Network)**
A pre-trained **MobileNetV2** CNN is used as a feature extractor to process spatial information from video frames.

#### **7. LSTM (Long Short-Term Memory)**
An LSTM network is used to model temporal dependencies between video frames, enabling accurate predictions of baseball metrics.

#### **8. Google Vertex AI**
Google Vertex AI is used to host and serve the trained machine learning model. It provides scalable and managed infrastructure for deploying and running predictions

---

## **Model Architecture**

### **1. Feature Extraction with MobileNetV2**
- **Input**: Grayscale video frames of size `128x128` pixels.
- **Preprocessing**:
  - Videos are converted to grayscale to reduce computational complexity.
  - Frames are resized to `128x128` pixels for consistency.
  - Ball-and-bat collision detection identifies the relevant segment of the video.
- **Feature Extractor**:
  - A pre-trained **MobileNetV2** model is used as the backbone for extracting spatial features from each frame.
  - Since MobileNetV2 expects RGB input, the grayscale frames are replicated across three channels.
  - The `imagenet` weights are frozen to retain the learned features, and only the top layers are removed (`include_top=False`).

![](/Images/ModelSchema.png)

![](/Images/AccuracyML.png)

### **2. Temporal Modeling with LSTM**
- **Input**: A sequence of 5 frames extracted around the ball-and-bat collision.
- **Architecture**:
  - The `TimeDistributed` layer applies the MobileNetV2 feature extractor to each frame independently.
  - An **LSTM** layer processes the sequence of extracted features to capture temporal dependencies between frames.
  - Fully connected layers (`Dense`) refine the output and map it to the target variables:
    - **Exit Velocity** (mph)
    - **Hit Distance** (feet)
    - **Launch Angle** (degrees)

### **3. Training Pipeline**
- **Batch Processing**:
  - Due to memory constraints, the dataset is processed in batches.
  - Each batch consists of multiple videos, which are preprocessed in parallel using multithreading (`ThreadPoolExecutor`).
- **Training**:
  - The model is trained incrementally, saving checkpoints after each batch.
  - Metrics such as **Mean Absolute Error (MAE)** and **Mean Squared Error (MSE)** are monitored during training.

### **4. Deployment**
- **Google Vertex AI**:
  - The trained model is deployed on **Vertex AI**, enabling scalable and efficient inference.
  - Vertex AI provides managed infrastructure for hosting the model and serving predictions via REST APIs.
- **Google Cloud Functions**:
  - A serverless API is implemented using **Cloud Functions** to handle video uploads, preprocessing, and prediction requests.
  - The function integrates with Vertex AI for making predictions and returns results to the client.

---

## **How We Use Google Cloud Services**

### **1. Google Vertex AI**
- **Purpose**: Host and serve the trained machine learning model.
- **Key Features**:
  - **Managed Infrastructure**: Vertex AI abstracts away the complexities of deploying and scaling machine learning models.
  - **Endpoint Management**: Predictions are served via a dedicated endpoint, ensuring low latency and high availability.
  - **Scalability**: Automatically scales based on incoming request volume.
- **Integration**:
  - The Cloud Function sends preprocessed video frames to the Vertex AI endpoint for inference.
  - The endpoint returns predictions for **Exit Velocity**, **Hit Distance**, and **Launch Angle**.

### **2. Google Cloud Functions**
- **Purpose**: Provide a serverless API for handling video uploads and preprocessing.
- **Key Features**:
  - **Event-Driven Execution**: The function is triggered by HTTP requests from the React frontend.
  - **CORS Support**: Handles cross-origin requests, allowing seamless integration with web applications.
  - **Scalability**: Automatically scales to handle varying levels of traffic.
- **Workflow**:
  - Receives a video URL or file upload from the client.
  - Downloads and preprocesses the video to extract relevant frames.
  - Sends the preprocessed frames to the Vertex AI endpoint for prediction.
  - Returns the prediction results to the client.
    
---

## **System Workflow**

1. **Client-Side Interaction**:
   - The user uploads a video or provides a video URL via the React frontend.
   - The frontend sends the video URL or file to the Google Cloud Function.

2. **Video Preprocessing**:
   - The Cloud Function downloads the video and detects the ball-and-bat collision frame.
   - It extracts 5 frames around the collision point and converts them to grayscale.

3. **Feature Extraction and Prediction**:
   - The preprocessed frames are sent to the Vertex AI endpoint.
   - The endpoint uses the trained model to predict **Exit Velocity**, **Hit Distance**, and **Launch Angle**.

4. **Response**:
   - The Cloud Function receives the predictions and sends them back to the React frontend.
   - The frontend displays the results to the user.

---

## **Key Highlights**

### **1. Scalability**
- The use of **Vertex AI** and **Cloud Functions** ensures that the system can scale to handle large volumes of requests without manual intervention.

### **2. Cost Efficiency**
- Serverless components like Cloud Functions and Vertex AI endpoints are billed based on usage, minimizing costs during periods of low traffic.

### **3. Integration**
- The seamless integration of Google Cloud services (Vertex AI, Cloud Functions, and optionally Cloud Run) simplifies the deployment and management of the entire pipeline.

### **4. Performance**
- The hybrid CNN-LSTM architecture leverages the strengths of both spatial and temporal modeling, ensuring accurate predictions.

---
