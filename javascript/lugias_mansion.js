var lugia = (function(){
  return {
    map: {},
    ghostTypes:["images/duskull.png","images/gastly.png","images/gengar.png","images/haunter.png","images/shuppet.png"],
    enemySpawns:["0%","0%","95%","95%","0%","90%","0%","90%"],
    level:1,
    ghosts:[],
    defeat:0,
    victory:0,
    reset: function(){
      console.log("resetting for Lugia's Mansion");
      $('#game-content').empty().css('background-image', 'url("images/Mansion.jpg")');
      $('#game-content').append($('<button>').addClass('start').on('click',function(){lugia.start();}));
    },
    start: function(){
      $('.start').remove();
      var $lugia = $('<img>').attr('src', 'images/lugia.gif').addClass('lugia').attr('id','lugia');
      var $gusta = $('<img>').attr('src', 'images/animated-tornado-a.gif').addClass('gust').attr('id','a');
      var $gustw = $('<img>').attr('src', 'images/animated-tornado-w.gif').addClass('gust').attr('id','w');
      var $gustd = $('<img>').attr('src', 'images/animated-tornado-d.gif').addClass('gust').attr('id','d');
      var $gusts = $('<img>').attr('src', 'images/animated-tornado-s.gif').addClass('gust').attr('id','s');
      var count = 0;
      var whatIsDeadCanStillDie=setInterval(function(){
        lugia.ghosts.forEach(function(ghoul){
          var grave = $(`#${ghoul}`).position();
          var target = $('.lugia').position();
          var attackA = $('#a').position();
          var attackW = $('#w').position();
          var attackD = $('#d').position();
          var attackS = $('#s').position();
          if(typeof(grave)!=="undefined"){
            var distanceA= distance(attackA.left,grave.left,attackA.top,grave.top);
            var distanceW= distance(attackW.left,grave.left,attackW.top,grave.top);
            var distanceD= distance(attackD.left,grave.left,attackD.top,grave.top);
            var distanceS= distance(attackS.left,grave.left,attackS.top,grave.top);
            var death= distance(target.left,grave.left,target.top,grave.top);
            var gustaCheck= distanceA<75&&$('.active')[0].attributes.id.nodeValue === "a";
            var gustwCheck= distanceW<75&&$('.active')[0].attributes.id.nodeValue === "w";
            var gustdCheck= distanceD<75&&$('.active')[0].attributes.id.nodeValue === "d";
            var gustsCheck= distanceS<75&&$('.active')[0].attributes.id.nodeValue === "s";
            var deathCheck= death<50;
            if (gustsCheck||gustaCheck||gustwCheck||gustdCheck){
              $(`#${ghoul}`).remove();
              count-=1;
              console.log(count);
            }
            if(deathCheck){
              clearInterval(whatIsDeadCanStillDie);
              lugia.defeat+=1;
            }
            if(count===0&&lugia.ghosts.length===10){
              clearInterval(whatIsDeadCanStillDie);
            }
          }
        });
      },34);
      var gametime = setInterval(function(){
        console.log("ghost made");
        lugia.ghosts.forEach(function(spirit){
          var domain = $(`#${spirit}`).position();
          var target = $('.lugia').position();
          if(typeof(domain)!= "undefined"){
            let difference1 = domain.left - target.left;
            let new1 = domain.left - difference1*(lugia.level/10);
            $(`#${spirit}`).css('left', `${new1}`);
            let difference2 = domain.top - target.top;
            let new2 = domain.top - difference2*(lugia.level/10);
            $(`#${spirit}`).hide().css({'left':`${new1}px`, 'top':`${new2}px`}).fadeIn(500/lugia.level);
          }
        });
        if(lugia.ghosts.length <10){
          var spawn = Math.floor(Math.random()*4);
          var ghostType=Math.floor(Math.random()*5);
          let ghost=$('<img>').attr('src',lugia.ghostTypes[ghostType]).addClass('ghost').attr('id',`ghost${count}`).css('left',lugia.enemySpawns[spawn]).css('top',lugia.enemySpawns[4+spawn]);
          lugia.ghosts.push(ghost.attr('id'));
          $('#game-content').append(ghost);
          count +=1;
        }
        if(lugia.defeat===1){
          clearInterval(gametime);
          gameOver("YOU LOSE...");
          $('<button>').text("Restart?").addClass('start').on('click',function(){lugia.start()}).css('top','42.5%').css('left','42.5%');
        }
        if (count === 0 && lugia.ghosts.length === 10){
          lugia.level +=1;
          lugia.victory+=1;
          clearInterval(gametime);
          gameOver("YOU WIN!");
          $('<button>').text("Next Level?").addClass('start').on('click',function(){lugia.start;lugia.level+=1;}).css('top','42.5%').css('left','42.5%');
        }
      },5000/lugia.level);
      $('body').on('keydown',
        function(event){
          let keys = [37,38,39,40,65,68,83,87]
          if (keys.includes(event.keyCode)){
            event.preventDefault();
          }
          lugia.map[event.keyCode]= (event.type=='keydown');
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
        lugia.map[event.keyCode] = event.type=='keydown';
        $('.gust').removeClass('active');
      });
      $('#game-content').append($lugia).append($gusta).append($gusts).append($gustd).append($gustw);
    }
  };
  function move(side, direction, letter){
    if(lugia.victory===0&&lugia.defeat===0){
      var current = parseInt(($('#lugia').css(side)).slice(0,-2));
      if(typeof(sideconvert)=="undefined"&&side ==="left"){
        sideconvert = current/42.5;
      }else if(typeof(topconvert)=="undefined"&&side==="top"){
        topconvert = current/42.5;
      }
      var changed = current + (20*direction);
      var sideCheck = side === "left" && changed <= 90*sideconvert && changed >= 0;
      var topCheck = side === "top" && changed <= 83*topconvert && changed >= 0;
      if(sideCheck||topCheck){
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
    $('#game-content').empty().append($('<h1>').text(texts));
  }
  function distance(x,y,a,b){
    return Math.sqrt(Math.pow(Math.abs(x-y),2)+Math.pow(Math.abs(a-b),2));
  }
})();
