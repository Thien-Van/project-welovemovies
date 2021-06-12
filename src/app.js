if (process.env.USER) require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/methodNotAllowed");

app.use(cors());
app.use(express.json());

module.exports = app;
