import React, { useState, useEffect } from 'react';

function App() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [recipes, setRecipes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  // 7 background images
  const backgroundImages = [
    'food1.jpg',
    'food2.jpg',
    'food3.jpg',
    'food4.jpg',
    'fruit1.jpg',
    'fruit2.jpg',
    'pork.jpg'
  ];

  // Region dishes data
  const regionDishes = [
    {
      region: 'Asia',
      name: 'Chicken Curry',
      recipe: 'Combine chicken, onions, garlic, ginger, curry powder, tomatoes, simmer until tender.'
    },
    {
      region: 'Europe',
      name: 'Paella',
      recipe: 'Sauté saffron rice with seafood, chicken, chorizo, peas, bell pepper, tomato.'
    },
    {
      region: 'Africa',
      name: 'Jollof Rice',
      recipe: 'Cook rice in a spicy tomato-and-pepper base, with onions, garlic, ginger.'
    },
    {
      region: 'North America',
      name: 'Tacos',
      recipe: 'Fill soft tortillas with seasoned meat, lettuce, cheese, salsa.'
    },
    {
      region: 'South America',
      name: 'Feijoada',
      recipe: 'Stew black beans with pork, sausage, collard greens and orange slices.'
    },
    {
      region: 'Oceania',
      name: 'Pavlova',
      recipe: 'Whisk egg whites and sugar into meringue, top with whipped cream and fruit.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000); // 10 sec
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
      {/* Background */}
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
          filter: 'brightness(0.4)',
          zIndex: 0
        }}
      ></div>

      {/* Foreground content */}
      <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
        <h1 style={{ color: 'white' }}>LePiChef 🍳</h1>

        <form onSubmit={handleSubmit}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            maxWidth: '400px',
            margin: '20px auto'
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

        {/* Regional Dishes */}
        <div style={{ marginTop: '40px', color: 'white', backgroundColor: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ textAlign: 'center' }}>🌎 Regional Dishes from Around the World</h2>
          {regionDishes.map(d => (
            <div key={d.region} style={{ marginBottom: '20px' }}>
              <h3>{d.region}: <em>{d.name}</em></h3>
              <p style={{ marginLeft: '10px' }}>{d.recipe}</p>
            </div>
          ))}
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
