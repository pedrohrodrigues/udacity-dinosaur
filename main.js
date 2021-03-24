function Animal(name, height, weight){
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.image = "images/" + name.toLowerCase() + ".png";
}

Animal.prototype.compareWeight = function(animal) {
    const comparsion = animal.height / this.height;
    let heightReturn = 'Ours weights are the same'
    if(animal.height > this.heihgt) {
        heightReturn = `The ${animal.name} weights ${comparsion} more than you`;
    } else {
        heightReturn = `You weights ${comparsion} more than ${animal.name}`;
    }

    return heightReturn;
}

let dinosaurs = [];

fetch("dino.json")
    .then(response => response.json())
    .then(json => dinosaurs = json.Dinos.map(dinosaur => new Animal(dinosaur.species, dinosaur.weight, dinosaur.height)));


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
  const you = new Animal(name,height,weight);
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
