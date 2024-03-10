const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const { Int32 } = require("mongodb");

const app = express();
const PORT = 2020;
const MongooseConnect = "mongodb+srv://armaan:Armaan25@cluster0.dfeplrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

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
        type: Number, // Assuming Int32 was a typo, it should be Number
        required: false,
    },
    inclusiveTimes: {
        type: Number, // Assuming Int32 was a typo, it should be Number
        required: false,
    },
    achievements: [{
        name: String,
        description: String,
        required: false,
        // Add any other fields related to achievements
    }],
    totalAchievements: {
        type: Number,
        default: 0,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
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
        setAuthCookie(res, savedUser._id, savedUser.name);

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Profile creation endpoint with file upload handling
app.post("/create-profile", authenticateUser, upload.single('profilePicture'), async (req, res) => {
    try {
        const { username, githubLink, phoneNumber } = req.body;
        const profilePicture = req.file;

        // Handle file upload and get the image link
        const imageLink = 'http://localhost:2020/' + profilePicture.path; // Adjust this based on your server's file storage

        const newProfile = new Profile({
            username,
            imageLink,
            githubLink,
            phoneNumber,
        });

        const savedProfile = await newProfile.save();

        // Update the corresponding User document with the profileImage field
        const loggedInUserId = req.cookies.loggedInUser._id;
        const userToUpdate = await User.findById(loggedInUserId);

        if (userToUpdate) {
            userToUpdate.profileImage = imageLink;
            await userToUpdate.save();
        }

        res.status(201).json({
            savedProfile,
            message: "Profile created successfully",
            profileImage: imageLink, // Include the profileImage URL in the response
        });
    } catch (error) {
        console.error("Error creating profile:", error.message);
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
        setAuthCookie(res, user._id, user.name);

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get user profile endpoint
app.get("/profile", authenticateUser, (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update user data endpoint
app.put("/update-profile", authenticateUser, async (req, res) => {
    try {
        const { name: newName, email: newEmail, password: newPassword } = req.body;
        const user = req.user;

        // Update user data
        user.name = newName || user.name;
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log("App running on port", PORT);
});
