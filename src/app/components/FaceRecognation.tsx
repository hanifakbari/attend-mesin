"use client";
import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import "../styles/globals.css";

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div className="myapp">
      <h1>Face Cobaa</h1>
      <div className="appvideo">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} width={940} height={650} className="appcanvas" />
    </div>
  );
}

export default App;
