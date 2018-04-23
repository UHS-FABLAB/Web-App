Template.play.onCreated(function(){
    //console.log(Router.current().params);
});

Template.play.helpers({
    root : function(){
        console.log(Router.current())
        return "/files/" + Router.current().params._id;
    }
});

Template.play.events({

});
