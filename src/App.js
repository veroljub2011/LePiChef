import React, { useState, useEffect } from 'react';

function App() {
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [vegForm, setVegForm] = useState({ title: '', content: '', image: null });
  const [veganForm, setVeganForm] = useState({ title: '', content: '', image: null });
  const [recipes, setRecipes] = useState([]);
  const [vegRecipes, setVegRecipes] = useState([]);
  const [veganRecipes, setVeganRecipes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    'food1.jpg', 'food2.jpg', 'food3.jpg', 'cake1.jpg',
    'fruit1.jpg', 'grill.jpg', 'pork.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
        setVegRecipes(data.vegetarian || []);
        setVeganRecipes(data.vegan || []);
      });
  }, []);

  const handleSubmit = (e, type = 'recipes') => {
    e.preventDefault();
    const selectedForm = type === 'recipes' ? form : type === 'vegetarian' ? vegForm : veganForm;
    const formData = new FormData();
    formData.append('title', selectedForm.title);
    formData.append('content', selectedForm.content);
    if (selectedForm.image) {
      formData.append('image', selectedForm.image);
    }

    fetch(`http://localhost:5000/api/${type}`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(newRecipe => {
        if (type === 'recipes') {
          setRecipes([...recipes, newRecipe]);
          setForm({ title: '', content: '', image: null });
        } else if (type === 'vegetarian') {
          setVegRecipes([...vegRecipes, newRecipe]);
          setVegForm({ title: '', content: '', image: null });
        } else {
          setVeganRecipes([...veganRecipes, newRecipe]);
          setVeganForm({ title: '', content: '', image: null });
        }
      });
  };

  const renderForm = (state, setState, typeLabel, typeKey) => (
    <div style={formStyle}>
      <h3>{typeLabel}</h3>
      <input
        placeholder="Recipe Name"
        value={state.title}
        onChange={(e) => setState({ ...state, title: e.target.value })}
        style={inputStyle}
      />
      <textarea
        placeholder="Recipe Description"
        value={state.content}
        onChange={(e) => setState({ ...state, content: e.target.value })}
        style={textareaStyle}
      />
      <input
        type="file"
        onChange={(e) => setState({ ...state, image: e.target.files[0] })}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <button onClick={(e) => handleSubmit(e, typeKey)}>Add Recipe</button>
    </div>
  );

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(8px)',
    maxWidth: '400px',
    margin: '20px auto'
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '10px',
    padding: '8px'
  };

  const textareaStyle = {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    height: '100px'
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${backgroundImages[bgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.5) blur(1px)',
        zIndex: 0
      }}></div>

      <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
          LePiChef
          <img src="logo.png" alt="LePiChef Logo" style={{ height: '60px' }} />
        </h1>
        <p style={{ color: 'white' }}>Welcome to the recipe world of Pi Network</p>

        {renderForm(form, setForm, '', 'recipes')}
        {renderForm(vegForm, setVegForm, 'Vegetarian Recipe', 'vegetarian')}
        {renderForm(veganForm, setVeganForm, 'Vegan Recipe', 'vegan')}

        <h2 style={{ color: 'white', marginTop: '40px' }}>World Regions and Signature Dishes</h2>
        <ul style={{ color: 'white' }}>
          <li><b>Asia:</b> Sushi - Vinegared rice with raw fish and vegetables.</li>
          <li><b>Europe:</b> Pizza Margherita - Thin crust pizza with tomato, mozzarella, and basil.</li>
          <li><b>Africa:</b> Jollof Rice - Spicy tomato rice with vegetables and meat.</li>
          <li><b>North America:</b> Cheeseburger - Grilled beef patty with cheese and toppings.</li>
          <li><b>South America:</b> Empanadas - Pastries filled with meat or vegetables.</li>
          <li><b>Middle East:</b> Hummus - Chickpea and tahini spread with pita bread.</li>
          <li><b>Oceania:</b> Meat Pie - Savory pie with minced meat and gravy.</li>
        </ul>

        <footer style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="/privacy.html" target="_blank" style={{ color: 'white', marginRight: '10px' }}>Privacy Policy</a>
          <a href="/terms.html" target="_blank" style={{ color: 'white' }}>Terms of Use</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
