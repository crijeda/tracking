Template.ListFacebookSearch.rendered = function() {

  Meteor.call('TotalPosts', function(err, data) {
  if (err)
    console.log(err);

  Session.set('q', data);
  });
  
};
Template.ListFacebookSearch.helpers({

   DateFormat: function (date) {
    return moment(date).format("DD-MM-YYYYTHH:mm");
  },
   Total: function () {  
    var total = Session.get('q');
    return total
  },
    Result: function () {
    return Session.get('result');
  },
    Posts: function () {
    var more = Session.get('more') || 5;
    Meteor.subscribe("FacebookData",more);
    var result = FacebookData.find({},{limit : more});
    Session.set('result', result.count());
    return result
  },
  FacebookTokensList: function () {
    var tokens = FacebookTokens.find().fetch();
    return tokens
  },
   loading: function () {
    return Session.get('loading')
  },
});

Template.ListFacebookSearch.events({

    'click .search': function () { 
    var test = $('#search').val();
    if(typeof test !== "undefined"){
    Session.set('test', $('#search').val()); 
    }
    var token = $('#token').val();
    if(typeof token !== "undefined"){
    Session.set('token', $('#token').val()); 
    }
    var maxcant = $('#maxcant').val();
    if(typeof maxcant !== "undefined"){
    Session.set('maxcant', $('#maxcant').val()); 
    }
    Session.set('loading', true);
    Meteor.call('getFacebookTracks',test,token,maxcant, function(error, result){
      if(error){
        Session.set('loading', false);
        alert('Error');
      }else{
    Session.set('response',result);
    setTimeout(function () {
        Meteor.call('TotalPosts', function(err, data) {
        if (err)
          console.log(err);

        Session.set('q', data);
        Session.set('loading', false);
        });
      }, 2500);
      }
    });
    return false
    },
    'click .clear': function () {
    document.getElementById("filter").reset();
    Session.set('test', undefined); 
    Session.set('origen', undefined); 
    Session.set('token', undefined); 
    Session.set('from', undefined); 
    Session.set('to', undefined);
    Session.set('more', 0);
    Session.set('loading', false);

    return false
    },
    'click .more': function () {
      var counter = $('#TextBox').val();
       counter++ ;
       $('#TextBox').val(counter);
      var more = counter*5;
      Session.set('more', more);
    return false
    },
    'click .remove': function () {
    Meteor.call('deleteCreateId',this._id);
    },
     'click .delete': function () {
      var r = confirm("Estas Seguro que quieres Borar Todos Los Posts?");
      if (r == true) {
          x = "You pressed OK!";
          Meteor.call("DeletePosts");
          Meteor.call('download', function(err, response) {
            if(response){
              Meteor.call('TotalPosts', function(err, data) {
                if (err)
                  console.log(err);

                Session.set('q', data);
                });
            }
          });
      } else {
          x = "You pressed Cancel!";
      }
    
    },
   'click .downloadfb': function(event) {
    var nameFile = 'facebook.csv';
    Meteor.call('downloadfb', function(err, fileContent) {
      if(fileContent){
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        saveAs(blob, nameFile);
      }
    });
    },
    'click .refresh': function(event) {
      Session.set('loading', true);
      Meteor.call('TotalPosts', function(err, data) {
        if (err)
          console.log(err);

        Session.set('q', data);
        });
      },


});