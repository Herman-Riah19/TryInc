import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function ChartBar({products}) {
  const chartRef = useRef(null);


  useEffect(() => {
    // Générateur de couleurs aléatoires
    function randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    }
    
    const backgroundColors = Array.from({ length: products.length }, () =>
      randomColor()
    );


    // Créez le graphique
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: products.map(prod => prod.name),
        datasets: [
          {
            label: 'Product Liked',
            data: products.map(prod => prod.nomber_like),
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

export default ChartBar;
