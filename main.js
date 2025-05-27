import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 3;

const canvas = document.getElementById('scene')
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const loader = new GLTFLoader();
loader.load('./pancake.glb', (gltf) => {
  scene.add(gltf.scene);
  console.log('Model loaded:', gltf.scene);
}, undefined, (error) => {
  console.error('Error loading model:', error);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function gotoScene2() {
    document.getElementById('scene1').classList.add('hidden');
    document.getElementById('scene2').classList.remove('hidden');
  }
  
  function gotoScene1() {
    document.getElementById('scene2').classList.add('hidden');
    document.getElementById('scene1').classList.remove('hidden');
  }
  
animate();