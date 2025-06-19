import React, { useState, useEffect } from 'react';

function App() {
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [vegetarianForm, setVegetarianForm] = useState({ title: '', content: '', image: null });
  const [veganForm, setVeganForm] = useState({ title: '', content: '', image: null });
  const [recipes, setRecipes] = useState([]);
  const [vegetarianRecipes, setVegetarianRecipes] = useState([]);
  const [veganRecipes, setVeganRecipes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    'food1.jpg',
    'food2.jpg',
    'food3.jpg',
    'food4.jpg',
    'fruit1.jpg',
    'fruit2.jpg',
    'fruit3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    let selectedForm, setSelectedRecipes;

    if (formType === 'regular') {
      selectedForm = form;
      setSelectedRecipes = setRecipes;
    } else if (formType === 'vegetarian') {
      selectedForm = vegetarianForm;
      setSelectedRecipes = setVegetarianRecipes;
    } else {
      selectedForm = veganForm;
      setSelectedRecipes = setVeganRecipes;
    }

    const newRecipe = {
      title: selectedForm.title,
      content: selectedForm.content,
      image: selectedForm.image ? URL.createObjectURL(selectedForm.image) : null
    };

    setSelectedRecipes(prev => [...prev, newRecipe]);

    if (formType === 'regular') setForm({ title: '', content: '', image: null });
    if (formType === 'vegetarian') setVegetarianForm({ title: '', content: '', image: null });
    if (formType === 'vegan') setVeganForm({ title: '', content: '', image: null });
  };

  const renderForm = (formData, setFormData, formType, label) => (
    <form onSubmit={(e) => handleSubmit(e, formType)} style={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(8px)',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      {label && <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{label}</h3>}
      <input
        placeholder="Recipe Name"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <br />
      <textarea
        placeholder="Recipe Description"
        value={formData.content}
        onChange={e => setFormData({ ...formData, content: e.target.value })}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <button type="submit">Add Recipe</button>
    </form>
  );

  const renderRecipes = (recipesList) => (
    <ul style={{ color: 'white', listStyleType: 'none', padding: 0 }}>
      {recipesList.map((r, i) => (
        <li key={i} style={{ marginBottom: '20px' }}>
          <strong>{r.title}</strong>: {r.content}
          {r.image && <div><img src={r.image} alt="recipe" style={{ width: '100%', maxWidth: '400px', marginTop: '10px', borderRadius: '10px' }} /></div>}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url("${backgroundImages[bgIndex]}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.5) blur(1px)',
        zIndex: 0
      }} />

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
          LePiChef <img src="chef-logo.png" alt="Logo" style={{ height: '40px' }} />
        </h1>
        <p style={{ color: 'white' }}>Welcome to the recipe world of Pi Network</p>

        {renderForm(form, setForm, 'regular', '')}
        {renderForm(vegetarianForm, setVegetarianForm, 'vegetarian', 'Vegetarian Recipe')}
        {renderForm(veganForm, setVeganForm, 'vegan', 'Vegan Recipe')}

        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', color: 'white', marginTop: '40px' }}>
          <div>
            <h3>Recipes</h3>
            {renderRecipes(recipes)}
          </div>
          <div>
            <h3>Vegetarian Recipes</h3>
            {renderRecipes(vegetarianRecipes)}
          </div>
          <div>
            <h3>Vegan Recipes</h3>
            {renderRecipes(veganRecipes)}
          </div>
        </div>

        {/* Regional Dishes */}
        <div style={{ color: 'white', marginTop: '40px' }}>
          <h2>World Regions and Signature Dishes</h2>
          <ul>
            <li><b>Asia:</b> Sushi - Vinegared rice with raw fish and vegetables.</li>
            <li><b>Europe:</b> Pizza Margherita - Thin crust pizza with tomato, mozzarella, and basil.</li>
            <li><b>Africa:</b> Jollof Rice - Spicy tomato rice with vegetables and meat.</li>
            <li><b>North America:</b> Cheeseburger - Grilled beef patty in a bun with cheese and toppings.</li>
            <li><b>South America:</b> Empanadas - Pastries filled with meat or vegetables.</li>
            <li><b>Middle East:</b> Hummus - Chickpea spread served with pita bread.</li>
            <li><b>Oceania:</b> Meat Pie - Savory pie with minced meat and gravy.</li>
          </ul>
        </div>

        {/* Footer */}
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
