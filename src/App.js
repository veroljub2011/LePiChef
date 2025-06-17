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
      <form
  onSubmit={handleSubmit}
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
    onChange={(e) => setForm({ ...form, title: e.target.value })}
    style={{
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
    }}
  />
  <br />
  <textarea
    placeholder="Opis recepta"
    value={form.content}
    onChange={(e) => setForm({ ...form, content: e.target.value })}
    style={{
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      resize: 'vertical',
    }}
  />
  <br />
  <button
    type="submit"
    style={{
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#663399',
      color: 'white',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    }}
    onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
    onMouseOut={(e) => (e.target.style.transform = 'scale(1.0)')}
  >
    Dodaj recept
  </button>
</form>
