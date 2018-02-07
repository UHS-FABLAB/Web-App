Ecrans = new Mongo.Collection('ecrans');

Ecrans.schema = new SimpleSchema({
    number: {type: Number},
    description: {type: String},
    filmId: {type: String, regEx: SimpleSchema.RegEx.Id}
  });

  Meteor.methods({
    ecranInsert: function(ecranAttributes) {
      check(Meteor.userId(), String);
      check(ecranAttributes, {
          number: Number,
          description: String,
          filmId: String
      });
  
      return Ecrans.insert(ecranAttributes);
  } ,
  ecranUpdate: function(ecranAttributes){
         
    var user = Meteor.user();
    var ecran = _.extend(ecranAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date(),
    });
    return Ecrans.update(ecran);
  },
  ecranGet: function(){
      return Ecrans.find();
   },
   ecranGetOne: function(ecranId){
       return Ecrans.findOne({_id: ecranId});
   }
});
