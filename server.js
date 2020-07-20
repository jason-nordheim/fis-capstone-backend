require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require( 'express' );

const PORT = process.env.PORT || 4000;
const HASH_COST = 12;

/* Express setup */
const app = express();
app.use(cors());
app.use(bodyParser.json());

/* Middleware */
const Authenticate = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (error, user) => {
      if (error) return response.sendStatus(403);
      else {
        request.user = user;
        next();
      }
    });
  } else response.sendStatus(401);
};

/* Routes */
app.get("/users", (request, response) => {
  database("user")
    .select("*")
    .then((users, error) => {
      if(error) throw new Error(error)
      response.status(200).json(users);
    });
});

app.post("/register", (request, response) => {
  const { username, password, first, last, email, bio } = request.body;

  bcrypt.hash(password, HASH_COST).then((hashedPassword) => {
    database("user")
      .insert({
        username,
        password_digest: hashedPassword,
        first,
        last,
        email,
        bio,
      })
      .returning("*")
      .limit(1)
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

app.get("/myinfo", Authenticate, (request, response) => {
  response.json(request.user)
})

app.patch("/followers", Authenticate, (request, response) => {
  const { id } = request.user;
  const { accept, pending } = request.body 
  
});

app.get("/followers", Authenticate,  (request, response) => {
  const { id } = request.user
  response.json({ id })
});

app.post("/followers", Authenticate, (request, response) => {
  const { id } = request.user 
  if (!request.body.friendId){
    response.status(400).send('Must include a "friendId"')
  } else {
    database("follower").insert({requestee_id: request.body.friendId, requestor_id: id,})
    .returning("*")
    .then((data) => response.status(200).json(data))
    .catch((error) => response.status(400).json(error.detail))
  }
})


app.get("/events", Authenticate, (request, response) => {
  const { id } = request.user;
  database("event")
    .select("*")
    .where({ creator: id })
    .then((data) => response.status(200).json(data));
});

app.post("/events", Authenticate, (request, response) => {
  const { id } = request.user;
  const { start, end, title, description } = request.body;
  database("event")
    .insert({
      creator: id,
      start,
      end,
      title,
      description,
    })
    .returning("*")
    .limit(1)
    .then((event) => response.status(200).json({ event }));
});

app.listen(PORT, console.log(`Listening on ${PORT}...`));
