import React, { useState, useEffect } from 'react';

function App() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [recipes, setRecipes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  // Lista svih tvojih slika (iz foldera public)
  const backgroundImages = [
    'food1.jpg', 'food2.jpg', 'food3.jpg',
    'fruit1.jpg', 'fruit2.jpg', 'fruit3.jpg',
    'grill1.jpg', 'grill2.jpg', 'grill3.jpg',
    'meat1.jpg', 'meat2.jpg', 'meat3.jpg',
    'pork1.jpg', 'pork2.jpg', 'pork3.jpg',
    'shrimp.jpg',
    'vegetable1.jpg', 'vegetable2.jpg', 'vegetable3.jpg', 'vegetable4.jpg',
    // Dodaj više ako ih ima
  ];

  // Slideshow pozadine (menja sliku svakih 10 sekundi)
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000); // 10 sekundi

    return () => clearInterval(interval);
  }, []);

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
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url("${backgroundImages[bgIndex]}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.5) blur(2px)',
        zIndex: 0
      }} />

      {/* Glavni sadržaj preko slike */}
      <div style={{ position: 'relative', zIndex: 1, padding: '20px', color: 'white' }}>
        <h1 style={{ fontSize: '2em' }}>LePiChef 👨‍🍳</h1>
        <p>Welcome to the recipe world of Pi Network</p>

        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          padding: '20px',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
          maxWidth: '400px',
          margin: '20px auto',
          color: '#000'
        }}>
          <input
            placeholder="Recipe Name"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <br />
          <textarea
            placeholder="Recipe Description"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <br />
          <button type="submit">Add Recipe</button>
        </form>

        <ul style={{ color: 'white' }}>
          {recipes.map((r, i) => (
            <li key={i}><b>{r.title}</b>: {r.content}</li>
          ))}
        </ul>

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
