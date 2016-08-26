/**
 * Configure Iron Router.
 * See: http://iron-meteor.github.io/iron-router/
 */
// Router.onBeforeAction(function () {
//     if (!Meteor.user() && !Meteor.loggingIn()) {
//         Router.go('login');
//     } else {
//         // required by Iron to process the route handler
//         this.next();
//     }
// }, {
//     except: ['login']
// }); 

Router.configure({
  layoutTemplate: 'Layout'
});
Router.route('/', {
  name: 'Home',
  waitOn: function() { return [Meteor.subscribe("TwitterTokens"),Meteor.subscribe("FacebookTokens")]; },
});
Router.route('/TwitterTokens', {
  name: 'TwitterTokensForm',
  waitOn: function() { return [Meteor.subscribe("TwitterTokens"), Meteor.subscribe("Requests")]; },
});
Router.route('/FacebookTokens', {
  name: 'FacebookTokensForm',
  waitOn: function() { return [Meteor.subscribe("FacebookTokens"), Meteor.subscribe("Requests")]; },
});
Router.route('/Twitter', {
  name: 'ListTwitterSearch',
   waitOn: function() { return [Meteor.subscribe("TwitterData",5),Meteor.subscribe("TwitterTokens"), Meteor.subscribe("Requests")]; },
});
Router.route('/Facebook', {
  name: 'ListFacebookSearch',
   waitOn: function() { return [Meteor.subscribe("FacebookData",5),Meteor.subscribe("FacebookTokens"), Meteor.subscribe("Requests")]; },
});

// Router.route('/login', {
//   name: 'login'
// });

// Router.route('/list', {
//   name: 'ListStuff'
// });

// Router.route('/users', {
//   name: 'users'
// });

// Router.route('/listOrigen', {
//   name: 'listOrigen',
//   waitOn: function() { return Meteor.subscribe("Origen"); },
// });
// Router.route('/listIds', {
//   name: 'listIds',
//   waitOn: function() { return [Meteor.subscribe("Origen"), Meteor.subscribe("CreateId")]; },
// });

// Router.route('/add', {
//   name: 'AddStuff'
// });
// Router.route('/addOrigen', {
//   name: 'AddOrigen'
// });

// Router.route('/CreateId', {
//   name: 'CreateId',
//   waitOn: function() { return [Meteor.subscribe("Origen"), Meteor.subscribe("CreateId")]; },
// });
// Router.route('/CreateIdMasivo', {
//   name: 'CreateIdMasivo',
//   waitOn: function() { return [Meteor.subscribe("Origen"), Meteor.subscribe("CreateId")]; },
// });

// Router.route('/origen/:_id', {
//   name: 'EditOrigen',
//   waitOn: function() { return Meteor.subscribe("Origen"); },
//   data: function() { return Origen.findOne(this.params._id); }
// });

// Router.route('/stuff/:_id', {
//   name: 'EditStuff',
//   data: function() { return Stuff.findOne(this.params._id); },
// });
