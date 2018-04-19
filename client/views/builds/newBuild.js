Template.newBuild.helpers({

});

Template.newBuild.events({'submit .new-build-form': function(event) {

    event.preventDefault();

    var file = $("input.image-bug")[0].files[0];

    console.log(file);

    var fileObj = new FS.File(file);
    console.log('oo')
    fileObj.title = event.target.title.value;
    fileObj.width = 800;
    fileObj.height = 600;
    fileObj.owner = Meteor.user();
    console.log(fileObj)
    Zips.insert(fileObj,function(err){
        console.log('end', fileObj, err)
        Router.go('/builds/' + fileObj._id);
    });
}});
