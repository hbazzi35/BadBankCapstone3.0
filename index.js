const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

// used to serve static files from the public directory
app.use(express.static('public'));
app.use(cors());

const uri = "mongodb+srv://bazzih3519:Bazzi12345@badbank2.wdzpz.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: Number,
});

const User = mongoose.model("User", userSchema);


// create user account (echo it to calling client)
app.get('/account/create/:name/:email/:password', async (req, res) => {
    try {
        const name = req.params.name, email = req.params.email, password = req.params.password;

        const user = await User.create({
            name,
            email,
            password,
            balance: 0
        });

        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

// all user data
app.get('/account/userdata/:email/:password', async (req, res) => {
    try {
        const email = req.params.email;

        const user = await User.find({ email });

        res.json(user);
    } catch (error) {
        console.log(error);
    }
})

// all accounts
app.get('/account/all', async (req, res) => {
    try {
        const users = await User.find({});

        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

// user verification / login
app.get('/account/login/:email/:password', async (req, res) => {
    try {
        const email = req.params.email, password = req.params.password;

        const userExists = await User.findOne({ email: email });

        if (!userExists) {
            res.status(400);
            res.send("User doesn't exist");
            return;
        }


        if(userExists.password !== password) {
            res.status(400);
            res.send("Password mismatch");
            return;
        }

        res.json(userExists);
    } catch (error) {
        console.log(error);
    }
});

app.get('/account/deposit/:email/:amount', async (req, res) => {
    try {
        const email = req.params.email, amount = req.params.amount;

        const user = await User.findOne({ email });

        user.balance = user.balance + amount;
        await user.save();

        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

app.get('/account/withdraw/:email/:amount', async (req, res) => {
    try {
        const email = req.params.email, amount = req.params.amount;

        const user = await User.findOne({ email });

        if (user.balance - amount < 0) {
            res.status(200);
            res.send("Balance not enough to withdraw");
            return;
        }

        user.balance = user.balance - amount;
        await user.save();

        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

app.get('/acount/destroy/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.deleteOne({ email: email });

        res.json(user);
    } catch (error) {
        console.log(error);
    }
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {

    console.log("Server running...");
});