 class road_map
 {
   constructor()
   {
     this.w=10;
     this.h=30;
     this.x1=width/7;
     this.y=0;
     this.x=floor(width/2-this.w/2);
     // this.x2=(width/5)*3;
     this.x2=width-this.x1;
   };
   draw(i)
   {
     this.y=this.y+4;
     // this.h=this.h-i*road_speed/10;
     fill(125,125,125,100);
     noStroke();
     rect(this.x1*2,0,this.x2-3*this.x1,height);
     triangle(this.x1*2,0,this.x1,height,this.x1*2,height);
     triangle(this.x2-this.x1,0,this.x2,height,this.x2-this.x1,height);
     //line(this.x2,0,this.x2,height);
     fill(255);
     strokeWeight(3);
      rect(this.x,this.y,this.w,this.h);

   }

 }
