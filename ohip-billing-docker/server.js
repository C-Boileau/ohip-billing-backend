const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const codes = JSON.parse(fs.readFileSync('./ohip_codes.json', 'utf-8'));

app.get('/api/codes', (req, res) => {
  const { query = '', category = '' } = req.query;
  const lowerQuery = query.toLowerCase();

  const filtered = codes.filter(code => {
    const matchesQuery =
      code.code.toLowerCase().includes(lowerQuery) ||
      code.description.toLowerCase().includes(lowerQuery);
    const matchesCategory = category === '' || category === 'all' || code.category === category;
    return matchesQuery && matchesCategory;
  });

  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
