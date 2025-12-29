// import dotenv from "dotenv";
import mongoose from "mongoose";
// import cors from "cors";
// import session from "express-session";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

// const app = express();

// Middleware
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(session({
//   secret: "mysecretkey",
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // أثناء التطوير
// }));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI) 
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Test route
// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// import productRoutes from "./routes/products.js";
// app.use("/api/products", productRoutes);