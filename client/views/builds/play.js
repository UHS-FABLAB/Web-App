Template.play.onCreated(function(){
    //console.log(Router.current().params);
});

Template.play.helpers({
    root : function(){
        console.log(Router.current(), Router.current().params._id, this)
        return "/files/" + this._id._id;
    }
});

Template.play.events({

});
