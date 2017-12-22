if (Films.find().count() === 0) {
  Films.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Films.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  Films.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}
