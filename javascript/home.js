var home = (function(){
  return{
    choices: ["Lugia's Mansion", "Peek at You WIP"],
    reset: function(){
      $('#game-content').empty().css('background-image','');
      this.choices.forEach(function(choice, index){
        $list = $('<div>').addClass('col-xs-12 gamechoice').attr('game', games[index]).text(choice).on('click', function(){games[index].reset();});
        $('#game-content').append($list);
      });
    }
  };
})();
