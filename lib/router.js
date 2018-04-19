
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

Router.route('js/:_id', function () {
  var path = 'C:/Users/Thoma/OneDrive/meteor.js/uhs/client/js/' + this.params._id;
  var fs = Npm.require('fs');
  var stat = fs.statSync(path);
  var fileSize = stat.size;
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'javascript',
  }
  this.response.writeHead(200, head)
  fs.createReadStream(path).pipe(this.response).pipe(fs.createReadStream(path))

}, {where: 'server'});


Router.route('/webgl/:_id', function () {
  var path = 'C:/Users/Thoma/OneDrive/meteor.js/unity/' + this.params._id + '/p&c' ;
  console.log(path);

  var fs = Npm.require('fs');

  var id = this.params._id;

  if(fs.lstatSync(path).isDirectory()){
      path = Npm.require('path').join(path,'index.html');
  }

  var file = fs.readFileSync(path);

  var headers = {
      //'Content-type': 'text/html'
      //'Content-Disposition': "attachment; filename=" + path
  };

  this.response.writeHead(200, headers);
  return this.response.end(file);

  //
  // var stat = fs.statSync(path);
  // var fileSize = stat.size;
  // const head = {
  //   'Content-Length': fileSize,
  //   'Content-Type': 'html',
  // }
  // this.response.writeHead(200, head)
  // fs.createReadStream(path).pipe(this.response).pipe(fs.createReadStream(path))
  }, {where: 'server'});


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
    return Meteor.subscribe('medias', this.params._id);
  },
  data: function() { return Films.findOne(this.params._id) ; }
});

Router.route('/films/:_id/edit', {
  name: 'filmEdit',
  data: function() { return Films.findOne(this.params._id); }
});

Router.route('/films/:_id/manage', {
  name: 'filmManager',
  waitOn: function() {
    return Meteor.subscribe('medias', this.params._id);
  },
  data: function() { return Films.findOne(this.params._id) ;}
})



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


Router.map(function() {
    this.route('home', {path: '/'});

    this.route('buildsList', {
        path: '/builds/',
        waitOn: function() {
            return Meteor.subscribe('allBuilds');
        }
    });

    this.route('buildPage', {
        path: '/builds/:_id',
        waitOn: function() {
            return Meteor.subscribe('build', this.params._id);
        },
        data: function(){
            return Zips.findOne({_id: this.params._id});
        }
    });

    this.route('newBuild', { path: 'new'} );
});

Router.map(function() {
    this.route('play', {
        path: '/play/:_id',
        waitOn: function() {
            return Meteor.subscribe('build', this.params._id);
        },
        data: function(){
            return Zips.findOne({_id: this.params._id});
        }
    });
});

Router.map(function() {
    this.route('files', {
        path: '/files/:_id(.*)',
        where: 'server',
        action: function() {
            //var fs = Meteor.npmRequire('fs');
            var fs = Npm.require('fs');
            var id = this.params._id;
            var basedir = Meteor.settings.public.zipFolder;

            console.log('will serve static content @ '+ id);

            var path = basedir + id;

            if(fs.lstatSync(path).isDirectory()){
                path = Meteor.npmRequire('path').join(path,'index.html');
            }

            var file = fs.readFileSync(path);

            var headers = {
                //'Content-type': 'text/html'
                //'Content-Disposition': "attachment; filename=" + path
            };

            this.response.writeHead(200, headers);
            return this.response.end(file);
        }
    });
});


Router.onBeforeAction('dataNotFound', {only: 'filmPage'});
Router.onBeforeAction(requireLogin, {only: 'filmSubmit'});





Router.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    var strings = params.url.split("/");
    console.log(strings);
    Accounts.verifyEmail( strings[4], ( error ) =>{
      if ( error ) {
        console.log(error);
      } else {
        Router.go( '/films_list' );
        console.log( 'Email verified! Thanks!');
      }
    });
  }
});
