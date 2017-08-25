var lugia = (function(){
  return {
    map: {},
    ghostTypes:["images/duskull.png","images/gastly.png","images/gengar.png","images/haunter.png","images/shuppet.png"],
    enemySpawns:["0%","0%","95%","95%","0%","90%","0%","90%"],
    ghosts:[],
    score:0,
    defeat:0,
    victory:0,
    reset: function(){
      // prepares game window for lugia's mansion
      console.log("resetting for Lugia's Mansion");
      this.score = 0;
      $('#game-content').empty().css('background-image', 'url("images/Mansion.jpg")');
      $('#instructions').text("Welcome to luigi...er... I mean Lugia's Mansion. Lugia has won a contest that he didn't even know he entered. He is now the proud owner of a new Mansion. The only problem is...IT'S HAUNTED! Avoid the ghost (pokémon) with the arrow keys, and attack them with WASD keys. Tips: you can use multiple keys, but only one attack can work at a time. You can hold your attack out forever, so consider approaching with your attack at the ready. Your score keeps going until you lose, and it gets harder every ten points, so feel free to play again. Good Luck!");
      $('#game-content').append($('<button>').addClass('start').on('click',function(){lugia.start();}).text('Start'));
    },
    start: function(){
      // removes start button, and attaches lugia and the attack images to the screen
      $('.start').remove();
      var $lugia = $('<img>').attr('src', 'images/lugia.gif').addClass('lugia').attr('id','lugia');
      var $gusta = $('<img>').attr('src', 'images/animated-tornado-a.gif').addClass('gust').attr('id','a');
      var $gustw = $('<img>').attr('src', 'images/animated-tornado-w.gif').addClass('gust').attr('id','w');
      var $gustd = $('<img>').attr('src', 'images/animated-tornado-d.gif').addClass('gust').attr('id','d');
      var $gusts = $('<img>').attr('src', 'images/animated-tornado-s.gif').addClass('gust').attr('id','s');
      var count = 0;
      var level = Math.floor(this.score/10)+1;
      var whatIsDeadCanStillDie=setInterval(function(){
        lugia.ghosts.forEach(function(ghoul){
          // registers the current position of lugia, the attacks, and the ghosts
          var grave = $(`#${ghoul}`).position();
          var target = $('.lugia').position();
          var attackA = $('#a').position();
          var attackW = $('#w').position();
          var attackD = $('#d').position();
          var attackS = $('#s').position();
          if(typeof(grave)!=="undefined"){
            //calculates the distance between objects to verify if any two have collided
            var distanceA= distance(attackA.left,grave.left,attackA.top,grave.top);
            var distanceW= distance(attackW.left,grave.left,attackW.top,grave.top);
            var distanceD= distance(attackD.left,grave.left,attackD.top,grave.top);
            var distanceS= distance(attackS.left,grave.left,attackS.top,grave.top);
            var death= distance(target.left,grave.left,target.top,grave.top);
            var gustaCheck= distanceA<75&&$('#a').hasClass('active');
            var gustwCheck= distanceW<75&&$('#w').hasClass('active');
            var gustdCheck= distanceD<75&&$('#d').hasClass('active');
            var gustsCheck= distanceS<75&&$('#s').hasClass('active');
            var deathCheck= death<75;
            if (gustsCheck||gustaCheck||gustwCheck||gustdCheck){
              // if the ghost hits an attack while it's active, it is destroyed, and adds a point
              $(`#${ghoul}`).remove();
              count-=1;
              lugia.score+=1;
              $('#score').text(`Score: ${lugia.score}`);
            }

            if(deathCheck){
              // if a ghost hits lugia, you lose.
              clearInterval(whatIsDeadCanStillDie);
              lugia.defeat+=1;
            }
            if(count===0&&lugia.ghosts.length===10){
              // stops the interval when victory requirements are met.
              clearInterval(whatIsDeadCanStillDie);
            }
          }
        });
      },34);
      var gametime = setInterval(function(){
        console.log("ghost made");
        lugia.ghosts.forEach(function(spirit){
          // moves each ghost that is available a percentage of the distance to lugia based on the level
          var domain = $(`#${spirit}`).position();
          var target = $('.lugia').position();
          if(typeof(domain)!= "undefined"){
            let difference1 = domain.left - target.left;
            let new1 = domain.left - difference1*(level/10);
            $(`#${spirit}`).css('left', `${new1}`);
            let difference2 = domain.top - target.top;
            let new2 = domain.top - difference2*(level/10);
            $(`#${spirit}`).hide().css({'left':`${new1}px`, 'top':`${new2}px`}).fadeIn(500);
          }
        });
        if(lugia.ghosts.length <10){
          // creates, and generates the spawn point of the ghost.
          var spawn = Math.floor(Math.random()*4);
          var ghostType=Math.floor(Math.random()*5);
          let ghost=$('<img>').attr('src',lugia.ghostTypes[ghostType]).addClass('ghost').attr('id',`ghost${count}`).css('left',lugia.enemySpawns[spawn]).css('top',lugia.enemySpawns[4+spawn]);
          lugia.ghosts.push(ghost.attr('id'));
          $('#game-content').append(ghost);
          count +=1;
        }
        if(lugia.defeat!==0){
          // ends game if lugia is touched, and resets the score.
          clearInterval(gametime);
          gameOver("YOU LOSE...");
          lugia.score=0;
        }
        if (count === 0 && lugia.ghosts.length === 10){
          // ends game, but maintains score to increase the level on the next try.
          clearInterval(gametime);
          lugia.victory+=1;
          gameOver("YOU WIN!");
        }
      },(5000/level));
      $('body').on('keydown',
        function(event){
          // checks if the key down is one of the relevant keys to the game.
          let keys = [37,38,39,40,65,68,83,87]
          if (keys.includes(event.keyCode)){
            event.preventDefault();
          }
          // pushes a key value pair to the map property of lugia, that reads true when the key is held down.
          lugia.map[event.keyCode]= (event.type=='keydown');
          // continuously fires a basic movement function in the direction the key/keys signify
          if(lugia.map[37]==true){
            let clock = setInterval(function(){
              move("left",-1,"w");
              clearInterval(clock);
          },34);
          }
          if(lugia.map[38]==true){
            let clock = setInterval(function(){
              move("top",-1,"h");
              clearInterval(clock);
          },34);
          }
          if(lugia.map[39]==true){
            let clock = setInterval(function(){
              move("left",1,"w");
              clearInterval(clock);
          },34);
          }
          if(lugia.map[40]==true){
            let clock = setInterval(function(){
              move("top",1,"h");
              clearInterval(clock);
            },34);
          }
          // attacks appear in the direction associated with the key, so long as the key is held.
          if(lugia.map[65]==true){
            $gusta.addClass('active');
          }else if(lugia.map[68]==true){
            $gustd.addClass('active');
          }else if(lugia.map[83]==true){
            $gusts.addClass('active');
          }else if(lugia.map[87]==true){
            $gustw.addClass('active');
          }

      }).on('keyup',function(event){
        // changes the value of the keys in map when the key is lifted.
        lugia.map[event.keyCode] = event.type=='keydown';
        $('.gust').removeClass('active');
      });
      $('#game-content').append($lugia).append($gusta).append($gusts).append($gustd).append($gustw).append($('<h3>').text(`Score: ${lugia.score}`).attr('id','score'));
    }
  };
  function move(side, direction, letter){
    // verifies the game hasn't ended.
    if(lugia.victory===0&&lugia.defeat===0){
      // finds lugia's current position and creates converters for distance on the first key press.
      var current = parseInt(($('#lugia').css(side)).slice(0,-2));
      if(typeof(sideconvert)=="undefined"&&side ==="left"){
        sideconvert = current/42.5;
      }else if(typeof(topconvert)=="undefined"&&side==="top"){
        topconvert = current/42.5;
      }
      // sets new position for lugia, and verifies that that new position is in the game window.
      var changed = current + (20*direction);
      var sideCheck = side === "left" && changed <= 90*sideconvert && changed >= 0;
      var topCheck = side === "top" && changed <= 88*topconvert && changed >= 0;
      if(sideCheck||topCheck){
        // moves the attacks accordingly, so they are still in line with lugia.
        $('#lugia').css(side, `${changed}px`);
        if(side==="left"){
          $('#a').css(side,`${changed -(7.5*sideconvert)}px`);
          $('#d').css(side,`${changed +(7.5*sideconvert)}px`);
          $('#s').css(side,`${changed}px`);
          $('#w').css(side,`${changed}px`);
        }else if(side==="top"){
          $('#w').css(side,`${changed -(15*topconvert)}px`);
          $('#s').css(side,`${changed +(15*topconvert)}px`);
          $('#a').css(side,`${changed}px`);
          $('#d').css(side,`${changed}px`);
        }
      }
    }
  }
  function gameOver(texts){
    console.log(texts);
    // empties the game contents, and presents the results.
    $('#game-content').empty().append($('<h1>').text(texts))
    .append($('<button>').text("Play Again?").addClass('start').on('click',function(){
      $('#game-content').empty();
      lugia.ghosts=[];
      lugia.victory=0;
      lugia.defeat=0;
      lugia.start();
    }).css('top','42.5%').css('left','42.5%'));
  }
  function distance(x,y,a,b){
    // calculates the distance between images.
    return Math.sqrt(Math.pow(Math.abs(x-y),2)+Math.pow(Math.abs(a-b),2));
  }
})();
