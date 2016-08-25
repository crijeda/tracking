import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	var Twit = require('twit')

	var T = new Twit({
	  consumer_key:         'rWxYarWRZKdvRbz2gmuFxd5cJ',
	  consumer_secret:      'uB0fhUFi6QYspCvVOEkJ8vnrzECPikX7cDqkKdakoKTygoGmcf',
	  access_token:         '4860556390-7yiZqggLWmukStTnj1taraPwQIqVXBNmfmvVtWg',
	  access_token_secret:  '5HlsdQJAGZ95FIIDWS1mEtMZ7EyrQRsupyHrtxpwtIFrX',
	  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	})

var stream = T.stream('statuses/filter', { track: 'charliac16' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})

});

Meteor.methods({
  getTwitterTracks: function(query,token,maxcant) {
  	var cicles = maxcant/100;
  	var Twit = require('twit')
  	var tokens = TwitterTokens.find({_id:token}).fetch();
  	// console.log(tokens)
  	var token_id = tokens[0]._id;
  	var consumer_key = tokens[0].consumer_key;
	var consumer_secret = tokens[0].consumer_secret;
	var access_token = tokens[0].access_token;
	var access_token_secret = tokens[0].access_token_secret;

	var T = new Twit({
	  consumer_key:         consumer_key,
	  consumer_secret:      consumer_secret,
	  access_token:         access_token,
	  access_token_secret:  access_token_secret,
	})

     var tracks = [];
	 var max_id = '';
	 var Fiber = require('fibers');


		function doAsyncWork (max_id_var) {
		  var fiber = Fiber.current;
		  setTimeout(function () {
		  	 T.get('search/tweets', { q: query, max_id: max_id_var, count: 100}, function(err, data, response) {
			  	 Fiber(function () {			
					var createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
					Requests.insert({token_id: token_id, createdAt: createdAt});
				 }).run();
			  	 if (data){
			  	 var next_result = data.search_metadata.next_results;
			  	 if(typeof next_result !== 'undefined'){
				 var max_id = next_result.split("&")[0].split("=")[1] || undefined;
				 }
				 else{
				 var max_id = undefined;
				 }
			  	 fiber.run(max_id);
			  	  Fiber(function () {
						_.each(data.statuses, function(value) {
				          TwitterData.insert(value);
				        })
					 }).run();
			  	 }
		  	 })
		  }, 1500);

		  var results = Fiber.yield();
		  console.log(results);
		  return results;
		}
		function firstSearch () {
		  var fiber = Fiber.current;
		  	 T.get('search/tweets', { q: query, count: 100 }, function(err, data, response) {
		  	 	Fiber(function () {			
					var createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
					Requests.insert({token_id: token_id, createdAt: createdAt});
				 }).run();
			  	 if (data){
			  	 var next_result = data.search_metadata.next_results;
			  	 if(typeof next_result !== 'undefined'){
				 var max_id = next_result.split("&")[0].split("=")[1] || undefined;
				 }
				 else{
				 var max_id = undefined;
				 }
			  	 fiber.run(max_id);
				  	 Fiber(function () {
						_.each(data.statuses, function(value) {
				          TwitterData.insert(value);
				        })
					 }).run();
			  	 }
		  	 })

		  var results = Fiber.yield();
		  console.log(results);
		  return results;
		}


		var max_id2 = firstSearch();
		for (i = 1; i < cicles; i++) {
			if(typeof max_id2 !== 'undefined'){	
				var max_id2 = doAsyncWork(max_id2);
			}
		}

   },
   getInstagramTracks: function() {
   	var ig = require('instagram-node').instagram();
 
	// Every call to `ig.use()` overrides the `client_id/client_secret` 
	// or `access_token` previously entered if they exist. 
	ig.use({ access_token: '317946396.c407bb0.712b13cd31bc432c959fe91ee561259e',
			 client_id: 'c407bb0ab2f74e93bf1af5a9390c2694',
	         client_secret: '70dc762ef47248898b4caca6035b5e53' });

	ig.user_search('crijeda', function(err, users, remaining, limit) {

		console.log(users);
	});
    },
     getFacebookTracks: function() {
     var graph = require('fbgraph');
	   graph
	  .get("?access_token=159483481063866|cBn7lq8pGguMFUsndqbmmewYjPs", function(err, res) {
	    console.log(res); // { id: '4', name: 'Mark Zuckerberg'... } 
	  });
    },
    download: function() {
    var data = [];

		var collection = TwitterData.find().fetch();

	  _.each(collection, function(value) {

	  	//var possibly_sensitive	
	  	var hashtag_count = value.entities.hashtags.length || '';
	  	var hash_tags = _.pluck(value.entities.hashtags, 'text').toString() || '';	
	  	var url_count = value.entities.urls.length || '';
	  	var expanded_urls = _.pluck(value.entities.urls, 'expanded_url').toString() || '';	
	  	var user_mentions_count = value.entities.user_mentions.length || '';
	  	var user_mentions = _.pluck(value.entities.user_mentions, 'screen_name').toString() || '';
	  	if(typeof value.entities.media !=='undefined'){
		  	var media_count	= value.entities.media.length || '';
		  	var media_expanded_urls	= _.pluck(value.entities.media, 'expanded_url').toString() || '';	
	  	}
	  	else{
	  		var media_count	= '';
	  		var media_expanded_urls	= '';
	  	}			
	  	var symbols_count = value.entities.symbols.length || '';
	  	var symbols = _.pluck(value.entities.symbols, 'text').toString() || '';	
	  	var metadata_result_type = value.metadata.result_type || '';
	  	var metadata_iso_language_code = value.metadata.iso_language_code || '';

	  	var user_id = value.user.id || '';	
	  	var user_name = value.user.name || '';	
	  	var user_screen_name = value.user.screen_name || '';	
	  	var user_location = value.user.location || '';	
	  	var user_profile_image_url = value.user.profile_image_url || '';	

		 data.push({
		 	'id':value.id_str || '',
	  		'created_at':value.created_at || '',
	  		'text': value.text.replace(/(\r\n|\n|\r|)/gm,"") || '',
	  		// 'text_urlEncoded':text_urlEncoded,	
	  		'lang':value.lang || '',	
	  		'source':value.source || '',	
	  		'truncated':value.truncated || '',	
	  		'in_reply_to_screen_name':value.in_reply_to_screen_name || '',	
	  		'in_reply_to_status_id':value.in_reply_to_status_id || '',	
	  		'in_reply_to_user_id':value.in_reply_to_user_id || '',	
	  		'retweet_count':value.retweet_count || '',	
	  		'favorite_count':value.favorite_count || '',	
	  		'retweeted':value.retweeted || '',	
	  		'favorited':value.favorited || '',	
	  		// 'possibly_sensitive':possibly_sensitive,	
	  		'hashtag_count':hashtag_count,	
	  		'hash_tags':hash_tags,	
	  		'url_count':url_count,	
	  		'expanded_urls':expanded_urls,	
	  		'user_mentions_count':user_mentions_count,	
	  		'user_mentions':user_mentions,	
	  		'media_count':media_count,	
	  		'media_expanded_urls':media_expanded_urls,	
	  		'symbols_count':symbols_count,	
	  		'symbols':symbols,	
	  		// 'media_photo_count':media_photo_count,	
	  		// 'media_photo_urls':media_photo_urls,	
	  		'metadata_result_type':metadata_result_type,	
	  		'metadata_iso_language_code':metadata_iso_language_code,	
	  		'user_id':user_id,	
	  		'user_name':user_name,	
	  		'user_screen_name':user_screen_name,	
	  		'user_location':user_location,	
	  		'user_profile_image_url':user_profile_image_url,	
	  		'user_description':value.user.description.replace(/(\r\n|\n|\r|)/gm,"") || '',	
	  		'user_url': value.user.url || '',	
	  		'user_geo_enabled': value.user.geo_enabled || '',	
	  		'user_protected': value.user.protected || '',	
	  		'user_followers_count': value.user.followers_count || '',	
	  		'user_friends_count': value.user.friends_count || '',	
	  		'user_listed_count': value.user.listed_count || '',	
	  		'user_favourites_count': value.user.favourites_count || '',	
	  		'user_statuses_count': value.user.statuses_count || '',	
	  		'user_created_at': value.user.created_at || '',	
	  		'user_utc_offset': value.user.utc_offset || '',	
	  		'user_time_zone': value.user.time_zone || '',	
	  		'user_verified': value.user.verified || '',	
	  		'user_lang': value.user.lang || '',	
	  		'user_follow_request_sent':value.user.follow_request_sent,	
	  		'user_is_translator':value.user.is_translator,	
	  		'user_following':value.user.following,	
	  		'user_notifications':value.user.notifications,
		});
	  });
	  var heading = true; // Optional, defaults to true
	  var delimiter = "\t" // Optional, defaults to ",";
	  return exportcsv.exportToCSV(data, heading, delimiter);
	},
	TotalTweets: function() {
	 return TwitterData.find().count()
	},
	DeleteTweets: function() {
	 var tweets = _.pluck(TwitterData.find().fetch(), '_id');
          _.each(tweets, function(value) {
              TwitterData.remove({_id:value});
          })
     return true
	}, 	
 });

