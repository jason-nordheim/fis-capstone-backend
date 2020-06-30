require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 4000;
const HASH_COST = 12;

/* Express setup */
const app = express();
app.use(cors());
app.use(bodyParser.json());

/* Routes */
app.get("/users", (request, response) => {
  database("user")
    .select("*")
    .then((users) => {
        response.json({ users })
    });
});

app.post("/users", (request, response) => {
  const { username, password } = request.body;

  bcrypt.hash(password, HASH_COST).then((hashedPassword) => {
    database("user")
      .insert({ username, password_digest: hashedPassword })
      .returning("*")
      .then((users) => response.status(200).json({ newUser: users[0] }));
  });
});

app.post("/login", (request, response) => {
  const { username, password } = request.body;

  database("user")
    .select("*")
    .where({ username })
    .first()
    .then((user) => {
      if (!user) throw new Error("Invalid username");
      bcrypt
        .compare(password, user.password_digest)
        .then((passwordMatched) => {
          if (!passwordMatched) throw new Error("Invalid password");
          return user;
        })
        .catch((err) => response.status(401).json({ error: err.message }))
        .then((user) => {
          jwt.sign(user, process.env.SECRET, (error, token) => {
            if (error) response.status(401).json({ error: error.message });
            response.status(200).json({ token });
          });
        });
    })
    .catch((err) => response.status(401).json({ error: err.message }));
});

app.listen(PORT, console.log(`Listening on ${PORT}...`));
