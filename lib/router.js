
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('films') }
});

// Router.route('/unity', function () {
//   const path = Npm.require('path');
//   console.log(path)
//   this.response.write(path.join('C:/Users/Thoma/OneDrive/meteor.js/unity/jeu_webgl/index.html'));
//
//   this.response.end();
//
// }, {where: 'server'});




Router.route('/video/:_id/:_filename', function () {

  var path = 'C:/Users/Thoma/OneDrive/meteor.js/uhs/assets/films/' + this.params._id + '/videos/' + this.params._filename + '.mp4';
  console.log(path);
  console.log('/assets/films/' + this.params._id + '/' + this.params._filename);
  var fs = Npm.require('fs');
  var stat = fs.statSync(path);
  var fileSize = stat.size;
  var range = this.request.headers['range'];
console.log(range)
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    this.response.writeHead(206, head)
    file.pipe(this.response).pipe(file)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    this.response.writeHead(200, head)
    fs.createReadStream(path).pipe(this.response).pipe(fs.createReadStream(path))
  }
}, {where: 'server'});

Router.route('/films_list',{ name : 'filmsList' })


Router.route('/films/:_id', {
  name: 'filmPage',
  waitOn: function() {
    return Meteor.subscribe('sequences', this.params._id);
  },
  data: function() { return Films.findOne(this.params._id) ; }
});

Router.route('/films/:_id/edit', {
  name: 'filmEdit',
  data: function() { return Films.findOne(this.params._id); }
});

Router.route('/', {
  name: 'index'
});



Router.route('/film_submit',{ name : 'filmSubmit' });

var requireLogin = function() {
    if (! Meteor.user()) {
      if (Meteor.loggingIn()) {
          this.render(this.loadingTemplate);
      } else {
          this.render('accessDenied');
      }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'filmPage'});
Router.onBeforeAction(requireLogin, {only: 'filmSubmit'});
