// server.js
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const connectMongo = require("connect-mongo"); // ✅ robust import
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// ✅ put in .env instead of hardcoding
// MONGO_URI="mongodb+srv://...."
const MONGO_URI = process.env.MONGO_URI;

// --- Models ---
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);

// --- Middleware ---
app.use(express.json());

// ✅ allow cookies across origin (frontend)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ session store (handles connect-mongo export differences)
const MongoStore = connectMongo.default ? connectMongo.default : connectMongo;

app.use(
  session({
    secret: process.env.SESSION_SECRET || "hu_secret_key_2025",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      collectionName: "sessions",
      ttl: 60 * 60 * 24, // 1 day (optional)
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "lax", // ✅ good for localhost dev
      secure: false, // ✅ keep false on localhost (true only with https)
    },
  })
);

// --- Custom Logger (Anti-AI Measure) ---
app.use((req, res, next) => {
  res.on("finish", () => {
    if (req.method === "POST" && (res.statusCode === 200 || res.statusCode === 201)) {
      const timestamp = new Date().toLocaleString();
      const userId = req.session.userId || "Guest";
      console.log(`[${timestamp}] Successful POST request. User ID: ${userId}`);
    }
  });
  next();
});

// --- Routes ---

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    // handle duplicate email
    if (err?.code === 11000) return res.status(409).json({ error: "Email already exists" });
    res.status(400).json({ error: "Registration failed" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      return res.json({ message: "Logged in", userId: user._id });
    }

    res.status(401).json({ error: "Invalid credentials" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Get items
app.get("/api/items", async (req, res) => {
  const items = await Item.find().populate("createdBy", "email");
  res.json(items);
});

// Add item
app.post("/api/items", async (req, res) => {
  if (!req.session.userId) return res.status(401).send("Unauthorized");

  const { name, brand, price } = req.body || {};
  if (!name || !brand || price === undefined) return res.status(400).json({ error: "Missing fields" });

  const newItem = await Item.create({ name, brand, price, createdBy: req.session.userId });
  res.status(201).json(newItem);
});

// Delete item (ownership check)
app.delete("/api/items/:id", async (req, res) => {
  if (!req.session.userId) return res.status(401).send("Login required");

  const deletedItem = await Item.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.session.userId,
  });

  if (!deletedItem) return res.status(403).send("Not authorized to delete this item");
  res.json({ message: "Deleted successfully" });
});

// --- Start ---
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Successfully");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
