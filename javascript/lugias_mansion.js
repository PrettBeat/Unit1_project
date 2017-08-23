var lugia = (function(){
  return {
    map: {},
    ghostTypes:["images/duskull.png","images/gastly.png","images/gengar.png","images/haunter.png","images/shuppet.png"],
    enemySpawns:["0%","0%","95%","95%","0%","90%","0%","90%"],
    level:1,
    ghosts:[],
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
      var gametime = setInterval(function(){
        console.log("ghost made");
        lugia.ghosts.forEach(function(spirit){
          var thing = $(`#${spirit}`);
          let difference1 = thing.position().left - $('.lugia').position().left;
          let new1 = thing.position().left - difference1*(lugia.level/10);
          $(`#${spirit}`).css('left', `${new1}`);
          let difference2 = thing.position().top - $('.lugia').position().top;
          let new2 = thing.position().top - difference2*(lugia.level/10);
          $(`#${spirit}`).css({'left':`${new1}px`, 'top':`${new2}px`});
        });
        var spawn = Math.floor(Math.random()*4);
        var ghostType=Math.floor(Math.random()*5);
        let ghost=$('<img>').attr('src',lugia.ghostTypes[ghostType]).addClass('ghost').attr('id',`ghost${count}`).css('left',lugia.enemySpawns[spawn]).css('top',lugia.enemySpawns[4+spawn]);
        lugia.ghosts.push(ghost.attr('id'));
        $('#game-content').append(ghost);
        if (count === 4){
          lugia.level +=1;
          count=0;
          clearInterval(gametime);
        }
        count+=1;
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
          },1);
          }
          if(lugia.map[38]==true){
            let clock = setInterval(function(){
              move("top",-1,"h");
              clearInterval(clock);
          },1);
          }
          if(lugia.map[39]==true){
            let clock = setInterval(function(){
              move("left",1,"w");
              clearInterval(clock);
          },1);
          }
          if(lugia.map[40]==true){
            let clock = setInterval(function(){
              move("top",1,"h");
              clearInterval(clock);
            },1);
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
    var current = parseInt(($('#lugia').css(side)).slice(0,-2));
    if(typeof(sideconvert)=="undefined"&&side ==="left"){
      sideconvert = current/42.5;
    }else if(typeof(topconvert)=="undefined"&&side==="top"){
      topconvert = current/42.5;
    }
    var changed = current + (20*direction);
    var sideCheck = side === "left" && changed <= 87*sideconvert && changed >= 0;
    var topCheck = side === "top" && changed <= 83*topconvert && changed >= 0;
    if(sideCheck||topCheck){
      $('#lugia').css(side, `${changed}px`);
      if(side==="left"){
        $('#a').css(side,`${changed -(7.5*sideconvert)}px`);
        $('#d').css(side,`${changed +(7.5*sideconvert)}px`);
        $('#s').css(side,`${changed}px`);
        $('#w').css(side,`${changed}px`);
      }else if(side==="top"){
        $('#w').css(side,`${changed -(7.5*topconvert)}px`);
        $('#s').css(side,`${changed +(7.5*topconvert)}px`);
        $('#a').css(side,`${changed}px`);
        $('#d').css(side,`${changed}px`);
      }
    }
  }
})();
