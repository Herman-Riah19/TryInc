import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function ChartLine({labels, data}) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Générateur de couleurs aléatoires
    function randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    }

    const backgroundColors = Array.from({ length: data.length }, () =>
      randomColor()
    );

    // Créez le graphique
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Données aléatoires',
            data: data,
            backgroundColor: backgroundColors, // Couleurs aléatoires
            borderColor: backgroundColors,
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
}

export default ChartLine;
