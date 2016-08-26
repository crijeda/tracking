Template.FacebookTokens.helpers({

  twcant: function () {
    var tokens = FacebookTokens.find().fetch();
    return tokens.length;
  },
  tokens: function () {
    var tokens = FacebookTokens.find().fetch();
    return tokens;
  },
  requests: function (id) {
  	var last60minutes = moment().add(-60, 'minutes').format("YYYY-MM-DDThh:mm:ss");
   	var requests = Requests.find({token_id:id}).fetch();
   	var tracks = [];
   	_.each(requests, function(value) {
	   	if(value.createdAt>last60minutes){
	   	tracks.push(value);
	    }
	})
	var cant = tracks.length;
  return cant;
  },
  perecent: function (id) {
      var last60minutes = moment().add(-60, 'minutes').format("YYYY-MM-DDThh:mm:ss");
    var requests = Requests.find({token_id:id}).fetch();
    var tracks = [];
    _.each(requests, function(value) {
      if(value.createdAt>last60minutes){
      tracks.push(value);
      }
  })
  var cant = tracks.length;
  	var percent = cant/200;
    var percent = Math.round(percent * 100);
    return percent;
  },
  totalrequests: function () {
  	var tokens = _.pluck(FacebookTokens.find().fetch(), '_id');
   	var requests = Requests.find({token_id:{ $in: tokens }}).fetch();
    return requests.length;
  },
});