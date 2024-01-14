<template>
  <div class="container-three">
    <h3>Fonctionnement threejs</h3>
    <canvas ref="canvas" />
    <div>
      <div class="container-three-information">
        <div>
          <h2 class="">Texture du Bracelet :</h2>
        </div>
        <div class="container-three-btn">
          <MyButton @click="changeTexture('texture-cuir-blanc.jpg')">
            Cuir Blanc
          </MyButton>
          <MyButton @click="changeTexture('texture-tissus-or.jpg')">
            Tissu Or
          </MyButton>
          <MyButton @click="changeTexture('texture-tissus-marron.jpg')">
            Tissu Marron
          </MyButton>
        </div>
      </div>
      <div class="container-three-information">
        <div>
          <h2 class="">Texture du Boitier Rond</h2>
        </div>
        <div class="container-three-btn">
          <MyButton @click="changeTextureBoitierRond('background_black01.png')">
            Black 01
          </MyButton>
          <MyButton @click="changeTextureBoitierRond('background_black02.png')">
            Black 02
          </MyButton>
          <MyButton @click="changeTextureBoitierRond('background_fluo01.png')">
            Fluo
          </MyButton>
          <MyButton @click="changeTextureBoitierRond('background_mickey.png')">
            Mickey
          </MyButton>
          <MyButton @click="changeTextureBoitierRond('background_white01.png')">
            White 01
          </MyButton>
          <MyButton @click="changeTextureBoitierRond('background_white02.png')">
            White 02
          </MyButton>
          <MyButton @click="changeTextureBoitierRond('background_white03.png')">
            White 03
          </MyButton>
          <MyButton @click="changeTextureBoitierRond('background_white04.png')">
            White 04
          </MyButton>
          <MyButton @click="changeTextureBoitierRond('background_white05.png')">
            White 05
          </MyButton>
        </div>
      </div>
      <div class="container-three-information">
        <div>
          <h2 class="">Couleur du Fermoir</h2>
        </div>
        <input type="color" @input="handleColorChange" />
      </div>
      <div class="container-three-information">
        <div>
          <h2 class="">Type de Pierre Précieuse</h2>
        </div>
        <div class="container-three-btn">
          <MyButton @click="changePierreColor('rubis')"> Rubis </MyButton>
          <MyButton @click="changePierreColor('diamant')"> Diamant </MyButton>
          <MyButton @click="changePierreColor('émeraude')"> Émeraude </MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-three {
  display: flex;
  flex-direction: row;
  &-information {
    align-items: center;
    display: flex;

    flex-direction: column;
  }
  &-btn {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 1600px) {
  .container-three {
    display: flex;

    flex-direction: column;

    &-information {
      align-items: center;
      display: flex;

      flex-direction: column;
    }
    &-btn {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import MyButton from "./myButton.vue";

const canvas = ref(null);
let controls = null;
let clock = new THREE.Clock();
let scene = null;
let camera = null;
let renderer = null;
let animationId = null;
let aiguilleHeures,
  aiguilleMinutes,
  aiguilleSecondes,
  boitierRond,
  boitierCarre,
  iPierre,
  iPierre2,
  iBracelet,
  iFermoir,
  iBouton;

let currentTexture = "texture-cuir-blanc.jpg";
let currentTextureBoitierRond = "background_black01.png";

const initScene = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
  renderer.setSize(1300, 700);
  renderer.setClearColor(0x222222, 1);
  controls = new OrbitControls(camera, renderer.domElement);

  var loader = new ColladaLoader();
  loader.load("/models/montre.dae", onLoaded, onProgress, onError);
};

const updateClockHands = () => {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hoursRotation = (hours + minutes / 60) * (Math.PI / 6);
  const minutesRotation = (minutes + seconds / 60) * (Math.PI / 30);
  const secondsRotation = seconds * (Math.PI / 30);

  if (aiguilleHeures) aiguilleHeures.rotation.z = -hoursRotation;
  if (aiguilleMinutes) aiguilleMinutes.rotation.z = -minutesRotation;
  if (aiguilleSecondes) aiguilleSecondes.rotation.z = -secondsRotation;
};

const animate = () => {
  let dt = clock.getDelta();
  updateClockHands();
  animationId = requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

const changePierreColor = (type) => {
  let color;

  switch (type) {
    case "rubis":
      color = 0xff0000; // Rouge
      break;
    case "diamant":
      color = 0x0000ff; // Bleu
      break;
    case "émeraude":
      color = 0x00ff00; // Vert
      break;
    default:
      color = 0xffffff; // Blanc par défaut
  }

  if (iPierre) iPierre.material.color.set(color);
};

const handleColorChange = (event) => {
  const newColor = event.target.value;
  changeFermoirColor(newColor);
};
const changeFermoirColor = (color) => {
  // Convertir la couleur hexadécimale en décimal
  const decimalColor = parseInt(color.slice(1), 16);

  // Mettre à jour la couleur du matériau iFermoir
  if (iFermoir) iFermoir.material.color.set(decimalColor);
};

const changeTexture = (texture) => {
  currentTexture = texture;
  // Charger la nouvelle texture et l'appliquer au matériau du bracelet
  const textureLoader = new TextureLoader();
  const newTexture = textureLoader.load(`/images/${texture}`);
  iBracelet.material.map = newTexture;
  iBracelet.material.needsUpdate = true;
};
const changeTextureBoitierRond = (textureBoitierRond) => {
  currentTextureBoitierRond = textureBoitierRond;
  // Charger la nouvelle texture et l'appliquer au matériau du bracelet
  const textureLoader = new TextureLoader();
  const newTexture = textureLoader.load(`/images/${textureBoitierRond}`);
  boitierRond.material.map = newTexture;
  boitierRond.material.needsUpdate = true;
};

function onLoaded(collada) {
  let objects = collada.scene;

  aiguilleHeures = objects.getObjectByName("aiguille_heures");
  aiguilleHeures.material = new THREE.MeshBasicMaterial({
    color: 0xf0f0f0,
  });
  aiguilleMinutes = objects.getObjectByName("aiguille_minutes");
  aiguilleMinutes.material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
  aiguilleSecondes = objects.getObjectByName("aiguille_secondes");
  aiguilleSecondes.material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });

  boitierRond = objects.getObjectByName("boitier_rond");
  // boitierRond.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const textureLoaderBoitierRond = new TextureLoader();
  const textureBoitierRond = textureLoaderBoitierRond.load(
    `/images/${currentTextureBoitierRond}`
  );
  boitierRond.material = new THREE.MeshBasicMaterial({
    map: textureBoitierRond,
  });

  boitierCarre = objects.getObjectByName("boitier_carre");
  boitierCarre.material = new THREE.MeshBasicMaterial({ color: 0x00ffff });

  iBouton = objects.getObjectByName("bouton");
  iBouton.material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  iPierre = objects.getObjectByName("pierre");
  iPierre.material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
  });

  let iPierre2 = iPierre.clone();
  iPierre2.position.y -= 38;

  let iPierre3 = iPierre.clone();
  iPierre3.position.x -= 18.5;
  iPierre3.position.y -= 18.75;

  let iPierre4 = iPierre.clone();
  iPierre4.position.x += 18.5;
  iPierre4.position.y -= 18.75;

  iBracelet = objects.getObjectByName("bracelet");
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load(`/images/${currentTexture}`);
  iBracelet.material = new THREE.MeshBasicMaterial({ map: texture });

  iFermoir = objects.getObjectByName("fermoir");
  iFermoir.material = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });

  scene.add(
    aiguilleHeures,
    aiguilleMinutes,
    aiguilleSecondes,
    // boitierCarre,
    boitierRond,
    iBouton,
    iPierre,
    iPierre2,
    iPierre3,
    iPierre4,
    iBracelet,
    iFermoir
  );

  controls.target.set(0, 0, 0);
  camera.position.set(0, 0, 100);
  controls.update();
}

var onProgress = function (data) {
  if (data.lengthComputable) {
    var percentComplete = (data.loaded / data.total) * 100;
    console.log(Math.round(percentComplete, 2) + "% downloaded");
  }
};

var onError = function (data) {
  console.error(data);
};

// const initback = () => {
//   ... Votre code existant ...

//   Charger l'image d'arrière-plan
//   const backgroundTexture = new THREE.TextureLoader().load("/images/back2.png");

//   Créer un plan pour l'arrière-plan
//   const backgroundGeometry = new THREE.PlaneGeometry(500, 300);

//   const backgroundMaterial = new THREE.MeshBasicMaterial({
//     map: backgroundTexture,
//   });
//   const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);

//   Positionner le plan derrière la montre
//   background.position.set(0, 0, -50);

//   Ajouter le plan à la scène
//   scene.add(background);
// };

const initback = () => {
  // Charger l'image pour les faces de la boîte
  const boxTexture = new THREE.TextureLoader().load("/images/back2.png");

  // Créer un plan pour chaque face de la boîte
  const boxGeometry = new THREE.PlaneGeometry(500, 300);
  const boxMaterial = new THREE.MeshBasicMaterial({ map: boxTexture });

  // Créer six faces pour la boîte
  const faces = [];
  for (let i = 0; i < 6; i++) {
    faces[i] = new THREE.Mesh(boxGeometry, boxMaterial);
  }

  // Positionner chaque face de la boîte
  // Face arrière
  faces[0].position.set(0, 0, -50);
  // Face avant
  faces[1].position.set(0, 0, 250);
  // Face droite
  faces[2].position.set(250, 0, 0);
  faces[2].rotation.y = Math.PI / 2;
  // Face gauche
  faces[3].position.set(-250, 0, 0);
  faces[3].rotation.y = -Math.PI / 2;
  // Face du haut
  faces[4].position.set(0, 150, 0);
  faces[4].rotation.x = Math.PI / 2;
  // Face du bas
  faces[5].position.set(0, -150, 0);
  faces[5].rotation.x = -Math.PI / 2;

  // Ajouter toutes les faces à la scène
  faces.forEach(face => {
    scene.add(face);
  });
};


onMounted(() => {
  initScene();
  initback();
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
});
</script>
