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

app.post("/register", (request, response) => {
  const { 
    username, password, first, last, email, bio  
  } = request.body;

  bcrypt.hash(password, HASH_COST).then((hashedPassword) => {
    database("user")
      .insert({ username, password_digest: hashedPassword, first, last, email, bio})
      .returning("*").limit(1)
      .then((user) => response.status(200).json({ user }));
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


app.get('/followers', (request, response) => {
  
})



app.listen(PORT, console.log(`Listening on ${PORT}...`));
