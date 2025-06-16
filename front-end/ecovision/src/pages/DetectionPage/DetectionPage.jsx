import React, { useEffect, useRef, useState } from 'react';
import styles from './DetectionPage.module.css';
import Header from '../../components/layout/Header/Header';

const DetectionPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    // Acessa a câmera do usuário
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Erro ao acessar a câmera', err);
      });
  }, []);

  const detectarFogo = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = context.getImageData(0, 0, canvas.width, canvas.height).data;

    let firePixels = 0;

    for (let i = 0; i < frame.length; i += 4) {
      const r = frame[i];
      const g = frame[i + 1];
      const b = frame[i + 2];

      if (r > 200 && g > 100 && b < 100) {
        firePixels++;
      }
    }

    if (firePixels > 5000) {
      setAlerta('🚨 CUIDADO: INÍCIO DE QUEIMADA, ACIONE AS AUTORIDADES!');
    } else {
      setAlerta('');
    }

    requestAnimationFrame(detectarFogo);
  };

  useEffect(() => {
    videoRef.current?.addEventListener('play', detectarFogo);
  }, []);

  return (
    <div className={styles.container}>
    <Header />
      <h1>Detector de Fogo</h1>
      <video ref={videoRef} width="640" height="480" autoPlay className={styles.video} />
      <canvas ref={canvasRef} width="640" height="480" className={styles.canvas} />
      {alerta && <p className={styles.alerta}>{alerta}</p>}
    </div>
  );
};




export default DetectionPage;