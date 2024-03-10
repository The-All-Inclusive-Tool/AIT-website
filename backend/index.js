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
    peopleHelped: {
        type: Number,
        required: false,
    },
    inclusiveTimes: {
        type: Number,
        required: false,
    },
    achievements: [{
        name: String,
        description: String,
    }],
    totalAchievements: {
        type: Number,
        default: 0,
    },
    profileImage: {
        type: String,
    },
});

const User = mongoose.model("User", userSchema);

const profileSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
    },
    githubLink: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
});

const Profile = mongoose.model("Profile", profileSchema);

mongoose.connect(MongooseConnect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

// Function to set user authentication cookie
const setAuthCookie = (res, userId, userName) => {
    res.cookie('loggedInUser', { _id: userId, name: userName, authenticated: true }, { maxAge: 3600000 });
};

// Middleware to check user authentication
const authenticateUser = async (req, res, next) => {
    try {
        const { loggedInUser } = req.cookies;

        if (!loggedInUser || !loggedInUser.authenticated) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findById(loggedInUser._id);

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error authenticating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Registration endpoint
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        const usersCollection = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
        if (usersCollection.length === 0) {
            await mongoose.connection.db.createCollection('users');
        }

        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();

        setAuthCookie(res, savedUser._id, savedUser.name);

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/create-profile", async (req, res) => {
    try {
        const { username, githubLink, phoneNumber } = req.body;

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const existingProfile = await Profile.findOne({ username });
        if (existingProfile) {
            return res.status(400).json({ error: "Profile with this username already exists" });
        }

        const newProfile = new Profile({
            username,
            githubLink,
            phoneNumber,
        });

        const savedProfile = await newProfile.save();

        // Assuming you want to associate the profile with the authenticated user
        req.user.profile = savedProfile._id;
        await req.user.save();

        res.status(201).json(savedProfile);
    } catch (error) {
        console.error("Error creating profile:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(PORT, () => {
    console.log("App running on port", PORT);
});
