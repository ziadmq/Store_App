import express from "express";
import cors from "cors" ;
 import session from "express-session";
 import productRoutes from "./routes/Product.js";
//  import express from "express";
//  import Product from "../models/Product.js";
 
 const app= express();
 app.use(cors({origin: "http://localhost:3000", credentials: true}));
 app.use(express.json());
 app.use(session({secret:"mysecret", resave:false,saveUninitialized: true}));
 app.use("/api/products",productRoutes);

 export default app;
 
 
 