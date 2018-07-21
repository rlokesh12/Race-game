class opponent
{
  constructor()
  {
    this.x=random(width/5+2,width-width/5-2);
    this.y=0;
    this.d=10;
    this.value=0;
    this.overcome=0;
    this.score=0;
    this.overtakenBy=false;
  }

  move()
  {
      // this.x=this.x+road_speed/4;
      this.y=this.y+road_speed/2;
  }
  show()
  {
   //image(car,this.x,this.y);
    noStroke();
    fill(this.value);
    // ellipse(this.x,this.y,this.d*2);
    op_car.resize(48,37);
    image(op_car,this.x,this.y);
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

class fuelTank {
    constructor() {
        this.x = random(width / 5 + 2, width - width / 5 - 2);
        this.y = 0;
        this.d = 10;
        this.value = color(204, 153, 51);
        this.overcome = 0;
        this.score = 0;
        this.overtakenBy = false;
    }

    move() {
        // this.x=this.x+road_speed/4;
        this.y = this.y + road_speed / 2;
    }

    show() {
        //image(car,this.x,this.y);
        stroke(255);
        fill(this.value);
        ellipse(this.x, this.y, this.d * 2);
    }
}
