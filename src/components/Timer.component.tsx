'use client';
import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number; // Waktu awal dalam detik
  mode: 'countUp' | 'countDown' | 'stay'; // Mode: hitung maju/mundur/tetap
  onEnd?: () => void; // Callback ketika waktu habis (untuk hitung mundur)
  storageKey: string; // Key untuk menyimpan data di localStorage
  label?: string;
  id: string;
}

const Timer: React.FC<TimerProps> = React.memo(
  ({ initialTime, label, mode, onEnd, storageKey, id }) => {
    const [time, setTime] = useState<number>(() => {
      if (mode === 'countDown') {
        const cachedTime = localStorage.getItem(storageKey);
        return cachedTime ? parseInt(cachedTime) : initialTime;
      }

      return initialTime;
    });

    useEffect(() => {
      if (mode === 'countUp' || mode === 'stay') setTime(initialTime);
    }, [id, initialTime, mode]);

    useEffect(() => {
      if (mode !== 'stay') {
        const interval = setInterval(() => {
          setTime((prevTime) => {
            const updatedTime =
              mode === 'countUp' ? prevTime + 1 : Math.max(prevTime - 1, 0);

            if (mode === 'countDown' && updatedTime === 0) {
              clearInterval(interval); // Hentikan interval jika waktu habis
              if (onEnd) onEnd(); // Jalankan callback jika ada
            }

            return updatedTime;
          });
        }, 1000);

        return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
      }
    }, [mode, onEnd]);

    useEffect(() => {
      // Simpan waktu saat ini ke localStorage setiap kali waktu berubah
      localStorage.setItem(storageKey, time.toString());
    }, [time, storageKey]);

    const formatTime = (seconds: number): string => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      return [hours, minutes, secs]
        .map((v) => v.toString().padStart(2, '0'))
        .join(':');
    };

    return (
      <div
        className="flex-column border-1"
        style={{ padding: '5px 10px', flexGrow: 1 }}
      >
        <p style={{ fontSize: '10px' }}>{label}</p>
        <h3>{formatTime(time)}</h3>
      </div>
    );
  },
);

export { Timer };
