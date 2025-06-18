import React, { useState, useEffect } from 'react';

function App() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [recipes, setRecipes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  // Lista slika iz public foldera za slideshow
  const backgroundImages = [
    'cake1.jpg', 'cake2.jpg', 'cake3.jpg', 'cake4.jpg',
    'food1.jpg', 'food2.jpg', 'food3.jpg'
  ];

  // Slideshow pozadine - menja sliku na svakih 10 sekundi
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Ucitavanje recepata
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(res => res.json())
      .then(setRecipes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(recipe => {
        setRecipes([...recipes, recipe]);
        setForm({ title: '', content: '' });
      });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Pozadinska slika */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImages[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.5) blur(1px)',
          zIndex: 0,
        }}
      />

      {/* Glavni sadrzaj */}
      <div style={{ position: 'relative', zIndex: 1, padding: 20, color: 'white' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          LePiChef
          <img src="chef-logo.png" alt="Logo" style={{ height: '40px' }} />
        </h1>

        <p>Welcome to the recipe world of Pi Network</p>

        <form onSubmit={handleSubmit}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            maxWidth: '400px',
            margin: '20px auto',
            color: 'black'
          }}>
          <input
            placeholder="Recipe Name"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          /><br />
          <textarea
            placeholder="Recipe Description"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          /><br />
          <button type="submit">Add Recipe</button>
        </form>

        <ul style={{ color: 'white' }}>
          {recipes.map((r, i) => (
            <li key={i}><b>{r.title}</b>: {r.content}</li>
          ))}
        </ul>

        <div style={{ marginTop: '40px' }}>
          <h2>World Regions and Signature Dishes</h2>
          <ul>
            <li><b>Asia:</b> Sushi - Vinegared rice with raw fish and vegetables.</li>
            <li><b>Europe:</b> Pizza Margherita - Thin crust pizza with tomato, mozzarella, and basil.</li>
            <li><b>Africa:</b> Jollof Rice - Rice cooked in spicy tomato sauce with vegetables and meat.</li>
            <li><b>North America:</b> Cheeseburger - Grilled beef patty in a bun with cheese and toppings.</li>
            <li><b>South America:</b> Empanadas - Pastries filled with meat, cheese, or vegetables.</li>
            <li><b>Middle East:</b> Hummus - Chickpea and tahini spread served with pita bread.</li>
            <li><b>Oceania:</b> Meat Pie - Savory pie filled with minced meat and gravy.</li>
          </ul>
        </div>

        <footer style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="/privacy.html" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', color: 'white' }}>
            Privacy Policy
          </a>
          <a href="/terms.html" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            Terms of Use
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
