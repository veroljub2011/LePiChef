import React, { useState, useEffect } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(res => res.json())
      .then(setRecipes);
  }, []);

  const handleSubmit = e => {
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
    <div
  style={{
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
  }}
>
  {/* Pozadinska slika kao sloj pozadi */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'url("background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'brightness(0.5) blur(1px)',
      zIndex: 0,
    }}
  />

  {/* Glavni sadržaj iznad pozadine */}
  <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
    <h1 style={{ color: 'white' }}>LePiChef 🍽️</h1>

    <form onSubmit={handleSubmit}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)',
        maxWidth: '400px',
        margin: '20px auto',
      }}
    >
      <input
        placeholder="Naziv recepta"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <br />
      <textarea
        placeholder="Opis recepta"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <br />
      <button type="submit">Dodaj recept</button>
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
