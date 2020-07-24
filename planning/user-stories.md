# Actors 
## User 
`registered-user`:  a user **with** an account 
`unregistered-user`: a user **without** an account 
## System 
`front-end`: the client-side application 
`back-end` : the server-side application  

# User Stories 
## Create an event 
Allows an user to create an event 
* **Actor**: `registered-user`
* **Feature**: `#5 A USER (actor) can "create" (action) an "event" (event)` 
* **Headers**: `user-token (JWT)` 
* **HTTP Request**: 
  * **Type**: `POST`
  * **Request Body** 
    - **name**: the verbose name of the event 
    - **description**: a breif summary of what the event is about
    - **start**: the start of the availability window of event. 
    - **end**: the end of the availability window of an event. 
  * **Request Example**: `JSON`
    ```json 
    { 
      "name": "Hike to Mohawk Lake", 
      "description": "We will be meeting in the small pavilion adjacent to the parking lot", 
      "start": "2020-07-20T22:46:44.047Z", 
      "end": "2020-07-20T22:46:44.047Z"
    }
    ```
* **HTTP Response**: `JSON` 
  * Success - 200 
    ```json
    {
      "id": 24, 
      "organizer_id": 256, 
      "name": "Name of Event", 
      "description": "We will be meeting in the small pavilion adjacent to the parking lot", 
      "start": "2020-07-20T22:46:44.047Z", 
      "end": "2020-07-20T22:46:44.047Z", 
      "created_at": "2020-07-20T22:46:44.047Z", 
      "updated_at": "2020-07-20T22:46:44.047Z" 
    }
    ```
***

## Create an account (Register)
* **Actor**: `new-user`
* **Headers**: `NA`
* **HTTP Request**:
  * **Type**: `POST` 
  * **Format**: `JSON` 
    * **first** - first name of the end-user 
    * **last** - last-name (family name) of the end-user 
    * **username** - unique login name for the user 
    * **email** - contact email addresss 
    * **bio** - short profile introduction 
    * **password** - login verification 
  * `: 
    ```json 
    {
      "first": "Jeffrey", 
      "last": "Rogers", 
      "username": "super-ausie", 
      "email": "jeffrey@rogers.com", 
      "bio": "Hey I am Jeffrey (or Jeff) and I'm big into mountain biking and camping", 
      "password": "sUp3rS3cr3tP@ssw0rd", 
    }
    ```
* **HTTP Response**: `JSON`
  * Success - 200 
    ```json
    {
      "id": 234, 
      "first": "Jeffrey", 
      "last": "Rogers", 
      "username": "super-ausie", 
      "email": "jeffrey@rogers.com", 
      "bio": "Hey I am Jeffrey (or Jeff) and I'm big into mountain biking and camping", 
      "password_digest": "jKMGKLnoZX5/sHPK3wAooKI0Ngr2j2", 
    }
  ```
***

## Login to an account (Login) 
* **Actor**: `registered-user` 
* **Headers**: `NA`
* **Request Type**: `POST` 
* **Request Body**: (JSON)
```json
```
* **Response**: (JSON)
```json 
``` 
***

## Search destinations 
Allows end-users to search for a venue to hike, bike, or hang out in nature. 
* **Actor**: registered-user 
* **Headers**: user-token (JWT) 
* **Request Type**:  `POST`
* **Request Body** (JSON)
Latitude - Degrees North (N) or South (S) of the equator 
```json 
{ 
  "latitude": 
}
```
*** 
## Vote for an Attraction (destination) 
* **Actor**: 
* **Headers**: 
* **Request Type**:  
* **Request Body** (JSON)
```json 
{ 
  "todo": 
}
```
*** 
## Mark time available (event attendee)
* **Actor**: 
* **Headers**: 
* **Request Type**:  
* **Request Body** (JSON)
```json 
{ 
  "todo": 
}
```
***
