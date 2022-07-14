const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //READ JSON
app.use(cors());
require("dotenv").config();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//DATABASE
require("./database");

app.listen(app.get("port"), () => {
	console.log("server listen on port " + app.get("port") + "...");
});

app.set("port", port);
