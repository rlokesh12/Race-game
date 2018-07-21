"use strict";
let bub=[];
var bg1,bg2;
let car;
let op=[];
let fu=[];
var xspeed=2;
var yspeed=2;
var game_over=false;
var score=0;
let road=[];
let dividers=[];
var road_speed=1;
var health;
var lost=0;
var fuel;
var loss_rate = 0.25;
var fuel_lost = 0;
var  fuel_add = 200;
var bg_y=0;
var op_car;
var bg3,bg4;

function mousePressed()
{
  // for(var i=bub.length-1;i>=0;i--)
  // {
  //   if(bub[i].contain(mouseX,mouseY))
  //   {
  //     bub.splice(i,1);
  //   }
  // }
  //bub.push(new bubble(mouseX,mouseY,25));
}


function preload(){
  car=loadImage('pics/c3.png');
  op_car=loadImage('pics/c6.png');
  bg1=loadImage('pics/bg7.jpg');
  bg2=loadImage('pics/bg7.jpg');
  bg3=loadImage('pics/bg4.jpg');
  bg4=loadImage('pics/bg4.jpg');
}


function setup(){
  createCanvas(600,600);
  road.push(new road_map);
  health = 2*(height/3);
  fuel = 2*(height/3);
  textAlign(CENTER);
  road.push(new road_map());
  fill( color(20, 75, 200));
  bub.push(new bubble(width/2,height,15));
  for(var i=0;i<random(1,6);i++)
  {
    op.push(new opponent(random(50,width-50),random(50,height-50),random(10,30)));
  }
}


function draw(){
  // background(0,100,0);
  if(frameCount>1000)
  {
    image(bg1,0,0,width,bg_y);
    image(bg2,0,bg_y,width,height);
  }
  else {
    image(bg3,0,0,width,bg_y);
    image(bg4,0,bg_y,width,height);
  }
  console.log(bg_y);
  bg_y=bg_y+1;
  if(bg_y===height)
  {
    bg_y=0;
  }

  if(loss_rate > 1)
  	loss_rate=1;
  fuel -= loss_rate;
  fuel_lost += loss_rate;
  loss_rate += 0.0001;

  if(fuel <= 0)
  	game_over = true;
  if(frameCount%25===0)
  {
    road.push(new road_map);
  }
  if(frameCount%100===0)
  {
      road_speed+=1/2;
  }
  if(frameCount%50===0)
  {
    op.push(new opponent);
  }
  if(frameCount%500===0){
  	fu.push(new fuelTank);
  }

  for(var i=0;i<road.length;i++)
  {
    road[i].draw(i);
  }
  stroke(0);
  fill(0);
  rect(width/8,height/6,20,2*(height/3));
  fill(200,0,0)
  //print("-----",health);
  if(health<0)
  	health=0;
  rect(width/8,(height/6)+lost,20,health);
  stroke(0);
  fill(0);
  rect(7*(width/8),height/6,20,2*(height/3));
  fill(204,153,51)
  //print("-----",health);
  if(fuel<0)
  	fuel=0;
  rect(7*(width/8),(height/6)+fuel_lost,20,fuel);

  for(var i=0;i<op.length;i++)
  {
    op[i].move();
    op[i].show();
  }

  for(var i=0;i<fu.length;i++)
  {
    fu[i].move();
    fu[i].show();
  }


  if(!game_over)
  {
    textSize(30);
    text("Score: "+ceil(frameCount/30),100,30);
    bub[0].score=ceil(frameCount/20);
    text("Overcome: "+bub[0].overcome,width/2,30);
  }
  else {
	background(51,51,51,200);
    text("Score: "+bub[0].score,100,30);
    text("Overcome: "+bub[0].overcome,width/2,30);
    textSize(20);
          //fill(random(0,255));
          text("GAME OVER !!!", width / 2, height / 2);
  }
  for(var i=0;i<bub.length;i++)
  {
    if(bub[i].contain(mouseX,mouseY))
    {
      bub[i].changeColor();
    }
    else {
      bub[i].value=0;
    }
    bub[i].move();
    bub[i].show();
  }

  for(var i=0;i<fu.length;i++)
  {
    fu[i].show();
    //bub[0].collision(fu[i]);
  }
  for(var i=fu.length-1;i>=0;i--) {
      if (collision(fu[i], bub[0])) {

      	  fuel += fuel_add;
      	  fuel_lost -= fuel_add;
      	  fuel_add += 1;
      	  if(fuel > 2*(height/3)) {
      	  	  print("yes");
              fuel = 2 * (height / 3);
              fuel_lost = 0;
          }
          fu.splice(i,1);
      }
  }
  for(var i=0;i<op.length;i++)
  {
    op[i].show();
    //bub[0].collision(op[i]);
  }
  for(var i =0;i<op.length;i++)
  {
    if(collision(op[i],bub[0]))
    {
	  health -= 10;
	  lost+=10;
	  print("REduced---",health);
	  if(health<=0) {
          xspeed = 0;
          yspeed = 0;
          game_over = true;
          //textSize(20);
          //fill(random(0,255));
          //text("GAME OVER !!! COLLISION !!!", width / 2, height / 2);
      }
    }
      if(overcome(op[i],bub[0]) && !game_over)
      {
        bub[0].overcome+=1;
      }
  }
}

function keyPressed(){
    if(keyCode === LEFT_ARROW)
    {
      if(xspeed==2|| xspeed==0 ||xspeed==-2)
      {
        xspeed=-2;
        yspeed=0;
      }
    }
    if(keyCode===UP_ARROW)
    {
      if(yspeed==2|| yspeed==0 ||yspeed==-2 )
      {
        yspeed=-2;
        xspeed=0;
      }
    }
    if(keyCode === RIGHT_ARROW)
    {
      if(xspeed==-2 || xspeed==0 ||xspeed==2 )
      {
        xspeed=2;
        yspeed=0;
      }
    }


  if(keyCode===DOWN_ARROW)
  {
    if(yspeed==-2||yspeed==0 ||yspeed==2)
    {
      yspeed=2;
      xspeed=0;
    }
  }
}

function collision(other,b)
{
  var d=dist(b.x,b.y,other.x,other.y);
  if(d<(b.d+other.d))
  {
    return true;
  }
  return false;
}

function overcome(other,b)
{
  if(b.y<other.y && other.overtakenBy===false)
  {
    // console.log(other.y," ",b.y);
    other.overtakenBy=true;
    return true;

  }
  return false;
}

class bubble{
  constructor(x,y,d)
  {
    this.x=x;
    this.y=y;
    this.d=d;
    this.value=0;
    this.overcome=0;
    this.score=0;
    this.overtakenBy=false;
  };

  move()
  {
    if(!game_over)
    {
      if(this.x<(width/5) ||  this.x>(4*width/5) )
      {
        xspeed=xspeed*(-1);
      }
      //constrain(this.x,width/5,width-width/5);
      if(this.y<0 || this.y>600)
      {
        yspeed=yspeed*(-1);
      }
      this.x=this.x+xspeed;
      this.y=this.y+yspeed;
   }
  };
  show()
  {
    noStroke();
    fill(this.value);
    fill(204,153,0)
    ellipse(this.x,this.y,this.d*2);
    image(car,this.x,this.y);


  }

  contain(px,py)
  {
    var d=dist(px,py,this.x,this.y);

    if(d>(this.d))
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  changeColor()
  {
    this.value=170;
  }


}
