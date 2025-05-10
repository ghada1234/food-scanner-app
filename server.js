// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/api/scan', upload.single('image'), (req, res) => {
  const filePath = req.file.path;

  // MOCK AI RESULT (replace with real model call)
  const mockResult = 'Spaghetti Bolognese';

  res.json({ result: mockResult });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
