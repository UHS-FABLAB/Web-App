Zips = new FS.Collection("zips", {
    stores: [new FS.Store.FileSystem("zips", {path: Meteor.settings.public.zipFolder})]
});


Zips.allow({
    'insert': function (userId, fileObj) {
      //  console.log("insert currentUser:" + userId);
        //console.log(fileObj);

        return userId && userId === fileObj.owner._id;
    },
    'download': function(userId, fileObj) {
        return true;
    },
    'update': function(userId, fileObj){
        //console.log("update currentUser:" + userId);

        return userId && fileObj.owner._id === userId;
    },
    'remove' : function(userId, fileObj){
        //console.log("currentUser:" + userId);

        var file = Meteor.settings.public.zipFolder+fileObj.copies.zips.key;

        //console.log("remove file:" + file);
        return userId && userId === fileObj.owner._id;
    }
});


Zips.on('stored',  Meteor.bindEnvironment(function (fileObj) {
    var unzip = Npm.require('unzip2');
    var fs = Npm.require('fs');
// console.log(fileObj.copies)
//     //console.log(fileObj, Meteor.settings.public.zipFolder);
//     console.log("stored:" + fileObj.copies.zips.key);
    var zipFile;
    var zipFolder;
    if(typeof fileObj.copies.zips == "undefined"){
      zipFile = Meteor.settings.public.videoFolder+fileObj.copies.files.key;
      zipFolder = Meteor.settings.public.videoFolder + fileObj._id;
      fs.createReadStream(zipFile)
      .on('close', function(){
          console.log('close');

          var fs = Npm.require('fs');

          if( fs.existsSync(zipFile)){
              fs.unlinkSync(zipFile);

              console.log('file ' + zipFile + ' removed!');
          }

      });
    }else{
      zipFile = Meteor.settings.public.zipFolder+fileObj.copies.zips.key;
      zipFolder = Meteor.settings.public.zipFolder + fileObj._id;
      fs.createReadStream(zipFile)
          .pipe(unzip.Extract({ path: zipFolder + '/' }))
          .on('end', function(){
              console.log('end');
          })
      .on('close', function(){
          console.log('close');

          var fs = Npm.require('fs');

          if( fs.existsSync(zipFile)){
              fs.unlinkSync(zipFile);

              console.log('file ' + zipFile + ' removed!');
          }

      });
    }

    console.log(zipFile, zipFolder)

}));



Zips.on('removed',  Meteor.bindEnvironment(function (fileObj) {
    console.log("removed:" + fileObj._id);

    deleteFolderRecursive(Meteor.settings.public.zipFolder + fileObj._id);
}));

var deleteFolderRecursive = function(path) {
    var fs = Meteor.npmRequire('fs');

    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
