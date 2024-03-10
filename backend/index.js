const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 2020;
const MongooseConnect = "mongodb+srv://armaan:Armaan25@cluster0.dfeplrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

mongoose.connect(MongooseConnect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

// Registration endpoint
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate request body
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Create "users" collection if it doesn't exist
        const usersCollection = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
        if (usersCollection.length === 0) {
            await mongoose.connection.db.createCollection('users');
        }

        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();

        // Set a cookie indicating the user is logged in
        res.cookie('loggedInUser', savedUser._id, { maxAge: 3600000 }); // Set the cookie to expire in 1 hour

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Set a cookie indicating the user is logged in
        res.cookie('loggedInUser', user._id, { maxAge: 3600000 }); // Set the cookie to expire in 1 hour

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log("App running on port", PORT);
});
