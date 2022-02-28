/*
* Fetch data from json 
*/
function fetch(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(JSON.parse(xhr.responseText).Dinos);
    }
  };
  xhr.open("GET", "./dino.json", false);
  xhr.send();
}


/*
* Dino constructor
*/
function Dino({ species, weight, height, diet, fact }) {
  this._species = species;
  this._weight = weight;
  this._height = height;
  this._diet = diet;
  this._fact = fact;
};
Dino.prototype.getTile = function () {
  const tile = document.createElement("div");
  const species = document.createElement("h3");
  const image = document.createElement("img");
  const fact = document.createElement("p");

  tile.classList.add("grid-item");
  species.textContent = this._species;
  image.src = "./images/" + this._species.toLowerCase() + ".png";
  fact.textContent = this._fact;

  tile.appendChild(species);
  tile.appendChild(image);
  tile.appendChild(fact);
  return tile;
}
Dino.prototype.isTall = function(){
  const dinoHeightAvg =  186.0;
  const dinoActualHeight = parseFloat(this._height);
  if(dinoActualHeight >= dinoHeightAvg )
  return true;
  else 
  return false;
}
Dino.prototype.isHeavy = function(){
  const dinoWeightAvg =  40000.0;
  const dinoActualWeight = parseFloat(this._weight);
  if(dinoActualWeight >= dinoWeightAvg )
  return true;
  else 
  return false;
}


/*
* Create Human Object
*/
const Human = function () {
  this._name = document.getElementById("name").value;
  this._feet = document.getElementById("feet").value;
  this._inches = document.getElementById("inches").value;
  this._weight = document.getElementById("weight").value;
  this._diet = document.getElementById("diet").value;
}
Human.prototype.getTile = function () {
  const tile = document.createElement("div");
  const heading = document.createElement("h3");
  const image = document.createElement("img");
  
  tile.classList.add("grid-item");
  image.src = "./images/human.png";
  heading.textContent = this._name;
  tile.appendChild(heading);
  tile.appendChild(image);
  return tile;
}
Human.prototype.isTall = function(){
  const humanHeightAvg =  64.25;
  const humanActualHeight = parseFloat(this._feet) * 12.0 + parseFloat(this._inches);
  if(humanActualHeight >= humanHeightAvg )
    return true;
  else 
    return false;
}
Human.prototype.isHeavy = function(){
  const humanWeightAvg =  194.7;
  const humanActualWeight = parseFloat(this._weight);
  if(humanActualWeight >= humanWeightAvg )
    return true;
  else 
    return false;
}


/*
*  Methods for comparing a human with dinosaurs
*/
//  method#1
Human.prototype.compareByHeight = function(dino){
  if(dino.isTall() && this.isTall())
    return 1;
  else 
    return 0;
}
//  method#2
Human.prototype.compareByWeight = function(dino){
  dino  = dino;
  if(dino.isHeavy() && this.isHeavy())
    return 1;
  else 
    return 0;
}
//  method#3
Human.prototype.compareByDiet = function(dino){
  dino  = dino;
  if(dino.diet === this.diet)
    return 1;
  else
    return 0;
}



/*
* Patcher
*/
function patcher() {
  const human =  new Human();
  fetch(function (response) {
    const scores = [];
    for (const item of response){
      const dino = new Dino(item); 
      scores.push({
        tile : dino.getTile(),
        score: human.compareByHeight(dino)
                + human.compareByWeight(dino)
                + human.compareByDiet(dino)
      });
    }
    scores.sort(function(x, y){
      return y.score - x.score;
    });
    const grid = document.getElementById("grid");
    for(const item of scores){
      grid.appendChild(item.tile);
    }
    grid.insertBefore(human.getTile(), grid.children[4]);

  });
}





/*
* when "compare me" button is clicked
*/
document.getElementById("btn").addEventListener("click", function () {
  patcher();
  // remove form from DOM
  document.getElementById("dino-compare").style.display = "none";
});