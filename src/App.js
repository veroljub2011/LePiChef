import React, { useState, useEffect } from 'react';


function App() {
  // Ako su slike imenovane: food1.jpg, food2.jpg, ..., food30.jpg
  const backgroundImages = Array.from({ length: 30 }, (_, i) => `food${i + 1}.jpg`);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000); // 10000 ms = 10 sekundi

    return () => clearInterval(interval);
  }, []);

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${process.env.PUBLIC_URL}/${backgroundImages[bgIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(0.4) blur(1px)', // bledje i malo zamućeno
    zIndex: -1,
    transition: 'background-image 1s ease-in-out'
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={backgroundStyle}></div>

      {/* Glavni sadržaj aplikacije */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem', color: '#fff' }}>
        <h1>LePiChef</h1>
        <p>Welcome to the recipe world of Pi Network</p>
        {/* Ovde idu tvoje forme, recepti itd. */}
      </div>
    </div>
  );
}

export default App;

