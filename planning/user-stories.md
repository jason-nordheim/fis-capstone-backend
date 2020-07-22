# User Stories 
## Create an event 
Allows an user to create an event 
### API 
* **Actor**: registered-user 
* **Headers**: user-token (JWT) 
* **Request Type**:  `POST`
* **Body** (JSON)
- name: the verbose name of the event 
- description: a breif summary of what the event is about
- start: the start of the availability window of event. 
- end: the end of the availability window of an event. 
```json 
{ 
  "name": "Name of Event", 
  "description": "We will be meeting in the small pavilion adjacent to the parking lot", 
  "start": "2020-07-20T22:46:44.047Z", 
  "end": "2020-07-20T22:46:44.047Z"
}
```
* **Response**: (JSON) 
Success - 200 
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
## Create an account (Register)
* **Actor**: new-user 
* **Headers**: 
* **Request Type**: 
* **Request Body**: 
* **Response**: 

## Login to an account (Login) 
* **Actor**: registered-user 
* **Headers**: 
* **Request Type**: 
* **Request Body**: 
* **Response**: 

## Search destinations 
Allows end-users to search for a venue to hike, bike, or hang out in nature. 
### API 
* **Actor**: registered-user 
* **Headers**: user-token (JWT) 
* **Request Type**:  `POST`
* **Body** (JSON)
Latitude - Degrees North (N) or South (S) of the equator 

```json 
{ 
  "latitude": 
}
```
## Vote for an excursion (destination) 
## Mark time available (event attendee)