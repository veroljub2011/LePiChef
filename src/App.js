import React, { useState, useEffect } from 'react';

function App() {
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [recipes, setRecipes] = useState([]);
  const [vegRecipes, setVegRecipes] = useState([]);
  const [veganRecipes, setVeganRecipes] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    'food1.jpg', 'food2.jpg', 'food3.jpg', 'food4.jpg',
    'fruit1.jpg', 'grill.jpg', 'pork.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e, category) => {
    e.preventDefault();
    const newRecipe = { ...form };
    if (category === 'vegan') {
      setVeganRecipes([...veganRecipes, newRecipe]);
    } else if (category === 'vegetarian') {
      setVegRecipes([...vegRecipes, newRecipe]);
    } else {
      setRecipes([...recipes, newRecipe]);
    }
    setForm({ title: '', content: '', image: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${backgroundImages[bgIndex]})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', filter: 'brightness(0.5) blur(1px)',
        zIndex: 0
      }}></div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
          LePiChef
          <img src="logo.png" alt="LePiChef Logo" style={{ height: '40px' }} />
        </h1>
        <p style={{ color: 'white' }}>Welcome to the recipe world of Pi Network</p>

        {/* Form for all categories */}
        {['regular', 'vegetarian', 'vegan'].map((type) => (
          <form
            key={type}
            onSubmit={(e) => handleSubmit(e, type)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.8)', padding: 20, borderRadius: 12,
              maxWidth: 400, margin: '20px auto', backdropFilter: 'blur(8px)'
            }}
          >
            <h3 style={{ textAlign: 'center' }}>{type.charAt(0).toUpperCase() + type.slice(1)} Recipe</h3>
            <input
              placeholder="Recipe Name"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              style={{ width: '100%', marginBottom: 10, padding: 8 }}
            /><br />
            <textarea
              placeholder="Recipe Description"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              style={{ width: '100%', marginBottom: 10, padding: 8 }}
            /><br />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: 10 }}
            /><br />
            <button type="submit">Add Recipe</button>
          </form>
        ))}

        {/* Display Recipes */}
        {[['Recipes', recipes], ['Vegetarian Recipes', vegRecipes], ['Vegan Recipes', veganRecipes]].map(([label, list]) => (
          <div key={label}>
            <h3 style={{ color: 'white' }}>{label}</h3>
            <ul style={{ color: 'white' }}>
              {list.map((r, i) => (
                <li key={i}>
                  <b>{r.title}</b>: {r.content}<br />
                  {r.image && <img src={r.image} alt="Dish" style={{ maxWidth: '300px', marginTop: '10px' }} />}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Regional Dishes */}
        <div style={{ color: 'white', marginTop: 30 }}>
          <h2>World Regions and Signature Dishes</h2>
          <ul>
            <li><b>Asia:</b> <i>Sushi</i> - Vinegared rice with raw fish and vegetables.</li>
            <li><b>Europe:</b> <i>Pizza Margherita</i> - Thin crust pizza with tomato, mozzarella, and basil.</li>
            <li><b>Africa:</b> <i>Jollof Rice</i> - Spicy tomato rice with meat and vegetables.</li>
            <li><b>North America:</b> <i>Cheeseburger</i> - Grilled beef in a bun with toppings.</li>
            <li><b>South America:</b> <i>Empanadas</i> - Stuffed pastries.</li>
            <li><b>Middle East:</b> <i>Hummus</i> - Chickpea spread with pita bread.</li>
            <li><b>Oceania:</b> <i>Meat Pie</i> - Savory pie with meat filling.</li>
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