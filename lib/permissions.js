
// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

Meteor.users.allow({
    update: ownsDocument
});
