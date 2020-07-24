export const data_models = [
  {
    name: "User",
    description: "Represents user of a system",
    use: [
      "Identifying users",
      "maintaining configuration/settings",
      "Social Networking",
    ],
    properties: {
      id: 1, // pk - system generated
      first: "Johnny", // end-user first name
      last: "Bravo", // end-user last name
      // breif intro
      bio:
        "Johnny Bravo is an American animated television series created by Van Partible for Cartoon Network, and the second of the network's Cartoon Cartoons, which aired from July 14, 1997, to August 27, 2004.",
      email: "johnny@cartoon-network.com",
      username: "jBravo", // unique identifier (alternate key)
      // hashed password
      password_digest:
        "$2b$12$YbsNUnqrBzIvoth9QmHH7.IwiZmA1vkqig3JS3X3x.ugPK8NfT4RS",
      // timestamps
      created_at: "2020-07-20T22:46:44.047Z",
      updated_at: "2020-07-20T22:46:44.047Z",
    },
  },
  {
    name: "FollowRequest",
    description: "Represents a request to share information with another user",
    use: [
      "defining social connections",
      "processing user information-sharing requests", 
    ],
    properties: {
      id: 1, // pk - system generated
      send_id: 1, // fk - links to sender (user.id)
      recp_id: 1, // fk - links to reciever (user.id)
      recieved: false, // inidicates if the request has been recieved
      approved: false, // indiciates if the request has been approved
      // timestamps
      created_at: "2020-07-20T22:46:44.047Z",
      updated_at: "2020-07-20T22:46:44.047Z",
    },
  },
  {
    name: "Event",
    description: "Represents a planned social activty/excursion",
    properties: {
      id: 1, // pk - system generated
      admin_id: 1, // fk - links to creator of event (User.id)
      name: "Annual BBQ in the Park", // name of the event
      // breif description of the event
      description:
        "It's that time of year again - let's meet up in the park and have some music, gril some food, and laugh lots... socail distant of course!",
      start: "2020-07-20T22:46:44.047Z", // start of availability window
      end: "2020-07-20T22:46:44.047Z", // end of availability window
      // timestamps
      created_at: "2020-07-20T22:46:44.047Z",
      updated_at: "2020-07-20T22:46:44.047Z",
    },
  },
  {
    name: "Proposal",
    description: "Represents the proposal to a place or location",
    properties: {
      id: 1, // pk - system generated
      attr_id: 1, // fk - unique identifier of a the attraction being proposed (attraction.id)
      event_id: 1, // fk - unique identifier of the event this is a proposal for (event.id)
      // timestamps
      created_at: "2020-07-20T22:46:44.047Z",
      updated_at: "2020-07-20T22:46:44.047Z",
    },
  },
  {
    name: "Invitation",
    description: "Represents an invitation to a user for an event",
    properties: {
      id: 1, // pk - system generated
      event_id: 1, // fk - the event associated with the invitiation (event.id)
      user_id: 1, // fk - links to the user the invitation is intended for (user.id)
      recieved: false, // indicates if the invitation has been recieved
      approved: false, // indicates if the invitation was accepted
    },
  },
];
