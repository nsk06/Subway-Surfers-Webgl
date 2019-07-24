currentPos=0;
statusKeys = {}
 COLOR_RED = [ 255/255,40/255, 7/255, 1.0];
 COLOR_GREEN = [ 135/255, 211/255, 124 /255, 1.0];
 COLOR_BLACK = [ 52/255, 73/255, 94/255, 1.0 ];
 COLOR_BACKGROUND = [ 30/255, 30/255, 30/255, 1.0 ];
 COLOR_ORANGE = [255/255,153/255,51/255, 1.0];
 COLOR_LightG = [178/255,255/255,102/255, 1.0];
 COLOR_Purple = [102/255,0/255,204/255, 1.0];
 COLOR_Cyan   = [0/255,191/255,255/255, 1.0];
 COLOR_Peach = [255/255,204/255,153/255, 1.0];
 COLOR_BLUE = [0/255,50/255,255/255, 1.0];
 COLOR_GOLD = [255/255,210/255,0/255, 1.0];
 COLOR_GreyL = [211/255,211/255,211/255, 1.0];
 COLOR_Silver = [192/255,192/255,192/255, 1.0];
 COLOR_Grey  = [128/255,128/255,128/255, 1.0];
 COLOR_Met  = [65/255,70/255,75/255, 1.0];
 COLOR_WHITE = [255/255,255/255,255/255, 1.0];
 COLOR_PURE = [0/255,0/255,0/255, 1.0];
 COLOR_TAN = [210/255,180/255,140/255, 1.0];
 COLOR_WATER = [100/255,210/255,204/255, 1.0];
 COLOR_CHOC = [210/255,105/255,30/255, 1.0];
 COLOR_DGREEN = [0/255,100/255,0/255, 1.0];
 COLOR_OLIVE = [107/255,142/255,35/255, 1.0];
 COLOR_YGREEN = [154/255,205/255,50/255, 1.0];
 COLOR_FGREEN = [34/255,139/255,34/255, 1.0];
 COLOR_SGREEN = [0/255,128/255,0/255, 1.0];
 COLOR_FIRE = [242/255,125/255,12/255, 1.0];
 COLOR_Sienaa = [160/255,82/255,45/255, 1.0];
 COLOR_Maroon = [128/255,10/255,10/255, 1.0];
 COLOR_Lime = [0/255,255/255,0/255, 1.0];
 COLOR_Yell = [210/255,210/255,0/255,1.0];


 var mygrayscale = false;
 var myflash = false;
var lives = 1;
var coins=[];
var score = 0;
var frame_count = 0;
var last_coin = 100;
var last_wall = 96
var bounding_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var player_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var coin_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var jump_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var duck_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var traf_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var grass_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var fly_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var boot_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var train_box = {x:0,y:0,z:0,width:0,height:0,depth:0};
var bone_box = {x:-3,y:0,z:-187,width:1,height:1,depth:1};
var life_box = {x:0,y:0,z:-413,width:1,height:1,depth:1};
posx = 0
jump_check = false
var boot_timer = -1
var fly_timer = -1
jump_counter = -1
y_speed = .2
var bone_timer = -1
var player_speed = .2;
var dog_speed = .2;
var police_speed = .2;
duck = false
duck_count = -1
side_walls = []
jump_board = []
duck_board = []
traf_lights = []
trains = []
var pol_check = -1;
grass = []
train_speed = .5;
on_train = false;
trains = []
ontrain = []
bone_taken = false
taken = false
// Self Declared Variables
main();
function main() {
  //console.log("here in main");
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
train_texture = mapTexture(gl,'train1.jpg');
lane_texture = mapTexture(gl,'check.svg');
player_texture = mapTexture(gl,'play.jpg')
police_texture = mapTexture(gl,'police.jpg');
dog_texture = mapTexture(gl,'dog.jpg');
boot_texture = mapTexture(gl,'boot.jpg');
fly_texture = mapTexture(gl,'jet.jpeg')
obstacle_texture = mapTexture(gl,'obstacle.jpg');
wall_texture = mapTexture(gl,'wall.JPG');
life_texture = mapTexture(gl,'live.png');
bone_texture = mapTexture(gl,'bone.jpeg');
bone = new Bone(gl,[-3,0,-187],1,1,1);
life = new Life(gl,[0,0,-413],1,1,1);
  lane_left = new Lane(gl,[-3,-1,5],.25,1,2500,COLOR_PURE)
  lane_center = new Lane(gl,[0,-1,5],.25,1,2500,COLOR_PURE)
  lane_right = new Lane(gl,[3,-1,5],.25,1,2500,COLOR_PURE)
  boot = new Boot(gl,[0,0,-238],1,1,1,COLOR_BLUE);
  fly_boost = new Fly(gl,[3,0,-377],1,1,1,COLOR_YGREEN);
  police = new Police(gl,[0,0,4],1.5,1,.2,COLOR_BLUE);
  dog = new Dog(gl,[0,0,2.5],1,1,.2,COLOR_WHITE);
  player = new Player(gl,[0,0,0],1.5,1,.2,COLOR_RED);
  trains.push(new Train(gl,[-3,0.5,-200],2,1.2,35))
  trains.push(new Train(gl,[0,0.5,-200],2,1.2,35))
  trains.push(new Train(gl,[3,0.5,-200],2,1.2,35))
  trains.push(new Train(gl,[-3,0.5,-600],2,1.2,35))
  trains.push(new Train(gl,[-3,0.5,-650],2,1.2,35))
  trains.push(new Train(gl,[-3,0.5,-700],2,1.2,35))

  trains.push(new Train(gl,[0,0.5,-650],2,1.2,35))
  trains.push(new Train(gl,[0,0.5,-700],2,1.2,35))
  trains.push(new Train(gl,[0,0.5,-800],2,1.2,35))

  trains.push(new Train(gl,[3,0.5,-550],2,1.2,35))
  trains.push(new Train(gl,[3,0.5,-650],2,1.2,35))
  trains.push(new Train(gl,[3,0.5,-700],2,1.2,35))
  for(var i=500;i<700;i+=5)
  {
    c = new Coin(gl,[-3,2,-i],.3,COLOR_GOLD);
    coins.push(c);
    c = new Coin(gl,[0,2,-i],.3,COLOR_GOLD);
    coins.push(c);
    c = new Coin(gl,[3,2,-i],.3,COLOR_GOLD);
    coins.push(c);
  }
  for(var i=0;i<10;i++)
  {
    g = new Grass(gl,[-.4,-1+.5,-73*(i+1)],.3,COLOR_Lime);
    grass.push(g);
    g = new Grass(gl,[0,-1+.5,-73*(i+1)],.3,COLOR_Lime);
    grass.push(g);
    g = new Grass(gl,[.4,-1+.5,-73*(i+1)],.3,COLOR_Lime);
    grass.push(g);
    g = new Grass(gl,[-.4-3,-1+.5,-93*(i+1)],.3,COLOR_Lime);
    grass.push(g);
    g = new Grass(gl,[0-3,-1+.5,-93*(i+1)],.3,COLOR_Lime);
    grass.push(g);
    g = new Grass(gl,[.4-3,-1+.5,-93*(i+1)],.3,COLOR_Lime);
    grass.push(g);
    g = new Grass(gl,[-.4+3,-1+.5,-83*(i+1)],.3,COLOR_Lime);
    grass.push(g);
    g = new Grass(gl,[0+3,-1+.5,-83*(i+1)],.3,COLOR_Lime);
    grass.push(g);
    g = new Grass(gl,[.4+3,-1+.5,-83*(i+1)],.3,COLOR_Lime);
    grass.push(g);

  }
  for(var i=0;i<8;i++)
  {
    traf_lights.push([new cuboid(gl,[-3,1,-163*(i+1)],4,.6,.33,COLOR_Sienaa),
                      new cuboid(gl,[-3,3.5,-163*(i+1)],1,1.75,.2,COLOR_RED)]);
    
   traf_lights.push([new cuboid(gl,[0,1,-213*(i+1)],4,.6,.33,COLOR_Sienaa),
                    new cuboid(gl,[0,3.5,-213*(i+1)],1,1.75,.2,COLOR_RED)]);
  traf_lights.push([new cuboid(gl,[3,1,-233*(i+1)],4,.6,.33,COLOR_Sienaa),
                  new cuboid(gl,[3,3.5,-233*(i+1)],1,1.75,.2,COLOR_RED)]);
    
  }
  for (var i=0;i<=100;i+=4)
  {
    var c = new Coin(gl,[-3,0,-i],.3,COLOR_GOLD)
    coins.push(c)
    var c = new Coin(gl,[0,0,-i],.3,COLOR_GOLD)
    coins.push(c)
    var c = new Coin(gl,[3,0,-i],.3,COLOR_GOLD)
    coins.push(c)

  }
  for(var i= 0;i<=150;i+=6)
  {
    c = new Coin(gl,[-3,5,-380-i],.3,COLOR_GOLD);
    coins.push(c);
    c = new Coin(gl,[0,5,-380-i],.3,COLOR_GOLD);
    coins.push(c);
    c = new Coin(gl,[3,5,-380-i],.3,COLOR_GOLD);
    coins.push(c);
  }
  for(var i=0;i<5;i++)
  {
    jump_board.push(new Obs(gl,[-3,-.5,-100*(i+1)],1,2,.2,COLOR_FIRE));
    jump_board.push(new Obs(gl,[3,-.5,-(150)*(i+1)],1,2,.2,COLOR_FIRE));
    jump_board.push(new Obs(gl,[0,-.5,-(125)*(i+1)],1,2,.2,COLOR_FIRE));    
    duck_board.push(new Obs(gl,[-3,1,-150*(i+1)],1,2.5,.2,COLOR_DGREEN));
    duck_board.push(new Obs(gl,[3,1,-100*(i+1)],1,2.5,.2,COLOR_DGREEN));
    duck_board.push(new Obs(gl,[0,1,-110*(i+1)],1,2.5,.2,COLOR_DGREEN));

  }
  for(var i = 0;i<=100;i+=6)
  {
    var wall = new Wall(gl,[-4.5,0,-i],6,.5,3.5,COLOR_Silver);
    side_walls.push(wall);
    var wall = new Wall(gl,[4.5,0,-i],6,.5,3.5,COLOR_Silver);
    side_walls.push(wall);
  }
  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSourceTexture = `
  attribute vec4 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;
  varying highp vec3 Lighteffects;
  varying highp vec2 vTextureCoord;
  varying lowp vec4 vColor;

  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform bool myflash;
  highp vec3 unitlighdirection = normalize(vec3(0, -2.1, 12));
  highp vec3 alights = vec3(0.6, 0.6, 0.6);
  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    highp vec3 lightdirection = vec3(0.6, 0.6, 0.6);
    highp vec4 newnormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
    vTextureCoord = aTextureCoord;
    highp float directional = max(dot(newnormal.xyz, unitlighdirection), 0.0);
    if (myflash) 
    {
      lightdirection = vec3(2.2,2.2,2.2);        
    }
    Lighteffects = alights + (lightdirection * directional);
  }
`;
const fsSourceTexture = `
precision mediump float;
varying highp vec2 vTextureCoord;
varying highp vec3 Lighteffects;

uniform sampler2D uSampler;
uniform float now;
uniform bool mygrayscale;

vec4 Grayfunction(in vec4 color) {
  float avg = (color.r + color.g + color.b) / 3.0;
  return vec4(avg, avg, avg, 1.0); 
}
void main(void) {  
highp vec4 text_color_extract = texture2D(uSampler, vTextureCoord);
  if (mygrayscale)
  {		
    gl_FragColor = Grayfunction(vec4(text_color_extract.rgb * Lighteffects, text_color_extract.a)); 	

  }
  else {
    gl_FragColor = vec4(text_color_extract.rgb *Lighteffects,text_color_extract.a);
  }
}
`;
const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;
    precision mediump float;
    uniform bool mygrayscale;
    void main(void) {
      if (mygrayscale)
      {	
        float gray = dot(vColor.rgb, vec3(0.299, 0.587, 0.114));
        gl_FragColor = vec4(vec3(gray),1.0); 	
      }
      else {
       gl_FragColor = vColor;
      }
    }
  `;
  // Fragment shader program

  

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgramTexture = initShaderProgram(gl, vsSourceTexture, fsSourceTexture);
  const shaderProgramColor = initShaderProgram(gl, vsSource, fsSource);
  // const shaderProgram1 = initShaderProgram(gl, vsSource, fsSource);
  // const shaderProgram2 = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfoTexture = {
    program: shaderProgramTexture,
    attribLocations: {
      vertexNormal: gl.getAttribLocation(shaderProgramTexture, 'aVertexNormal'),
      vertexColor: gl.getAttribLocation(shaderProgramTexture, 'aVertexColor'),
      vertexPosition: gl.getAttribLocation(shaderProgramTexture, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgramTexture, 'aTextureCoord'),
     
    },
    uniformLocations: {
      mygrayscale: gl.getUniformLocation(shaderProgramTexture, 'mygrayscale'),
      myflash: gl.getUniformLocation(shaderProgramTexture, 'myflash'),
      normalMatrix: gl.getUniformLocation(shaderProgramTexture, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgramTexture, 'uSampler'),
      projectionMatrix: gl.getUniformLocation(shaderProgramTexture, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgramTexture, 'uModelViewMatrix'),
    },
  };
  const programInfo = {
    program: shaderProgramColor,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgramColor, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgramColor, 'aVertexColor'),
    },
    uniformLocations: {
      modelViewMatrix: gl.getUniformLocation(shaderProgramColor, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgramColor, 'uSampler'),
      projectionMatrix: gl.getUniformLocation(shaderProgramColor, 'uProjectionMatrix'),
      mygrayscale: gl.getUniformLocation(shaderProgramColor, 'mygrayscale'),
      myflash: gl.getUniformLocation(shaderProgramColor, 'myflash'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    frame_count++;
    document.getElementById('life').innerHTML = "Lives : "+lives
    if(bone_timer >= 0)
    {
      bone_timer++;
      if(bone_timer > 400)
      {
        bone_timer = -1;
      }
    }
    if(mygrayscale == true)
    {
      document.getElementById("glcanvas").style.filter = "grayscale(100%)"
    }
    if(mygrayscale == false)
    {
      document.getElementById("glcanvas").style.filter = "grayscale(0%)"
    }
    if(player.pos[2] < -1000)
    {
        document.getElementById("load").innerHTML = "<img src='win.jpg' alt='GAME Win' class='center' height='550' width='720'/>"
    }
    if(fly_timer >=0)
    {
      player.pos[1] = 5;
      fly_timer++;
      if(fly_timer > 300)
      {
        fly_timer = -1;
        player.pos[1] = 0;
      }
    }
    if(boot_timer >=0)
    {
      boot_timer++;
      y_speed = .32;
      if(boot_timer > 360)
      {
        boot_timer = -1;
      }
    }
    if(boot_timer == -1)
    {
      y_speed = .2
    }
    if(pol_check >= 0)
    {
      console.log('here')
      pol_check++;
      // police.pos[2] = player.pos[2]+3
      // police.pos[0] = player.pos[0]
      if(pol_check > 600)
      {
        pol_check = -1;
      }
    }
    if(frame_count > 300 && pol_check == -1)
    {
      police.pos[2] = player.pos[2]+8;
    }
    if(frame_count%15 == 0)
    {
      coins.push(new Coin(gl,[-3,0,-(last_coin+4)],.3,COLOR_GOLD));
      coins.push(new Coin(gl,[0,0,-(last_coin+4)],.3,COLOR_GOLD));
      coins.push(new Coin(gl,[3,0,-(last_coin+4)],.3,COLOR_GOLD));
      side_walls.push(new Wall(gl,[-4.5,0,-last_wall-6],6,.5,3.5,COLOR_Silver))
      side_walls.push(new Wall(gl,[4.5,0,-last_wall-6],6,.5,3.5,COLOR_Silver))
      last_coin += 4;
      last_wall += 6
    }
    if (now%10 > 5) {
      myflash = true;
    }
    else 
    {
      myflash = false;
    }
    gamestate();
    gl.uniform1i(programInfo.uniformLocations.mygrayscale, mygrayscale);
    gl.uniform1i(programInfoTexture.uniformLocations.mygrayscale, mygrayscale);
    gl.uniform1i(programInfoTexture.uniformLocations.myflash, myflash);
    gl.uniform1i(programInfo.uniformLocations.myflash, myflash);
    drawScene(gl, programInfo, deltaTime,programInfoTexture);
    if(duck == true && duck_count == -1)
    {
      duck_count = 0
    }
    if(duck_count>=0)
    {
      duck_count++;
      if(duck_count > 300)
      {
        duck = false;
        duck_count = -1;
      }
    }
    tick();
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// Draw the scene.
//
function gamestate()
{
    // console.log('in gamestate');
    player_box.x = player.pos[0];
    player_box.y = player.pos[1];
    player_box.z = player.pos[2];
    player_box.width = 1;
    player_box.height = 1.5;
    player_box.depth = 1;
    boot_box.x = boot.pos[0];
    boot_box.y = boot.pos[1];
    boot_box.z = boot.pos[2];
    boot_box.height = .8;
    boot_box.width = 1;
    boot_box.depth = .2

    fly_box.x = fly_boost.pos[0];
    fly_box.y = fly_boost.pos[1];
    fly_box.z = fly_boost.pos[2];
    fly_box.height = 1;
    fly_box.width = 1;
    fly_box.depth = 1;
    if(check_collision(player_box,life_box) == true && taken == false)
    {
      lives +=2;
      taken = true;
    }
    if(check_collision(player_box,bone_box) ==true && bone_taken == false)
    {
      bone_timer = 0;
      bone_taken = true;
    }
    if(check_collision(fly_box,player_box)==true && fly_timer == -1)
    {
      fly_timer = 0;
    }
    if(check_collision(boot_box,player_box) == true && boot_timer == -1)
    {
      boot_timer = 0;
    }
    for(var i = 0;i<coins.length;i++)
    {
      coin_box.x = coins[i].pos[0];
      coin_box.y = coins[i].pos[1];
      coin_box.z = coins[i].pos[2];
      coin_box.width = .6;
      coin_box.depth = 0;
      coin_box.height = .6;
      // console.log(check_collision(player_box,coin_box));
      if(check_collision(player_box,coin_box)==true)
      {
        // console.log('coin collected')
          coins.splice(i,1);
          score++;
          document.getElementById('score').innerHTML = "Score : "+score
          break;
      }
      if(coins[i].pos[2]>player.pos[2]+4)
      {
          // console.log('removed')
          coins.splice(i,1);
          break;
      }
    }
    for(var i = 0;i<side_walls.length;i++)
    {
      if(side_walls[i].pos[2] > player.pos[2]+4)
      {
          side_walls.splice(i,1);
          break;
      }
    }
    for(var i=0;i<jump_board.length;i++)
    {
      jump_box.x = jump_board[i].pos[0];
      jump_box.y = jump_board[i].pos[1];
      jump_box.z = jump_board[i].pos[2];
      jump_box.height = 1;
      jump_box.width = 2;
      jump_box.depth = .2;
      if(check_collision(player_box,jump_box)==true)
      {
        console.log('gameover jump');
        lives -=1;
        jump_board.splice(i,1);
        break;
        //document.getElementById("load").innerHTML = "<img src='gameover.jpg' alt='GAME OVER' class='center' height='550' width='720'/>"

      }
    }
    for(var i=0;i<duck_board.length;i++)
    {
      duck_box.x = duck_board[i].pos[0];
      duck_box.y = duck_board[i].pos[1];
      duck_box.z = duck_board[i].pos[2];
      duck_box.height = 1;
      duck_box.width = 2;
      duck_box.depth = .2;
      if(check_collision(player_box,duck_box)==true)
      {
        console.log('gameover duck');
        lives -=1;
        duck_board.splice(i,1);
        break;
        //document.getElementById("load").innerHTML = "<img src='gameover.jpg' alt='GAME OVER' class='center' height='550' width='720'/>"

      }
    }
    for(var i=0;i<traf_lights.length;i++)
    {
      traf_box.x = traf_lights[i][0].pos[0];
      traf_box.y = traf_lights[i][0].pos[1];
      traf_box.z = traf_lights[i][0].pos[2];
      traf_box.height = 5;
      traf_box.width = .6;
      traf_box.depth = .3;
      if(check_collision(player_box,traf_box)==true)
      {
        console.log('lights col');
        console.log(i);
        if(pol_check > 0)
        {
        //document.getElementById("load").innerHTML = "<img src='gameover.jpg' alt='GAME OVER' class='center' height='550' width='720'/>"
        console.log('gameover successive');
        lives -=1;
        }
        if(pol_check < 0)
        {
          pol_check = 0;
          police.pos[2] = player.pos[2]+3.5;
          police.pos[0] = player.pos[0]
        }
        traf_lights.splice(i,1);
        break;
      }
      if(traf_lights[i][0].pos[2] > player.pos[2]+4)
      {
        traf_lights.splice(i,1);
        break;
      }
    }
    for(var i=0;i<grass.length;i+=3)
    {
      grass_box.x = grass[i].pos[0];
      grass_box.y = grass[i].pos[1];
      grass_box.z = grass[i].pos[2];
      grass_box.height = .2;
      grass_box.width = 1;
      grass_box.depth = 0;
      if(check_collision(player_box,grass_box)==true)
      {
        console.log('lights col');
        console.log(i);
        if(pol_check > 0)
        {
        //document.getElementById("load").innerHTML = "<img src='gameover.jpg' alt='GAME OVER' class='center' height='550' width='720'/>"
        console.log('gameover successive');
        lives -=1;
        }
        if(pol_check < 0)
        {
          pol_check = 0;
          police.pos[2] = player.pos[2]+3.5;
          police.pos[0] = player.pos[0]
        }
        grass.splice(i,3);
        break;
      }
      if(grass[i].pos[2] > player.pos[2]+4)
      {
        grass.splice(i,3);
        break;
      }
    }
    for(var i=0;i<trains.length;i++)
    {
      train_box.x = trains[i].pos[0];
      train_box.y = trains[i].pos[1];
      train_box.z = trains[i].pos[2];
      train_box.height = 2;
      train_box.width = 1.2;
      train_box.depth = 35;
      ontrain[i] = false;
      if(check_collision(train_box,player_box) == true)
      {
        if(player.pos[2]-trains[i].pos[2] > 16 && player.pos[1] < 1.5)
        {
          console.log('train collision');
          lives =0;
          //document.getElementById("load").innerHTML = "<img src='gameover.jpg' alt='GAME OVER' class='center' height='550' width='720'/>"
        }
        else
        {
          ontrain[i] = true;
          player.pos[1] = trains[i].pos[1] + 1.7
          dog.pos[1] = player.pos[1]
        }
      }
    }

}
function tick()
{
    //console.log("here in tick");
    if(lives <=0)
    {
      document.getElementById("load").innerHTML = "<img src='gameover.jpg' alt='GAME OVER' class='center' height='550' width='720'/>"

    }
    fly_boost.rotation+=.25;
    player.pos[0] = posx
    dog.pos[0] = player.pos[0]
    for(var i=0;i<trains.length;i++)
    {
      if(Math.abs(player.pos[2]-trains[i].pos[2]) < 100)
      {
        trains[i].pos[2] += train_speed;
      }
    }
    if(jump_check == true)
    { 
      if(jump_counter == -1)
      {
        temp  = y_speed
        jump_counter = 0;
      }
      if(jump_counter >=0)
      {
        jump_counter++;
        if(jump_counter > 300)
        {
          jump_counter = -1;
          jump_check = false
        }
      }
      player.pos[1] += temp;
      dog.pos[1] +=temp
      if(player.pos[1] <= 0)
      {
        jump_check = false;
        jump_counter = -1
        player.pos[1] = 0
        dog.pos[1] = 0
      }
      temp -= .03*(jump_counter/60)
      player.pos[2] -=.3;
      dog.pos[2] -=.3
      return;
    }
    player.pos[2] -= player_speed;
    dog.pos[2] -= dog_speed;
    dog.pos[0] = player.pos[0]
    police.pos[0]  = player.pos[0]
    police.pos[2] -= police_speed
    if(pol_check > 0)
    {
      police.pos[2] = player.pos[2]+3.5;
      police.pos[0] = player.pos[0];
    }
    if(bone_timer > 0)
    {
      dog.pos[2] = player.pos[2]+8;
    }
}

function drawScene(gl, programInfo, deltaTime,programInfoTexture) {
  gl.clearColor(0,0,0, 0.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
    var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [0,2+.5+player.pos[1],10+player.pos[2]]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

     var up = [0, 1, 0];
    mat4.lookAt(cameraMatrix, cameraPosition, [0,1+player.pos[1],player.pos[2]-5], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    var viewProjectionMatrix = mat4.create();

  mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
  lane_center.drawLane(gl,viewProjectionMatrix,programInfoTexture,deltaTime,lane_texture);
  lane_left.drawLane(gl,viewProjectionMatrix,programInfoTexture,deltaTime,lane_texture);
  lane_right.drawLane(gl,viewProjectionMatrix,programInfoTexture,deltaTime,lane_texture);
  for(var i=0;i<coins.length;i++)
  {
    if(coins[i].pos[2]<player.pos[2]+4)
    {
      coins[i].drawCoin(gl,viewProjectionMatrix,programInfo,deltaTime);

    }
  }
  for(var i=0;i<traf_lights.length;i++)
  {
    traf_lights[i][0].drawCube(gl,viewProjectionMatrix,programInfo,deltaTime);
    traf_lights[i][1].drawCube(gl,viewProjectionMatrix,programInfo,deltaTime);
  }
  for(var i=0;i<side_walls.length;i++)
  {
    side_walls[i].drawWall(gl,viewProjectionMatrix,programInfoTexture,deltaTime,wall_texture);
  }
  for(var i=0;i<jump_board.length;i++)
  {
    jump_board[i].drawObs(gl,viewProjectionMatrix,programInfoTexture,deltaTime,obstacle_texture);
  }
  for(var i=0;i<duck_board.length;i++)
  {
    duck_board[i].drawObs(gl,viewProjectionMatrix,programInfoTexture,deltaTime,obstacle_texture);
  }
  for(var i=0;i<grass.length;i++)
  {
    grass[i].drawGrass(gl,viewProjectionMatrix,programInfo,deltaTime);
  }
  boot.drawBoot(gl,viewProjectionMatrix,programInfoTexture,deltaTime,boot_texture);
  fly_boost.drawFly(gl,viewProjectionMatrix,programInfoTexture,deltaTime,fly_texture);
  for(var i=0;i<trains.length;i++)
  {
    trains[i].drawTrain(gl,viewProjectionMatrix,programInfoTexture,deltaTime,train_texture);
  }
  life.drawLife(gl,viewProjectionMatrix,programInfoTexture,deltaTime,life_texture);
  bone.drawBone(gl,viewProjectionMatrix,programInfoTexture,deltaTime,bone_texture);
  dog.drawDog(gl,viewProjectionMatrix,programInfoTexture,deltaTime,dog_texture);
  police.drawPolice(gl,viewProjectionMatrix,programInfoTexture,deltaTime,police_texture);
  player.drawPlayer(gl,viewProjectionMatrix,programInfoTexture,deltaTime,player_texture);
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
function check_collision(a,b)
{
  return ((Math.abs(a.x - b.x) * 2 < (a.width + b.width)) &&
  (Math.abs(a.y - b.y) * 2 < (a.height + b.height)) &&
      (Math.abs(a.z - b.z) * 2 < (a.depth + b.depth)));
}
function getRandomInt(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}