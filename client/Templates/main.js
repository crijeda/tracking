
Template.Home.onCreated(function HomeOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.Home.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  twcant: function () {
    var tokens = TwitterTokens.find().fetch();
    return tokens.length;
  },
  logocolor: function (cant) {
    if(cant == 0){
      return '-webkit-filter: grayscale(100%); filter: grayscale(100%);'
    }
    else{
      return ''
    }
  },

});

Template.Home.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click .twitter': function () {
   	Meteor.call('getTwitterTracks');
   },
   'click .instagram': function () {
    Meteor.call('getInstagramTracks');
   },
   'click .facebook': function () {
    Meteor.call('getFacebookTracks');
   },
});
