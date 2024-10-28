import express from 'express';
const app = express();
const PORT = 7000; // eller den port du vill använda

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
