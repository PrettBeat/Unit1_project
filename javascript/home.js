var home = (function(){
  return{
    choices: ["Lugia's Mansion", "Pika Boo WIP"],
    reset: function(){
      $('#game-content').empty().css('background-image','');
      this.choices.forEach(function(choice, index){
        $list = $('<button>').addClass('col-xs-12 gamechoice').attr('game', games[index]).text(choice).on('click', function(){games[index].reset();});
        $('#game-content').append($list);
      });
      $('#instructions').text('Choose your game, and then click on it.');
    }
  };
})();
