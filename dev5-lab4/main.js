import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color("#00BCD6");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const brickTexture = new THREE.TextureLoader().load(
  "/assets/textures/brick.jpeg"
);
const floorTexture = new THREE.TextureLoader().load(
  "/assets/textures/floor.jpeg"
);
const roofTexture = new THREE.TextureLoader().load(
  "/assets/textures/roof.jpeg"
);
const doorTexture = new THREE.TextureLoader().load(
  "/assets/textures/door.jpeg"
);

const AmbientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(AmbientLight);

const controls = new OrbitControls(camera, renderer.domElement);

const addFlower = (x, y, z) => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("/assets/models/flower/scene.gltf", (gltf) => {
    gltf.scene.scale.set(0.05, 0.05, 0.05);
    y = -2.1;
    gltf.scene.position.set(x, y, z);
    scene.add(gltf.scene);
  });
};

const grassGeometry = new THREE.PlaneGeometry(1000, 1000);
const grassMaterial = new THREE.MeshLambertMaterial({
  color: 0x009f10,
  side: THREE.DoubleSide,
});
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.rotation.x = Math.PI / 2;
grass.position.z = 2;
grass.position.y = -2.01;

scene.add(grass);

const rearwallGeometry = new THREE.PlaneGeometry(10, 4);
const rearwallMaterial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
});
const rearwall = new THREE.Mesh(rearwallGeometry, rearwallMaterial);
rearwallMaterial.map = brickTexture;

scene.add(rearwall);

const leftwallGeometry = new THREE.PlaneGeometry(10, 4);
const leftwallMaterial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
});
const leftwall = new THREE.Mesh(leftwallGeometry, leftwallMaterial);
leftwallMaterial.map = brickTexture;
leftwall.rotation.y = Math.PI / 2;
leftwall.position.x = -5;
leftwall.position.z = 5;

scene.add(leftwall);

const rightwallGeometry = new THREE.PlaneGeometry(10, 4);
const rightwallMaterial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
});
const rightwall = new THREE.Mesh(rightwallGeometry, rightwallMaterial);
rightwallMaterial.map = brickTexture;
rightwall.rotation.y = Math.PI / 2;
rightwall.position.x = 5;
rightwall.position.z = 5;

scene.add(rightwall);

const frontwallGeometry = new THREE.PlaneGeometry(10, 4);
const frontwallMaterial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
});
const frontwall = new THREE.Mesh(frontwallGeometry, frontwallMaterial);
frontwallMaterial.map = brickTexture;
frontwall.position.z = 10;

scene.add(frontwall);

const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floorMaterial.map = floorTexture;
floor.rotation.x = Math.PI / 2;
floor.position.z = 5;
floor.position.y = -2;

scene.add(floor);

const roofGeometry = new THREE.BoxGeometry(0.2, 10, 10);
const roofMaterial = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.z = 5;
roof.position.y = 2.1;
roof.rotation.z = Math.PI / 2;
roofMaterial.map = roofTexture;

scene.add(roof);

const doorGeometry = new THREE.BoxGeometry(0.2, 3, 2);
const doorMaterial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
});
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.y = -0.5;
door.position.z = 10;
doorMaterial.map = doorTexture;
door.rotation.y = Math.PI / 2;
scene.add(door);

for (let i = 0; i < 200; i++) {
  //random sign
  let sign = Math.random() < 0.5 ? -1 : 1;
  let x = Math.random() * 50 * sign;
  sign = Math.random() < 0.5 ? -1 : 1;
  let z = Math.random() * 50 * sign;
  addFlower(x, -1.1, z);
}

camera.position.z = 20;
camera.position.y = 5;
camera.rotateX(-0.1);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
