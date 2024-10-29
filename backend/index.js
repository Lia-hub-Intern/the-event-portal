import express from 'express';
import { registerUser, getUser } from './Models/UserModel.js'; // Importera modellen

const app = express();
const PORT = 7000;

app.use(express.json()); // Middleware för att hantera JSON-kroppar

app.post('/register', (req, res) => {
  const { username, password } = req.body; // Hämta användarnamn och lösenord från begäran
  registerUser(username, password); // Registrera användaren
  res.status(201).json({ message: 'User registered successfully' });
});

app.get('/api/user/:username', (req, res) => {
  const user = getUser(req.params.username); // Hämta användaren
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
