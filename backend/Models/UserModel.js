// userModel.js
const users = []; // Detta är en enkel in-memory "databas"

// Simulerar användarregistrering
const registerUser = (username, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10); // Hashar lösenordet
  users.push({ username, password: hashedPassword });
};

// Simulerar att hämta en användare
const getUser = (username) => {
  return users.find(user => user.username === username);
};

export { registerUser, getUser };
