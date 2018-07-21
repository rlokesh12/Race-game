var road=[];
var road_speed=1;
var op=[];
function setup()
{
  createCanvas(1000,1000);
  road.push(new road_map);
}


function draw()
{
  background(51);
  if(frameCount%25===0)
  {

    road.push(new road_map);
  }
  if(frameCount%100===0)
  {
      road_speed+=1/2;
  }
  if(frameCount%50===0 && op.length<10)
  {
    op.push(new opponent);
  }
  for(var i=0;i<road.length;i++)
  {
    road[i].draw(i);
  }
  for(var i=0;i<op.length;i++)
  {
    op[i].move();
    op[i].draw();
  }

}


 class road_map
 {
   constructor()
   {
     this.w=10;
     this.h=200;
     this.x1=200;
     this.y=0;
     this.x2=width-this.x1;
   };
   draw(i)
   {
     this.y=this.y+1;
     this.h=this.h-i*road_speed/10;
     line(this.x1,0,this.x1,height);
     line(this.x2,0,this.x2,height);
     rect(width/2,this.y,this.w,this.h);

   }

 }

class opponent
{
  constructor()
  {
    this.x=random(100+2,500+2);
    this.y=random(height);
    this.d=10;
  }

  move()
  {
    this.y=this.y+road_speed/8;
  }

  draw()
  {
    ellipse(this.x,this.y,this.d);
  }
}
