//variables
var dog,sadDog,happyDog;
var feedButton, stockButton;
var foodObj;
var database ;


function preload(){

  //load sad and happy dog images
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");

}

function setup() {
  database=firebase.database();
  //canvas
  createCanvas(1000,400);
  
  //create dog sprite & sad image
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create food
  foodObj=new Food();


  foodStock=database.ref('/Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('/FeedTime');
  fedTime.on("value",function(data){
    foodObj.setLastFedTime(data.val());
    
  });
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  //green background
  background(46,139,87);

  //display food
  foodObj.display();

  
  //show sprites
  drawSprites();
}

//function to read food Stock
function readStock(data){
  var stock = data.val ();
  console.log (stock) ;
  foodObj.setFoodStock (stock);
  
}


//function to update food stock and last fed time
function feedDog(){

  dog.addImage(happyDog);

  var foodStock = foodObj.getFoodStock ();

  // update class
  if (foodStock<=0){
    foodObj.setFoodStock(0);
  } else{
    foodObj.setFoodStock(foodStock-1);
  }

  foodObj.setLastFedTime (hour ());

  // update in DB
  foodObj.updateFoodStockInDB ();


}


//function to add food in stock
function addFoods(){

  foodObj.setFoodStock (foodObj.getFoodStock()+1);
  console.log (foodObj.getFoodStock()+1);
   // update in DB
   foodObj.updateFoodStockInDB ();
  

}
