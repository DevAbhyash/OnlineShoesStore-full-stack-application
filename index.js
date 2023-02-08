const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
//app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
//app.use(express.static(__dirname + "/public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const LoginModel = require("./Modal/model");
// const revenueModel = require("./Modal/model");
const password = "Aihe9361";
const natour = "Natours";
///connecting the data in the database
mongoose
    .connect(
        `mongodb+srv://upretiAbhyash:${password}@cluster0.a2inu.mongodb.net/${natour}?retryWrites=true`
    )
    .then((con) => {
        // console.log("DB Connection successfull");
    });
///if the router hits this route in the browser
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
///if the browser hits this route in the browser
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

//if we got post request we will be saving the data in the database
app.post("/login", async(req, res) => {
    try {
        let username = req.body.email;
        let password = req.body.password;
        console.log(username);
        const data = await LoginModel.findOne({
            email: username,
            password: password,
        });

        if (data) {
            res.redirect("/login/homepage");
        }
        if (!data) {
            res.sendFile(__dirname + "/public/errorLogin.html");
        }
    } catch (err) {}
});
///forgot password route
app.get("/login/forgotPassword", async(req, res) => {
    res.sendFile(__dirname + "/public/forgotPassword.html");
});
app.get("/login/admin", async(req, res) => {
    res.sendFile(__dirname + "/public/admin.html");
});

///UPDATING THE ALREADY EXISITING PASSWORD IN THE MONGODB DATABASE.
app.post("/login/forgotPassword", async(req, res) => {
    let newPassword = req.body.newPassword;
    let oldPassword = req.body.oldPassword;
    console.log(oldPassword, newPassword);
    try {
        const data = await LoginModel.findOne({
            email: oldPassword,
        });

        await LoginModel.updateOne({ password: data.password }, { $set: { password: newPassword } });
    } catch (err) {}
    res.redirect("/login");
});
///Registering/storing the data in the database
app.get("/register", async(req, res) => {
    res.sendFile(__dirname + "/public/registration.html");
});
/// getting response as post method for username and password
app.post("/register", async(req, res) => {
    const username = req.body.email;
    const password = req.body.password[0];

    try {
        const data = await LoginModel.findOne({ email: username });
        if (!data) {
            const login = await LoginModel.create({
                email: username,
                password: password,
            });
        }
    } catch (err) {
        console.log(err);
    }
    res.redirect("/login");
});

app.get("/login/homepage", (req, res) => {
    res.sendFile(__dirname + "/public/homepage.html");
});
app.post("/login/homepage", (req, res) => {
    console.log(req.body);
    res.sendFile(__dirname + "/public/homepage.html");
});

app.get("/login/homepage/checkout", (req, res) => {
    res.sendFile(__dirname + "/public/checkoutPage.html");
});

app.post("/checkout", async(req, res) => {
    // let name = req.body.name;
    // let address = req.body.address;
    // let postcode = req.body.postcode;

    // try {
    //     await revenueModel.create({
    //         name: name,
    //         address: address,
    //         postcode: postcode,
    //     });
    // } catch (err) {
    //     console.log(err);
    // }
    res.redirect("/login/homepage");
});
///we are hosting our server in port 3000.
app.listen(3000, () => {
    console.log("server is running in port 3000");
});