import express from "express";
import cors from "cors";
import { db, User, Goal } from "./db/db.js";
import bcrypt from "bcrypt";

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.send({ hello: "world!" });
});

server.post("/goalforprofile", async (req, res) => {
    const { title, category, location, startDate, endDate, goalIntention } =
        req.body;
    try {
        const goal = await Goal.create({
            title,
            category,
            location,
            startDate,
            endDate,
            goalIntention,
        });
        res.status(201).json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

server.post("/interestsforprofile", async (req, res) => {
    const { insterests, curiousAbout } = req.body;
    try {
        const interests = await handleInterestsData(insterests, curiousAbout);
        res.status(201).json(interests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
server.post("/locationforprofile", async (req, res) => {
    const { city, state, county } = req.body;
    try {
        const location = await handleLocationData(city, state, county);
        res.status(201).json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.post("/nameforprofile", async (req, res) => {
    const { firstName, lastName, dataOfBirth, monthOfBirth, yearOfBirth, age } =
        req.body;
    try {
        const name = await handleNameData(
            firstName,
            lastName,
            dataOfBirth,
            monthOfBirth,
            yearOfBirth,
            age
        );
        res.status(201).json(name);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const checkForExistingUser = await User.findOne({
        where: {
            email: email,
        },
    });
    if (checkForExistingUser) {
        res.send({ error: true, message: "User already exists" });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
            email: email,
            password: hashedPassword,
        });
        res.send({ success: true, userID: newUser.id });
    }
});

server.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email: email,
            password: password,
        },
    });
    if (!user) {
        res.send({
            error: true,
            message: "No account found with that email address",
        });
    } else if (user.password !== req.body) {
        res.send({ error: true, message: "Incorrect password" });
    } else {
        res.send({ success: true, userID: user });
    }

    const validPassword = bcrypt.compareSync(
        req.body.password,
        matchingUser.password
    );
    if (!validPassword) {
        res.send({ error: true, message: "Wrong password. No soup for you." });
    } else {
        res.send({ error: false, userID: matchingUser.id });
    }
});

server.listen(3001, () => {
    console.log("listening on port 3001");
});

const checkForExistingUser = await User.findOne({
    where: {
        email: "tiffany@gmail.com",
    },
});
if (!checkForExistingUser) {
    await User.create({
        email: "tiffany@gmail.com",
        password: "onetwo",
        firstName: "Tiffany",
        lastName: "Hsu",
        location: "Syracuse, NY",
        age: 0,
    });
}
