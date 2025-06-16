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
    <div style={{ padding: 20 }}>
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
    </div>
  );
}

export default App;