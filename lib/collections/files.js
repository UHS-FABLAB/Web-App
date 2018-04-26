Files = new FS.Collection('files',{
  stores: [new FS.Store.FileSystem("files", {path: Meteor.settings.public.videoFolder})]
  //  debug: true,
  //  //storagePath: 'video',
  // // permissions: 0o774,
  // // parentDirPermissions: 0o774,
  // collectionName: 'Files',
  // allowClientCode: false, // Disallow remove files from Client
  // onBeforeUpload: function(file) {
  //   // Allow upload files under 10MB, and only in png/jpg/jpeg formats
  //   if (file.size <= 1024*1024*200 && /png|jpeg|jpg|mkv|mp4/i.test(file.extension)) {
  //     return true;
  //   } else {
  //      return 'Please upload image, with size equal or less than 10MB';
  //   }
  // }
});
// Files.allow({
//   insert: function(userId, file) { return userId && file.metadata && file.metadata.owner === userId; },
//   update: function(userId, file, fields, modifier) {
//     return userId && file.metadata && file.metadata.owner === userId;
//   },
//   remove: function(userId, file) { return userId && file.metadata && file.metadata.owner === userId; }
// });
// ostrio:files
Files.allow({
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

        var file = Meteor.settings.public.videoFolder+fileObj.copies.files.key;

        //console.log("remove file:" + file);
        return userId && userId === fileObj.owner._id;
    }
});

//
//
// Files.on('stored',  Meteor.bindEnvironment(function (fileObj) {
//
//     var fs = Npm.require('fs');
//
//     //console.log(fileObj, Meteor.settings.public.zipFolder);
//     console.log("stored:" + fileObj.copies.files.key);
//
//     var zipFile = Meteor.settings.public.videoFolder+ fileObj.copies.files.key;
//     var zipFolder = Meteor.settings.public.videoFolder + fileObj._id;
//     console.log(zipFile, zipFolder)
//     fs.createReadStream(zipFile)
//         //.pipe(unzip.Parse())
//         //.on('entry', function (entry) {
//         //    console.log(entry);
//         //
//         //    var fileName = entry.path;
//         //    var type = entry.type; // 'Directory' or 'File'
//         //    var size = entry.size;
//         //    //if (fileName === "this IS the file I'm looking for") {
//         //        entry.pipe(fs.createWriteStream(Meteor.settings.public.zipFolder + 'out/' + fileName));
//         //    //} else {
//         //    //    entry.autodrain();
//         //    //}
//         //})
//         .pipe()
//         .on('end', function(){
//             console.log('end');
//         })
//     .on('close', function(){
//         console.log('close');
//
//         var fs = Npm.require('fs');
//
//         if( fs.existsSync(zipFile)){
//             fs.unlinkSync(zipFile);
//
//             console.log('file ' + zipFile + ' removed!');
//         }
//
//     });
// }));
