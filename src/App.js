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
        padding: 20,
        minHeight: '100vh',
        backgroundImage: 'url("background.jpg")'
,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
      }}
    >
      <h1>LePiChef 🍽️</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Naziv recepta"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        /><br />
        <textarea
          placeholder="Opis recepta"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        /><br />
        <button type="submit">Dodaj recept</button>
      </form>
      <ul>
        {recipes.map((r, i) => (
          <li key={i}><b>{r.title}</b>: {r.content}</li>
        ))}
      </ul>
      <footer style={{ marginTop: '50px', textAlign: 'center' }}>
        <a href="/privacy.html" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>
          Privacy Policy
        </a>
        <a href="/terms.html" target="_blank" rel="noopener noreferrer">
          Terms of Use
        </a>
      </footer>
    </div>
  );
}

export default App;

  