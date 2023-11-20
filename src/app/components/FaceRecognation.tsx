"use client";

import React, { useRef, useCallback, useEffect } from "react";

import * as faceapi from "face-api.js";
import "../styles/globals.css";
import Webcam from "react-webcam";

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = useCallback(async () => {
    try {
      console.log("Trying to start video...");
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (webcamRef.current && webcamRef.current.video) {
        console.log("Setting srcObject...");
        webcamRef.current.video.srcObject = currentStream;
      } else {
        console.log("webcamRef or webcamRef.current.video is null");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }, []);

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("models");
    await faceapi.nets.faceExpressionNet.loadFromUri("models");
    faceMyDetect();
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const displaySize = { width: 940, height: 650 };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const context = canvasRef.current.getContext("2d");

        if (context) {
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
        }
      }
    }, 1000);
  };

  return (
    <div>
      <h1>Face Cobaa</h1>
      <div>
        <Webcam ref={webcamRef} />
        <button onClick={startVideo}>Start Video</button>
      </div>
    </div>
  );
}

export default App;
