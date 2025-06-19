import React, { useState, useEffect } from 'react';

function App() {
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [recipes, setRecipes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  // Lista slika u slideshow
  const backgroundImages = [
    'food1.jpg', 'food2.jpg', 'food3.jpg', 'cake1.jpg', 'chicken.jpg', 'fruit4.jpg', 'vegetables1.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then((res) => res.json())
      .then(setRecipes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', form.title);
    data.append('content', form.content);
    if (form.image) {
      data.append('image', form.image);
    }

    fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((recipe) => {
        setRecipes([...recipes, recipe]);
        setForm({ title: '', content: '', image: null });
      });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Pozadinska slika */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url("${backgroundImages[bgIndex]}")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat', filter: 'brightness(0.5) blur(1px)',
          zIndex: 0,
        }}
      />

      {/* Glavni sadrzaj */}
      <div style={{ position: 'relative', zIndex: 1, padding: 20, color: 'white' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          LePiChef
          <img src="logo.png" alt="LePiChef Logo" style={{ height: '40px' }} />
        </h1>
        <p>Welcome to the recipe world of Pi Network</p>

        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px',
          borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)', maxWidth: '400px', margin: '20px auto', color: 'black'
        }}>
          <input
            placeholder="Recipe Name"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          /><br />

          <textarea
            placeholder="Recipe Description"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          /><br />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            style={{ marginBottom: '10px' }}
          /><br />

          <button type="submit">Add Recipe</button>
        </form>

        <ul>
          {recipes.map((r, i) => (
            <li key={i}><b>{r.title}</b>: {r.content}</li>
          ))}
        </ul>

        <div style={{ marginTop: '40px' }}>
          <h2>World Regions and Signature Dishes</h2>
          <ul>
            <li><b>Asia:</b> <i>Sushi</i> - Vinegared rice with raw fish and vegetables.</li>
            <li><b>Europe:</b> <i>Pizza Margherita</i> - Thin crust pizza with tomato, mozzarella, and basil.</li>
            <li><b>Africa:</b> <i>Jollof Rice</i> - Spicy tomato rice with vegetables and meat.</li>
            <li><b>North America:</b> <i>Cheeseburger</i> - Grilled beef patty in a bun with cheese.</li>
            <li><b>South America:</b> <i>Empanadas</i> - Pastries filled with meat or vegetables.</li>
            <li><b>Middle East:</b> <i>Hummus</i> - Chickpea and tahini spread with pita bread.</li>
            <li><b>Oceania:</b> <i>Meat Pie</i> - Savory pie filled with minced meat and gravy.</li>
          </ul>
        </div>

        <footer style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="/privacy.html" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', color: 'white' }}>Privacy Policy</a>
          <a href="/terms.html" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Terms of Use</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
