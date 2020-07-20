
# Getting Started 

After cloning the repository: Navigate to the root of the project and open a terminal to run the setup commands:
1. Install: `npm install` 
2. Run: `npm start` 

# Server Endpoints 

Listed below is a high-level summary of the various endpoints available via this API.

## Overview 


| HTTP Method | Path         | Auth | Body  | Response Example  | Description | 
|:------------|:-------------|:-----|:------|:------------------|:------------| 
| `get`       | `/users`     | no   | -       | `[{"id": 1,"created_at": "2020-07-20T21:25:17.467Z","updated_at": "2020-07-20T21:25:17.467Z","username": "sadams","password_digest": "$2b$12$06xYs4yFxGJi2EXsMCRsCOmB2B52GHp.KHsO7CGUpMmdOKm30Nw3W","first": "Sam","last": "Adams","email": "sam.adams@gmail.com","bio": "avid beer drinker" },{ "id": 2,"created_at": "2020-07-20T21:58:56.202Z","updated_at": "2020-07-20T21:58:56.202Z","username": "jdoe","password_digest": "$2b$12$oeZUgmWEKH6hKx86Vc/K0OvnPEsgU/525ZMc/Ls.ypd6hs649FHlm","first": "Jane","last": "Doe","email": "jane.doe@gmail.com","bio": "I like long walks through gardens"}]` | returns a list of registered users | 
| `post`      | `/register`  | no   | `{username, password, first, last, email, bio}` | `{"user": [{"id": 4,"created_at": "2020-07-20T22:30:30.840Z","updated_at": "2020-07-20T22:30:30.840Z","username": "jdoe","password_digest": "$2b$12$2CFsuph.39kI3UUYqij/8ufaJ5TwEvqZj7jmT6e3EvgfNjvmSnfK6","first": "Jane","last": "Doe","email": "jane.doe@gmail.com","bio": null}]}` | registers a new user; returns success/failure |
| `post`      | `/login`     | no   | ` {username, password }` | | returns a hashed token (assuming correct credentials) that can be used to access resources | 
| `post`      | `/followers` | yes  | `{ friendId }` | | creates a new request follower request | 
| `get`       | `/followers` | yes  | - | | returns the followers of the authenticated user | 
| `patch`     | `/followers` | yes | `{ requestId, accept, pending } | - | marks a follower request as accepted/rejected and changes status of pending to false |  
| `get`       | `/myinfo`    | yes  | - | | returns a JSON representation of the current user based on their token | 
| `get`       | `/events`    | yes  | - | | returns a JSON representation of the events create by the user identified in the authorization portion of the request | 
| `post`      | `/events`   | yes  | `{ creator, start, end, title, description }` | | creates a new event for the user identified in the authorization portion of the request | 



### Users 

**HTTP Method** - `GET` 
**PATH** - `/users` 
**Authorization** - no 
**Description** - requests list registered users, returns array of objects with user data 
**Body** - n/a 
**Request Example** 
```sh
curl --location --request POST 'http://localhost:4000/users' 
```

### Register 

**HTTP Method** - `POST` 
**PATH** - `/register` 
**Authorization** - no 
**Description** - requests the registration of a new user, returns the new user's information
**Body** 
* `first` - [string, required] - User's first name 
* `last` - [string, required] - User's family name 
* `username` - [string, required] - Public screen name for user (must be unique) 
* `password` - [string, required] - Password for authentication to protected resources 
* `email` - [string, required] - Contact email address for user (must be unique) 
* `bio` - [string, optional] - Brief auto-biography of the user

**Request Example** 
```sh
curl --location --request POST 'http://localhost:4000/register' --header 'Content-Type: application/json' --data-raw '{"first": "Alex", "last": "Demple", "email": "alex.demple@gmail.com", "username": "ademple", "password": "ddddddd" }'
```

### Login 

**HTTP Method** - `POST` 
**PATH** - `/login` 
**Authorization** - no 
**Description** - verifies provided credentials and (assuming valid credentials) returns a tokenn 
**Body**
* `username` (string, required) 
* `password` (string. required) 

**Request Example** 
```sh
curl --location --request POST 'http://localhost:4000/register' --header 'Content-Type: application/json' --data-raw '{"first": "Alex", "last": "Demple", "email": "alex.demple@gmail.com", "username": "ademple", "password": "ddddddd" }'
```