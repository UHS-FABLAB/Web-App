Template.buildPage.helpers({
   own: function(){
       return Meteor.userId() && Meteor.userId() === this.owner._id;
   }
});
Template.buildPage.events({'click #removeBuild': function(event) {

    event.preventDefault();

    var id = Router.current().params._id;

    Zips.remove({_id: id}, function(err){
        Router.go('/');
    });
},'click #saveBuild': function(event) {

    event.preventDefault();

    var form = $(".build-page-form")[0];

    console.log(form);

    var id = Router.current().params._id;

    Zips.update(id, {
        $set: {
            title: form.buildTitle.value,
            width: +form.buildWidth.value,
            height: +form.buildHeight.value,
        }
    }, function(err){
        if(err) console.log("ERR");
        console.log("ok");
    });
}
});