class Food{

    constructor(){

        this.foodStock = 0;
        this.lastFedTime = 0;

        //load image
        this.image=loadImage("Images/Milk.png");

    }

    display(){

        var x=80, y=100;

        //ImageMode(CENTER);
        imageMode(CENTER);
        image(this.image, 720, 220, 70,70);

        if (this.foodStock!=0){

            for (var i=0; i<this.foodStock; i++){

                if (i%10==0){

                    x=80;
                    y=y+50;

                }

                image(this.image,x,y,50,50);
                x=x+30;
            }
        }

        fill(255,255,254);
        textSize(15);
        if(this.lastFedTime>=12){
            text("Last Feed : "+ this.lastFedTime%12 + " PM", 350,30);
        }else if(this.lastFedTime==0){
            text("Last Feed : 12 AM",350,30);
        }else{
            text("Last Feed : "+ this.lastFedTime + " AM", 350,30);
        }



    }

    setFoodStock (foodStock) {
        this.foodStock = foodStock ;
    }

    

    getFoodStock(){
        return this.foodStock ;
    }

    setLastFedTime (time) {
        this.lastFedTime = time ;
    }

    updateFoodStockInDB(){
        database.ref('/').update({
            Food:this.foodStock,
            FeedTime:this.lastFedTime
          });
    }

  

}