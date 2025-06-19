import React, { useState, useEffect } from 'react';

function App() {
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [recipes, setRecipes] = useState([]);
  const [vegForm, setVegForm] = useState({ title: '', content: '', image: null });
  const [veganForm, setVeganForm] = useState({ title: '', content: '', image: null });
  const [vegRecipes, setVegRecipes] = useState([]);
  const [veganRecipes, setVeganRecipes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const backgroundImages = [
    'food1.jpg', 'food2.jpg', 'food3.jpg',
    'fruit1.jpg', 'fruit2.jpg', 'fruit3.jpg',
    'pork.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % backgroundImages.length);
        setFade(true);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const data = new FormData();
    const currentForm = type === 'veg' ? vegForm : type === 'vegan' ? veganForm : form;
    data.append('title', currentForm.title);
    data.append('content', currentForm.content);
    if (currentForm.image) data.append('image', currentForm.image);

    fetch(`http://localhost:5000/api/${type || 'recipes'}`, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(recipe => {
        if (type === 'veg') {
          setVegRecipes([...vegRecipes, recipe]);
          setVegForm({ title: '', content: '', image: null });
        } else if (type === 'vegan') {
          setVeganRecipes([...veganRecipes, recipe]);
          setVeganForm({ title: '', content: '', image: null });
        } else {
          setRecipes([...recipes, recipe]);
          setForm({ title: '', content: '', image: null });
        }
      });
  };

  const renderForm = (title, formData, setFormFunc, type = '') => (
    <div style={{ backgroundColor: 'rgba(255, 248, 220, 0.85)', padding: '20px', borderRadius: '12px', marginBottom: '20px', maxWidth: '500px' }}>
      {title && <h3 style={{ color: '#5C4033', textAlign: 'center' }}>{title}</h3>}
      <form onSubmit={(e) => handleSubmit(e, type)}>
        <input
          placeholder="Recipe Name"
          value={formData.title}
          onChange={(e) => setFormFunc({ ...formData, title: e.target.value })}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <br />
        <textarea
          placeholder="Recipe Description"
          value={formData.content}
          onChange={(e) => setFormFunc({ ...formData, content: e.target.value })}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <br />
        <input
          type="file"
          onChange={(e) => setFormFunc({ ...formData, image: e.target.files[0] })}
          style={{ marginBottom: '10px' }}
        />
        <br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${backgroundImages[bgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'opacity 0.5s ease-in-out',
        opacity: fade ? 1 : 0,
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5C4033' }}>
          LePiChef
          <img src="/logo.png" alt="LePiChef Logo" style={{ height: '40px' }} />
        </h1>
        <p style={{ color: '#333' }}>Welcome to the recipe world of Pi Network</p>

        {renderForm('', form, setForm)}
        {renderForm('Vegetarian Recipe', vegForm, setVegForm, 'veg')}
        {renderForm('Vegan Recipe', veganForm, setVeganForm, 'vegan')}

        <h2 style={{ color: '#333', marginTop: '40px' }}>World Regions and Signature Dishes</h2>
        <ul style={{ color: '#333' }}>
          <li><b>Asia:</b> Sushi – Vinegared rice with raw fish and vegetables.</li>
          <li><b>Europe:</b> Pizza Margherita – Thin crust pizza with tomato, mozzarella, and basil.</li>
          <li><b>Africa:</b> Jollof Rice – Spicy tomato rice with vegetables and meat.</li>
          <li><b>North America:</b> Cheeseburger – Grilled beef patty in a bun with cheese.</li>
          <li><b>South America:</b> Empanadas – Pastries filled with meat or vegetables.</li>
          <li><b>Middle East:</b> Hummus – Chickpea and tahini spread served with pita.</li>
          <li><b>Oceania:</b> Meat Pie – Savory pie filled with minced meat and gravy.</li>
        </ul>

        <footer style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="/privacy.html" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', color: '#5C4033' }}>
            Privacy Policy
          </a>
          <a href="/terms.html" target="_blank" rel="noopener noreferrer" style={{ color: '#5C4033' }}>
            Terms of Use
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
