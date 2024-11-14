import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [palette, setPalette] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState(() => {
    const saved = localStorage.getItem('savedPalettes');
    return saved ? JSON.parse(saved) : [];
  });

  const generateRandomColor = () => {
    const randomColor = () =>
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setPalette(Array.from({ length: 5 }, randomColor));
  };

  const savePalette = () => {
    const newPalettes = [...savedPalettes, { id: Date.now(), colors: palette }];
    setSavedPalettes(newPalettes);
    localStorage.setItem('savedPalettes', JSON.stringify(newPalettes));
  };

  const deletePalette = (id) => {
    const filteredPalettes = savedPalettes.filter((p) => p.id !== id);
    setSavedPalettes(filteredPalettes);
    localStorage.setItem('savedPalettes', JSON.stringify(filteredPalettes));
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    alert(`${color} copied to clipboard!`);
  };

  return (
    <div className="App">
      <h1>Color Palette Generator</h1>
      <button onClick={generateRandomColor}>Generate Palette</button>
      <div className="palette">
        {palette.map((color, index) => (
          <div
            key={index}
            className="color-block"
            style={{ backgroundColor: color }}
          >
            <span onClick={() => copyToClipboard(color)}>{color}</span>
          </div>
        ))}
      </div>
      <button onClick={savePalette}>Save Palette</button>
      <h2>Saved Palettes</h2>
      <div className="saved-palettes">
        {savedPalettes.map((paletteItem) => (
          <div key={paletteItem.id} className="saved-palette">
            {paletteItem.colors.map((color, index) => (
              <div
                key={index}
                className="color-block"
                style={{ backgroundColor: color }}
              >
                {color}
              </div>
            ))}
            <button onClick={() => deletePalette(paletteItem.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
