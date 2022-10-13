import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
  );
  
  const renderer = new THREE.WebGLRenderer();
  scene.background = new THREE.Color('#00BCD6');
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const brickTexture = new THREE.TextureLoader().load( '/assets/textures/brick.jpeg' );
  const floorTexture = new THREE.TextureLoader().load( '/assets/textures/floor.jpeg' );

  const AmbientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(AmbientLight);
  

const controls = new OrbitControls(camera, renderer.domElement);

const grassGeometry = new THREE.PlaneGeometry( 1000, 1000 );
const grassMaterial = new THREE.MeshLambertMaterial( {color: 0x009F10, side: THREE.DoubleSide} );
const grass = new THREE.Mesh( grassGeometry, grassMaterial );
grass.rotation.x = Math.PI/2;
grass.position.z = 2;
grass.position.y = -1.01;

scene.add( grass );

const rearwallGeometry = new THREE.PlaneGeometry( 4, 2 );
const rearwallMaterial = new THREE.MeshLambertMaterial( {side: THREE.DoubleSide} );
const rearwall = new THREE.Mesh( rearwallGeometry, rearwallMaterial );
rearwallMaterial.map = brickTexture;

scene.add( rearwall );

const leftwallGeometry = new THREE.PlaneGeometry( 4, 2 );
const leftwallMaterial = new THREE.MeshLambertMaterial( {side: THREE.DoubleSide} );
const leftwall = new THREE.Mesh( leftwallGeometry, leftwallMaterial );
leftwallMaterial.map = brickTexture;
leftwall.rotation.y = Math.PI/2;
leftwall.position.x = -2;
leftwall.position.z = 2;

scene.add( leftwall );

const rightwallGeometry = new THREE.PlaneGeometry( 4, 2 );
const rightwallMaterial = new THREE.MeshLambertMaterial( {side: THREE.DoubleSide} );
const rightwall = new THREE.Mesh( rightwallGeometry, rightwallMaterial );
rightwallMaterial.map = brickTexture;
rightwall.rotation.y = Math.PI/2;
rightwall.position.x = 2;
rightwall.position.z = 2;

scene.add( rightwall );

const frontwallGeometry = new THREE.PlaneGeometry( 4, 2 );
const frontwallMaterial = new THREE.MeshLambertMaterial( {side: THREE.DoubleSide} );
const frontwall = new THREE.Mesh( frontwallGeometry, frontwallMaterial );
frontwallMaterial.map = brickTexture;
frontwall.position.z = 4;

scene.add( frontwall );

const floorGeometry = new THREE.PlaneGeometry( 4, 4 );
const floorMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide} );
const floor = new THREE.Mesh( floorGeometry, floorMaterial );
floorMaterial.map = floorTexture;
floor.rotation.x = Math.PI/2;
floor.position.z = 2;
floor.position.y = -1;

scene.add( floor );

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);



  renderer.render(scene, camera);
}

animate();
