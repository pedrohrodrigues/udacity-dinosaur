function Animal(name, height, weight, diet){
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
    this.image = "images/" + name.toLowerCase() + ".png";
}

Animal.prototype.compareWeight = function(animal) {
    const comparsion = this.weight / animal.weight;
    let weightReturn = 'Ours weights are the same'
    if(animal.weight > this.heihgt) {
        weightReturn = `The ${animal.name} weights ${comparsion} times more than you`;
    } else {
        weightReturn = `${this.name} weights ${comparsion} times more than ${animal.name}`;
    }

    return weightReturn;
}

Animal.prototype.compareHeight = function(animal) {
    const comparsion = this.height / animal.height;
    let heightReturn = 'Ours weights are the same';
    if(animal.height > this.heihgt) {
        heightReturn = `The ${animal.name} ${comparsion} times taller more than you`;
    } else {
        heightReturn = `${this.name} are ${comparsion} times taller more than ${animal.name}`;
    }

    return heightReturn;
}

Animal.prototype.compareDiet = function(animal) {
  let dietReturn = "";
  if (this.diet.toLowerCase() === animal.diet.toLowerCase()) {
    return dietReturn = `The ${this.name} and you have the same diet!`;
  }
  else {
    return dietReturn = `The ${this.name} and you have different diets!`;
  }
  return dietReturn;
}

let dinosaurs = [];

fetch("dino.json")
    .then(response => response.json())
    .then(json => dinosaurs = json.Dinos.map(dinosaur => new Animal(dinosaur.species, dinosaur.weight, dinosaur.height, dinosaur.diet)));


const show = function (element) {
    element.style.display = 'flex';
}

const hide = function (element) {
    element.style.display = 'none';
}

function createTile(animal, image, fact, order){
  const tile = document.createElement('section');
  tile.className="tile-item";
  tile.style.order = order; 

  const animalName = document.createElement('h2');
  animalName.innerText = animal.name; 

  const animalImage = document.createElement('img');
  animalImage.src = image;

  const animalFact = document.createElement('p');
  animalFact.innerText = fact;

  tile.appendChild(animalName);
  tile.appendChild(animalImage);
  tile.appendChild(animalFact);

  return tile;
}

function getFact(dinosaur, human){
    const number = dinosaur.name === 'Pigeon' ? 2 : Math.round(Math.random() * 5);
    switch (number) {
        case 0:
            fact = dinosaur.compareWeight(human);
            break;
        case 1:
            fact = dinosaur.compareHeight(human);
            break;
        case 2:
          fact = dinosaur.compareDiet(human);
          break;
        default:
            fact = 'A dinosaur!';
    }
    return fact;
}

document.getElementById('compare-button').addEventListener('click', function(event){
  const formContainer = document.getElementById('main-form-container');
  const tiles = document.getElementById('tiles');
  const name = document.getElementById('name').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const diet = document.getElementById('diet').value;
  const you = new Animal(name, height, weight, diet);
  let count = 0;
  for(let dino in dinosaurs) {
      const currentDinosaur = dinosaurs[dino];
      const fact = getFact(currentDinosaur, you);
      const tileItem = createTile(currentDinosaur, currentDinosaur.image, fact, count);
      document.getElementById('tiles').appendChild(tileItem);
      count++;
  }
  hide(formContainer);
  show(tiles);
  event.preventDefault();
});
