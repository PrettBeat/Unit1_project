var lugia = (function(){
  return {
    map: {},
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
      console.log(sideconvert);
    }else if(typeof(topconvert)=="undefined"&&side==="top"){
      topconvert = current/42.5;
      console.log(topconvert);
    }
    var changed = current + (20*direction);
    var sideCheck = side === "left" && changed <= 87*sideconvert && changed >= 0;
    var topCheck = side === "top" && changed <= 83*topconvert && changed >= 0;
    if(sideCheck||topCheck){
      $('#lugia').css(side, `${changed}px`);
      if(side==="left"){
        console.log('moving to the side')
        console.log(changed -(7.5*sideconvert));
        $('#a').css(side,`${changed -(7.5*sideconvert)}px`);
        $('#d').css(side,`${changed +(7.5*sideconvert)}px`);
        $('#s').css(side,`${changed}px`);
        $('#w').css(side,`${changed}px`);
      }else if(side==="top"){
        console.log('moving up and down')
        $('#w').css(side,`${changed -(7.5*topconvert)}px`);
        $('#s').css(side,`${changed +(7.5*topconvert)}px`);
        $('#a').css(side,`${changed}px`);
        $('#d').css(side,`${changed}px`);
      }
    }
  }
})();
