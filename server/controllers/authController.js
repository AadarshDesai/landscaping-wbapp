const jwt = require('jsonwebtoken');

// Generate JWT
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials (pseudo-code)
  const user = await User.findOne({ where: { email, password } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
