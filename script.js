  SC.initialize( {
      client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
  } );
  $( "#songSearch" ).submit(function( event ) {
  	$('.searchSongs').empty();
    	event.preventDefault();
      SC.get('/tracks',{
          q:$('#searchBar').val()
      })
      .then( function ( res ) {
          console.log( res )
          for ( let i = 0; i < res.length; i++ ) {
          	if(i<9){
  	        	let image = res[i].artwork_url;
  	        	if(!image){
  	        		image = "src/image/defaultSong.png ";
  	        	}
  	        	var song=document.createElement('div');
  	        	song.innerHTML="<div class='row song bg-primary' draggable='true'  ondragstart='drag(event)' id='"+res[i].id+"'>"+
  	        				"<img class='col-sm-4 songimg' src='"+image+"'>"+
  	        				"<div class= 'col-sm-8'>"+
  	        				"<p class='grupName'>"+res[i].user.username+"</p>"+
  	        				"<p class='songName'>"+res[i].title+"</p>"+
  	        				"</div>"+
  	        				"</div>"; 
  	            document.querySelector( '.searchSongs' ).append( song );
  	        }
  	    }
      })
  });
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var widgetIframe = document.getElementById('sc-widget'),
          widget       = SC.Widget(widgetIframe),
          newSoundUrl =  'https://api.soundcloud.com/tracks/'+ev.dataTransfer.getData("text");
          console.log(newSoundUrl);
          widget.load(newSoundUrl);

  }
  function allowDrop(ev) {
    ev.preventDefault();
  }