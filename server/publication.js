Meteor.publish('films', function() {
  return Films.find();
});

Meteor.publish('medias', function(filmId) {
  check(filmId, String);
  return Medias.find({filmId: filmId});
});

Meteor.publish('allBuilds', function(){
    return Zips.find();
});

Meteor.publish('build', function(id){
    return Zips.find({_id:id});
});


Zips.on('stored',  Meteor.bindEnvironment(function (fileObj) {
    var unzip = Npm.require('unzip2');
    var fs = Npm.require('fs');

    //console.log(fileObj, Meteor.settings.public.zipFolder);
    console.log("stored:" + fileObj.copies.zips.key);

    var zipFile = Meteor.settings.public.zipFolder+fileObj.copies.zips.key;
    var zipFolder = Meteor.settings.public.zipFolder + fileObj._id;
    console.log(zipFile, zipFolder)
    fs.createReadStream(zipFile)
        //.pipe(unzip.Parse())
        //.on('entry', function (entry) {
        //    console.log(entry);
        //
        //    var fileName = entry.path;
        //    var type = entry.type; // 'Directory' or 'File'
        //    var size = entry.size;
        //    //if (fileName === "this IS the file I'm looking for") {
        //        entry.pipe(fs.createWriteStream(Meteor.settings.public.zipFolder + 'out/' + fileName));
        //    //} else {
        //    //    entry.autodrain();
        //    //}
        //})
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

Files.on('stored',  Meteor.bindEnvironment(function (fileObj) {

    var fs = Npm.require('fs');

    //console.log(fileObj, Meteor.settings.public.zipFolder);
    console.log("stored:" + fileObj.copies.zips.key);

    var zipFile = Meteor.settings.public.zipFolder+ fileObj.copies.zips.key;
    var zipFolder = Meteor.settings.public.zipFolder + fileObj._id;
    console.log(zipFile, zipFolder)
    fs.createReadStream(zipFile)
        //.pipe(unzip.Parse())
        //.on('entry', function (entry) {
        //    console.log(entry);
        //
        //    var fileName = entry.path;
        //    var type = entry.type; // 'Directory' or 'File'
        //    var size = entry.size;
        //    //if (fileName === "this IS the file I'm looking for") {
        //        entry.pipe(fs.createWriteStream(Meteor.settings.public.zipFolder + 'out/' + fileName));
        //    //} else {
        //    //    entry.autodrain();
        //    //}
        //})
        .pipe()
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
}));

Meteor.publish('votes', function() {
  return Votes.find();
});


Meteor.publish('responses', function() {
  return Responses.find();
});
