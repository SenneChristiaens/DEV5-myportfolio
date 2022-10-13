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
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const brickTexture = new THREE.TextureLoader().load( '/assets/textures/brick.jpeg' );

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 3, 1);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);

const rearwallGeometry = new THREE.PlaneGeometry( 4, 2 );
const rearwallMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide} );
const rearwall = new THREE.Mesh( rearwallGeometry, rearwallMaterial );
rearwallMaterial.map = brickTexture;

scene.add( rearwall );

const leftwallGeometry = new THREE.PlaneGeometry( 4, 2 );
const leftwallMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide} );
const leftwall = new THREE.Mesh( leftwallGeometry, leftwallMaterial );
leftwallMaterial.map = brickTexture;
leftwall.rotation.y = Math.PI/2;
leftwall.position.x = -2;
leftwall.position.z = 2;

scene.add( leftwall );

const rightwallGeometry = new THREE.PlaneGeometry( 4, 2 );
const rightwallMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide} );
const rightwall = new THREE.Mesh( rightwallGeometry, rightwallMaterial );
rightwallMaterial.map = brickTexture;
rightwall.rotation.y = Math.PI/2;
rightwall.position.x = 2;
rightwall.position.z = 2;

scene.add( rightwall );

const frontwallGeometry = new THREE.PlaneGeometry( 4, 2 );
const frontwallMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide} );
const frontwall = new THREE.Mesh( frontwallGeometry, frontwallMaterial );
frontwallMaterial.map = brickTexture;
frontwall.position.z = 4;

scene.add( frontwall );

camera.position.z = 8;

function animate() {
  requestAnimationFrame(animate);



  renderer.render(scene, camera);
}

animate();
