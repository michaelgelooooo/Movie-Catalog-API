const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");


dotenv.config();


const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");


const app = express();
const port = 4000;


mongoose.connect(process.env.MONGODB_STRING);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", () => console.log("We're connected to the cloud database!"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/users", userRoutes);
app.use("/movies", movieRoutes);


if (require.main === module) {
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now online at port ${process.env.PORT || port}`);
    })
}


module.exports = { app, mongoose };