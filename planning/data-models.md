# Data Models 

## User 
```cs 
interface User {
  /** Represents a user of the system **/
  int id { get; set ;}                  // primary key, system generated 
  string first { get; set; }            // first name 
  string last { get; set; }             // last name 
  string email { get; set; }            // user-email, must be unique 
  string bio { get; set; }              // short description
  DateTime created_at {get; set };      // date record created 
  DateTime updated_at { get; set; };    // date record updated 
}

interface FollowRequest {
  /** Represents a request to become "friends" or share 
   * information with another user of the system 
   * e.g. "Sharon would like to follow Sarah" 
   * **/
  int id {get; set;}                  // primary key (system generated)
  int sender {get; set;}              // foreign key to the user:id of the person who sent the follow request 
  int reciever { get; set; }          // foriegn key to the user:id of the person who is being send the follow request 
  bool recieved { get; set; }         // default: false - indicates if the follow request has been recieved 
  bool accepted { get; set; }         // default: false - indiciates if the follow request has been accepted  
  DateTime created_at { get; set; }   // date/time record created (system generated)
  DateTime updated_at { get; set; }   // date/time record updated (system maintained)
}
```
*** 
## Attraction 
```cs 
/**  Represents a park, trail or other destination. e.g. "Bruce Speer Creek Trail" **/ 
interface Attraction {
  int id { get; set; }                    // primary key (unique identifier)
  string type { get; set; }               // Park/Trail
  float latitude { get; set; }            // latitude of start attaction (trail head or entrance)
  float longitude { get; set; }           // longitude of start of attraction (trail head or entrance)
}
/** Represents a rating provided by a user of an attraction **/
interface Rating: {
  int id { get; set; }                     // primary key 
  int attraction_id { get; set; }          // foriegn key referencing an attraction 
  int value { get; set; }                  // rating for attraction [1-10]
  string details { get; set; }             // any details or description for the rating 
  DateTime created_at { get; set; }        // date/time record created (system generated)
  DateTime updated_at { get; set; } ;      // date/time record updated (system maintained)
}
```
*** 
## Event 
```cs 
/** represents a scheduled event, e.g. "Annual Hiking Trip To Spruce Creek" **/
interface Event {
  int id { get; set; }                     // primary key (unique identifier)
  int admin { get; set; }                  // foreign key to user that created event (admin of event) 
  string name { get; set; }                // short name for event 
  string description { get; set; }         // breif description of the event 
  DateTime start { get; set; }             // start of availability window for event 
  DateTime end { get; set; }               // end of availability period 
  DateTime created_at { get; set; }        // date/time record created (system generated)
  DateTime updated_at { get; set; }        // date/time record updated (system maintained)
} 
interface RSVP {
  int id { get; set; }                    // PK - Auto 
  int event_id { get; set; }              // FK - links to the event 
  int invite_for { get; set; }            // FK - links to the person whose invite 
  bool recieved { get; set; }             // defaults to false - indicates if the invitation was recieved 
  bool accepted { get; set; }             // defaults to false - indicates that the invitatee is interested in attending the event 
  List<Availability> availability { get; set; } // array of free time slots 
}
interface Availability {
  int id { get; set; }                    // PK - Auto 
  int user_id { get; set; }               // FK - user whose availability this pertains to 
  int event_id { get; set; }              // FK - event for which the availability pertains to 
  DateTine start { get; set; }            // start of the availability period 
  DateTime end { get; set; }              // end of the availability period 
  DateTime created_at { get; set; }       // date/time record created (system generated)
  DateTime updated_at { get; set; }       // date/time record updated (system maintained)
}
interface Proposal { 
  /* represents a proposed destination */ 
  int id { get; set; } // PK - Auto 
  int event_id { get; set; } // the event associated with the destination/attraction proposal 
  int user_id { get; set; } // person submitting the destination/attraction proposal 
  int attraction_id { get; set; } // the attraction the person is proposing 
}
interface Vote { 
  /* represents the desire to go to a part*/ 
}
```
*** 
## List
```cs 
/** Represents a set of saved destination, e.g. "Places near Denver", "Bucket List" **/
interface List: {
  int id { get; set; }            // PK - Auto 
  int user_id { get; set; }       // FK - to linke 
  string name { get; set; }        // verbose name for the list 
  DateTime created_at { get; set; } // date/time record created (system generated)
  DateTime updated_at { get; set; }  // date/time record updated (system maintained)   
}
```
