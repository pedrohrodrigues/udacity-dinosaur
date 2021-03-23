function Animal(name, height, weight){
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.image = "images/" + name.toLowerCase() + ".png";
}

let dinosaurs = [];

fetch("dino.json")
    .then(response => response.json())
    .then(json => dinosaurs = json.Dinos.map(dinosaur => new Animal(dinosaur.species, dinosaur.weight, dinosaur.height)));


const show = function (element) {
    element.style.display = 'block';
}

const hide = function (element) {
    element.style.display = 'none';
}

function createTile(animal, image){
  const tile = document.createElement('section');
  tile.className="tile-item";

  const animalImage = document.createElement('img');
  animalImage.src = image;

  tile.appendChild(animalImage);

  return tile;
}

document.getElementById('compare-button').addEventListener('click', function(event){
  const formContainer = document.getElementById('main-form-container');
  const tiles = document.getElementById('tiles');
  const name = document.getElementById('name').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const you = new Animal(name,height,weight);
  for(let dino in dinosaurs) {
      const currentDinosaur = dinosaurs[dino];
      const tileItem = createTile(currentDinosaur, currentDinosaur.image);
      document.getElementById('tiles').appendChild(tileItem);
  }
  hide(formContainer);
  show(tiles);
  event.preventDefault();
});
