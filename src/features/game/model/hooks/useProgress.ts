import { useState, useEffect } from 'react';
export const useProgress = () => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      // Уменьшаем значение прогресса каждую секунду
      setProgress((prevProgress) => prevProgress - (1 / 120) * 100);
    }, 1000);

    // Очистка интервала после завершения
    setTimeout(() => {
      clearInterval(interval);
    }, 120000); // 2 минуты в миллисекундах

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { progress, setProgress };
};
