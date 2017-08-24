var peek = (function(){
  return {
    reset: function(){
      console.log("Starting Peek at You");
      $('#game-content').empty().css('background-image','url(images/peekatyoubackground.png)').append($('<img>').attr('src','images/Pikaconstruction.gif').addClass('peekaboo'));
      $('#instructions').text("Sorry for the inconvenience, but Peek at You is not functional yet. Please return to Lugia's Mansion for the time being." );
    }
  };
})();
