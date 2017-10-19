$(document).ready(function(){
    $('.search').click(function(){
    	Trackster.searchTracksByTitle($('#inputext').val());
    });


const API_KEY = '7ade5558956123a107411dfabf1e2772';
var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
	$.ajax({
		url:'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
		success: function(result){
			console.log(result);
		}
	});
};

});