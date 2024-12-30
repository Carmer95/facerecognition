const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CLARIFAI_API_URL = 'https://api.clarifai.com/v2/models/face-detection/outputs';
const PAT = '481aaa59efa74b638435446c7ebfa327'; // Replace with your PAT

app.post('/api/clarifai', async (req, res) => {
  try {
    const fetch = await import('node-fetch'); // Dynamically import `node-fetch`

    const response = await fetch.default(CLARIFAI_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Key ${PAT}`,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});
