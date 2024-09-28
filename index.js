import express from "express";
import cors from "cors";
import { db, User, Goal, Friend } from "./db/db.js";
import bcrypt from "bcrypt";
import multer from "multer";

const server = express();
server.use(cors());
server.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });
server.use(upload.single("photo"));

server.get("/", (req, res) => {
    res.send({ hello: "world!" });
});

server.get("/message", async (req, res) => {
    res.send({ messages: await Message.findAll({ order: ["timestamp"] }) });
});

server.post("/chatpage", async (req, res) => {
    console.log(req.body);

    await Message.create(req.body);

    res.send();
});

server.put("/chatpage", async (req, res) => {
    const messageToEdit = await Message.findOne({ where: { id: req.body.id } });
    console.log(messageToEdit);
    messageToEdit.text = req.body.newMessageText;
    await messageToEdit.save();
    res.send({ messages: await Message.findAll({ order: ["timestamp"] }) });
});

server.put("/locationforprofile/:userID", async (req, res) => {
    console.log(req.file.size);
    if (req.file && req.file.size > 3741490 * 5) {
        console.log("file too big");
        return res.send({ error: "file too big" });
    } else {
        console.log("create in DB");
        await User.update(
            {
                image: req.file?.buffer,
                imageType: req.file?.mimetype,
                lat: req.body.lat,
                lng: req.body.lng,
                interests: req.body.interests,
                curiousAbout: req.body.curiousAbout,
            },
            { where: { id: req.params.userID } }
        );
        res.send();
    }
});

server.get("/imageforprofile/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);

    res.setHeader("Content-Type", user.imageType);

    // res.setHeader("Content-Disposition", `inline; filename=someImage.pdf`);

    // Send the file data as a buffer
    res.send(user.image);
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
// server.post("/locationforprofile", async (req, res) => {
//     const { city, state, county } = req.body;
//     try {
//         const location = await handleLocationData(city, state, county);
//         res.status(201).json(location);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

server.post("/nameforprofile", async (req, res) => {
    const { firstName, lastName, dataOfBirth, monthOfBirth, yearOfBirth, age } =
        req.body;
    try {
        const newUserID = await User.update(
            {
                firstName,
                lastName,
                dataOfBirth,
                monthOfBirth,
                yearOfBirth,
                age,
            },
            { where: { id: req.body.userID } }
        );
        res.status(201).json({});
    } catch (error) {
        console.error(error);
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
        },
    });
    if (!user) {
        res.send({
            error: true,
            message: "No account found with that email address",
        });
    } else {
        const validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            res.send({
                error: true,
                message: "Wrong password. No soup for you.",
            });
        } else {
            res.send({ error: false, userID: user.id });
        }
    }
});

server.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.send({ users });
});

server.post("/makeConnection", async (req, res) => {
    await Friend.create(req.body);
    res.send();
});

server.get("/friends/:userID", async (req, res) => {
    const friends = await Friend.findAll({
        where: {
            user1: req.params.userID,
        },
        include: User,
    });
    res.send({ friends });
});

server.listen(3001, "0.0.0.0", () => {
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
        password: bcrypt.hashSync("onetwo", 10),
        firstName: "Tiffany",
        lastName: "Hsu",
        location: "Syracuse, NY",
        age: 0,
        lat: 43,
        lng: -76,
    });
    await User.create({
        email: "max@gmail.com",
        password: bcrypt.hashSync("onetwo", 10),
        firstName: "Max",
        lastName: "Matthews",
        location: "Not Syracuse, NY",
        age: 0,
        lat: 43.5,
        lng: -76.5,
    });
}
