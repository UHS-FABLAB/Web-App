Template.play.onCreated(function(){
    //console.log(Router.current().params);
});

Template.play.helpers({
    root : function(){
      var routeWebgl = this._id._id
      if(typeof routeWebgl == 'undefined'){
        routeWebgl = Router.current().params._id
      }
        console.log(Router.current(), Router.current().params._id, this)
        return "/files/" + routeWebgl;
    }
});

Template.play.events({
 'click #spacebtn' : function() {
   var e = jQuery.Event( "keydown", { keyCode: 32 } );
   jQuery( "body" ).trigger( e );
 }
});
