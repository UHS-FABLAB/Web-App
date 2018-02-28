Users = new Mongo.Collection('usersUHS');

Users.schema = new SimpleSchema({
    username: {type: String},
    surname: {type: String},
    name: {type: String},
    password: {type: Number},
    role: {type: [String]}
  });
