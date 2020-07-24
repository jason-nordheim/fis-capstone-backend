# Data Models 

## User 
Referenced: `Event` 
References: `none` 
```ts
interface User {
  /** Represents a user of the system **/
  id: number;         // primary key, system generated 
  first: string;      // first name 
  last: string;       // last name 
  email: string;      // user-email, must be unique 
  bio: string;        // short description
  created_at: Date;   // date record created 
  updated_at: Date;   // date record updated 
}

interface FollowRequest {
  /** Represents a request to become "friends" or share 
   * information with another user of the system **/
  id: number;         // primary key (system generated)
  created_at: Date;   // date/time record created (system generated)
  updated_at: Date;   // date/time record updated (system maintained)
}
```
*** 
## Attraction 
```ts 
/**  Represents a park, trail or other destination.  **/ 
interface Attraction {
  id: number;            // primary key (unique identifier)
  type: string;          // Park/Trail
  latitude: number;      // latitude of start attaction (trail head or entrance)
  longitude: number;     // longitude of start of attraction (trail head or entrance)
}
/** Represents a rating provided by a user of an attraction **/
interface Rating: {
  id: number;             // primary key 
  attraction_id:          // foriegn key referencing an attraction 
  value: number;          // rating for attraction 
  created_at: Date;       // date/time record created (system generated)
  updated_at: Date;       // date/time record updated (system maintained)
}
```
*** 
## Event 
```ts 
/** represents a scheduled event **/
interface Event {
  id: number;             // primary key (unique identifier)
  admin: number;          // foreign key to user that created event (admin of event) 
  name: string;           // short name for event 
  description: string;    // breif description of the event 
  start: Date;            // start of availability window for event 
  created_at: Date;       // date/time record created (system generated)
  updated_at: Date;       // date/time record updated (system maintained)
} 
```

## List 
