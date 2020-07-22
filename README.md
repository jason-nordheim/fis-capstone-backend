
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

**HTTP Method** `GET` 
**PATH** `/users` 
**Authorization** N/A  
**Description** Requests list registered users, returns array of objects with user data 
**Body** N/A  
**Request Example** 
```sh
curl --location --request POST 'http://localhost:4000/users' 
```
**Response Example**
```json
[
    {
        "id": 1,
        "created_at": "2020-07-20T22:59:47.328Z",
        "updated_at": "2020-07-20T22:59:47.328Z",
        "username": "ademple",
        "password_digest": "$2b$12$3wN/Uwlq9cryI/JGsbmUHORWU6GvN7j5kuwnBmmvWckNa/WVn8k2u",
        "first": "Alex",
        "last": "Demple",
        "email": "alex.demple@gmail.com",
        "bio": null
    }
]
```
***

### Register 

**HTTP Method** `POST` 
**PATH**  `/register` 
**Authorization** N/A 
**Description** Requests the registration of a new user, returns the new user's information
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
**Response Example**
```json 
{
    "user": [
        {
            "id": 2,
            "created_at": "2020-07-20T23:25:28.040Z",
            "updated_at": "2020-07-20T23:25:28.040Z",
            "username": "sam.adams",
            "password_digest": "$2b$12$YbsNUnqrBzIvoth9QmHH7.IwiZmA1vkqig3JS3X3x.ugPK8NfT4RS",
            "first": "Sam",
            "last": "Adams",
            "email": "sam.adams@gmail.com",
            "bio": null
        }
    ]
}
```

*** 

### Login 

**HTTP Method** `POST` 
**PATH** `/login` 
**Authorization** N/A
**Description** Verifies provided credentials and (assuming valid credentials) returns a tokenn 
**Body**
* `username` - [string, required] - Public screen name for user (must be unique) 
* `password` - [string, required] - Password for authentication to protected resources 

**Request Example** 
```sh
curl --location --request POST 'http://localhost:4000/login' --header 'Content-Type: application/json' --data-raw '{"username": "ademple", "password": "ddddddd" }'
```
**Response Example**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiY3JlYXRlZF9hdCI6IjIwMjAtMDctMjBUMjM6MjU6MjguMDQwWiIsInVwZGF0ZWRfYXQiOiIyMDIwLTA3LTIwVDIzOjI1OjI4LjA0MFoiLCJ1c2VybmFtZSI6InNhbS5hZGFtcyIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMiRZYnNOVW5xckJ6SXZvdGg5UW1ISDcuSXdpWm1BMXZrcWlnM0pTM1gzeC51Z1BLOE5mVDRSUyIsImZpcnN0IjoiU2FtIiwibGFzdCI6IkFkYW1zIiwiZW1haWwiOiJzYW0uYWRhbXNAZ21haWwuY29tIiwiYmlvIjpudWxsLCJpYXQiOjE1OTUyODc2MDd9.SWaoYtniP0g66eEBh99d9S7KjmfD9jI4NU8ZQaHCuUE"
}
```


### MyInfo 

**HTTP Method** `GET` 
**PATH** `/myinfo` 
**Authorization** yes (token)
**Description** returns end-user information based on provided token  
**Body**
N/A
**Request Example** 
```sh
curl --location --request GET 'http://localhost:4000/myInfo' --header 'Authorization: Bearer <<INSERT TOKEN>>4' --header 'Content-Type: application/json' 
```
**Response Example**
```json
{
    "id": 6,
    "created_at": "2020-07-20T22:46:44.047Z",
    "updated_at": "2020-07-20T22:46:44.047Z",
    "username": "exampleUsername",
    "password_digest": "$2b$12$y5GsYuXNO.dZAWlRD.H9je/jKMGKLnoZX5/sHPK3wAooKI0Ngr2j2",
    "first": "Ex",
    "last": "Ample",
    "email": "ex.ample@gmail.com",
    "bio": "This is an example bio",
    "iat": 1595285210
}
```
