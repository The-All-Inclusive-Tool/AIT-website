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
    username: {
        type: String,
        required: true,
    },

    githubLink: {
        type: String,
    },
    phoneNumber: {
        type: String,
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
    name: {
        type: String,
    },
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
        const { name, email, password , username, githubLink, phoneNumber } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        const usersCollection = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
        if (usersCollection.length === 0) {
            await mongoose.connection.db.createCollection('users');
        }

        const newUser = new User({ name, email, password , username, githubLink, phoneNumber});
        const savedUser = await newUser.save();

        setAuthCookie(res, savedUser._id, savedUser.name);

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/create-profile", authenticateUser, async (req, res) => {
    try {
        const { username, githubLink, phoneNumber } = req.body;

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        // Check if the profile already exists for the authenticated user
        if (req.user.profile) {
            return res.status(400).json({ error: "Profile already exists for this user" });
        }

        // Create or update the profile information in the user document
        req.user.profile = {
            username,
            githubLink,
            phoneNumber,
        };

        await req.user.save();

        res.status(201).json(req.user.profile);
    } catch (error) {
        console.error("Error creating/updating profile:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Get all users and their details
app.get("/get-all-users", async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error getting all users:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all profiles and their details
app.get("/get-all-profiles", async (req, res) => {
    try {
        const allProfiles = await Profile.find();
        res.status(200).json(allProfiles);
    } catch (error) {
        console.error("Error getting all profiles:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(PORT, () => {
    console.log("App running on port", PORT);
});
