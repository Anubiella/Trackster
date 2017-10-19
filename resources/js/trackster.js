const API_KEY = '7ade5558956123a107411dfabf1e2772';
var Trackster = {};

$(document).ready(function(){
    $('.search').click(function(){
    	Trackster.searchTracksByTitle($('#inputext').val());
    });

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
	Trackster.renderTracks = function(tracks) {
		for (var i=0;i<tracks.length;i++){
			var trackHtml = '<div class="row track">'+
			'<div class="col-xs-1 col-xs-offset-1">'+
			'<i class="fa fa-play-circle-o play" aria-hidden="true"></i>'+
			'</div>    '+
			'<div class="col-xs-4">Così celeste    </div>'+
			'<div class="col-xs-2">Zucchero    </div>'+
			'<div class="col-xs-2">Spirito DiVino    </div>'+
			'<div class="col-xs-2">25615    </div>'+
			'</div>';
			$('.tracklist').append(trackHtml);
		}
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