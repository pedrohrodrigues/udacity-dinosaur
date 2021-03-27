function Animal(name, height, weight, diet, fact) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.fact = fact;
  this.image = `images/${name.toLowerCase()}.png`;
}

Animal.prototype.compareWeight = function (animal) {
  const comparsion = Math.ceil(this.weight / animal.weight);
  let weightReturn = 'Ours weights are the same';
  if (animal.weight > this.heihgt) {
    weightReturn = `The ${animal.name} is ${comparsion} times heavier more than you`;
  } else {
    weightReturn = `${this.name} is ${comparsion} times heavier more than ${animal.name}`;
  }

  return weightReturn;
};

Animal.prototype.compareHeight = function (animal) {
  const comparsion = Math.ceil(this.height / animal.height);
  let heightReturn = 'Ours weights are the same';
  if (animal.height > this.heihgt) {
    heightReturn = `The ${animal.name} ${comparsion} times taller more than ${this.name}`;
  } else {
    heightReturn = `${this.name} are ${comparsion} times taller more than you`;
  }

  return heightReturn;
};

Animal.prototype.compareDiet = function (animal) {
  let dietReturn = `You and ${this.name} have different diets!`;
  if (this.diet.toLowerCase() === animal.diet.toLowerCase()) {
    dietReturn = `The ${this.name} and you have the same diet!`;
  }
  return dietReturn;
};

let dinosaurs = [];

fetch('dino.json')
  .then((response) => response.json())
  .then(
    (json) => dinosaurs = json.Dinos.map((d) => new Animal(d.species, d.weight, d.height, d.diet, d.fact)),
  );

const show = (element) => {
  const currentElement = element;
  currentElement.style.display = 'flex';
};

const hide = (element) => {
  const currentElement = element;
  currentElement.style.display = 'none';
};

function createTile(animal, image, fact, order) {
  const tile = document.createElement('section');
  tile.className = 'tile-item';
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

function getFact(dinosaur, human) {
  const number = dinosaur.name === 'Pigeon' ? 6 : Math.round(Math.random() * 5);
  let fact = '';
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
    case 3:
      fact = dinosaur.fact;
      break;
    case 6:
      fact = 'All birds are dinousaurs.';
      break;
    default:
      fact = 'A dinosaur!';
  }
  return fact;
}

function validateForm(name, height, weight) {
  const formValidation = document.getElementById('form-validation');
  if (name === '') {
    formValidation.innerText = 'Please enter your name';
    return false;
  } if (height === '') {
    formValidation.innerText = 'Please enter your height';
    return false;
  } if (weight === '') {
    formValidation.innerText = 'Please enter your weight';
    return false;
  }
  return true;
}

document.getElementById('compare-button').addEventListener('click', () => {
  const formContainer = document.getElementById('main-form-container');
  const tiles = document.getElementById('tiles');
  const name = document.getElementById('name').value;
  const humanNameTile = document.getElementById('human-name');
  humanNameTile.innerText = name;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  if (validateForm(name, height, weight)) {
    const diet = document.getElementById('diet').value;
    const you = new Animal(name, height, weight, diet);
    let count = 0;
    Object.keys(dinosaurs).forEach((key) => {
      const currentDinosaur = dinosaurs[key];
      const fact = getFact(currentDinosaur, you);
      const tileItem = createTile(currentDinosaur, currentDinosaur.image, fact, count);
      document.getElementById('tiles').appendChild(tileItem);
      count += 1;
    });
    hide(formContainer);
    show(tiles);
  }
});
