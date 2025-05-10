// React App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.post('http://localhost:5000/api/scan', formData);
    setResult(response.data.result);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Food Scanner</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '300px', marginTop: '20px' }} />}
      <br />
      <button onClick={handleUpload} style={{ marginTop: '20px' }}>Scan</button>
      {result && <h3>Estimated Food: {result}</h3>}
    </div>
  );
}

export default App;
