const API_KEY = '7ade5558956123a107411dfabf1e2772';
var Trackster = {};
var trackobj = {};

$(document).ready(function(){
    $('.search').click(function(){
    	Trackster.searchTracksByTitle($('#inputext').val());
    });
    $("#inputext").keydown(function(event){
	    if(event.keyCode == 13 && $('#inputext').val()!= ''){
	    	Trackster.searchTracksByTitle($('#inputext').val());
	    	};
	});
	$('#popularity').click(function(){
		if (!jQuery.isEmptyObject(trackobj)){
			trackobj.sort(function(a, b) {
	    		return parseInt(b.listeners) - parseInt(a.listeners);
			});
			Trackster.renderTracks(trackobj);
		} 
	});
	$('#artist').click(function(){
		if (!jQuery.isEmptyObject(trackobj)){
			trackobj.sort(function(a, b) {
	  			var nameA = a.artist.toUpperCase(); // ignore upper and lowercase
	  			var nameB = b.artist.toUpperCase(); // ignore upper and lowercase
			  	if (nameA < nameB) {
			    	return -1;
			  	}
			  	if (nameA > nameB) {
			    	return 1;
			  	}
			}); 
			Trackster.renderTracks(trackobj);
		}
	});
	$('#song').click(function(){
		if (!jQuery.isEmptyObject(trackobj)){
			trackobj.sort(function(a, b) {
	  			var nameA = a.name.toUpperCase(); // ignore upper and lowercase
	  			var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			  	if (nameA < nameB) {
			    	return -1;
			  	}
			  	if (nameA > nameB) {
			    	return 1;
			  	}
			}); 
			Trackster.renderTracks(trackobj);
		}	
	});
});
/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
	Trackster.renderTracks = function(tracks) {
		$('.tracklist').empty();
		for (var i=0;i<tracks.length;i++){
			var mediumAlbumArt = tracks[i].image[1]['#text'];
			console.log(tracks.length);
			var people = numeral(tracks[i].listeners).format('0,0');
			var trackHtml = '<div class="row track">'+
							' <div class="col-xs-1 col-xs-offset-1">'+
							'  <a href="'+tracks[i].url+'" target="_blank"><i class="fa fa-play-circle-o play" aria-hidden="true"></i></a>'+
							' </div>'+
							' <div class="col-xs-4">'+tracks[i].name+'</div>'+
							' <div class="col-xs-2">'+tracks[i].artist+'</div>'+
							' <div class="col-xs-2"><img src='+mediumAlbumArt+'></div>'+
							' <div class="col-xs-2">'+people+'</div>'+
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
			url:'https://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
			success: function(result){
				console.log(result);
				trackobj = result.results.trackmatches.track;
				Trackster.renderTracks(result.results.trackmatches.track);
			},
			beforeSend: function(){
				$('.header h1').addClass('.title');
			},
			complete: function(){
				$('.header h1').removeClass('.title');
			}
		});
	};