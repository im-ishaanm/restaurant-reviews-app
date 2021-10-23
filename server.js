import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

// Initializing app
const app = express();
// Applying Middleware
app.use(cors());
app.use(express.json());

app.use("/api/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).json({ error: "Page not found" }));

export default app;
