const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid user", });
    }
    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Match result:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Password does't match" });
    }


    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        storeId: user.storeId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      id: user._id,
      name: user.name || "User",
      email: user.email,
      role: user.role,
      storeId: user.storeId,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: `server error ${error.message}` });
  }
};// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, storeId } = req.body;

    if (!email || !password || !storeId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
      storeId,
    });

    res.status(201).json({
      message: "User created  successfully...",
      user,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};