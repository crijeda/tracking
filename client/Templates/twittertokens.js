Template.TwitterTokens.helpers({

  twcant: function () {
    var tokens = TwitterTokens.find().fetch();
    return tokens.length;
  },
  tokens: function () {
    var tokens = TwitterTokens.find().fetch();
    return tokens;
  },
  requests: function (id) {
  	var last15minutes = moment().add(-15, 'minutes').format("YYYY-MM-DDThh:mm:ss");
   	var requests = Requests.find({token_id:id}).fetch();
   	var tracks = [];
   	_.each(requests, function(value) {
	   	if(value.createdAt>last15minutes){
	   	tracks.push(value);
	    }
	})
	var cant = tracks.length;
  return cant;
  },
  perecent: function (id) {
      var last15minutes = moment().add(-15, 'minutes').format("YYYY-MM-DDThh:mm:ss");
    var requests = Requests.find({token_id:id}).fetch();
    var tracks = [];
    _.each(requests, function(value) {
      if(value.createdAt>last15minutes){
      tracks.push(value);
      }
  })
  var cant = tracks.length;
  	var percent = cant/450;
    var percent = Math.round(percent * 100);
    return percent;
  },
  totalrequests: function () {
  	var tokens = _.pluck(TwitterTokens.find().fetch(), '_id');
   	var requests = Requests.find({token_id:{ $in: tokens }}).fetch();
    return requests.length;
  },
});