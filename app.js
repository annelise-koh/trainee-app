import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let pancake;
const loader = new GLTFLoader();
loader.load('/pancake.glb',
    function (gltf) {
        pancake = gltf.scene;
        scene.add(pancake);
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.3);
scene.add(ambientLight);

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );
// const topLight = new THREE.DirectionalLight(0xffffff, 1);
// topLight.position.set(0, 500, 500);
// scene.add(topLight);

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
};
reRender3D();

let arrPositionModel = [
    {
        id: 'section-hero',
        position: {x: 0, y: -0.053, z: 9},
        rotation: {x: 1.5, y: 1, z: 0}
    },
    {
        id: 'section-about',
        position: {x: 0, y: -0.05, z: 9},
        rotation: {x: 1, y: 1, z: 0}
    },
    {
        id: 'section-why',
        position: {x: 1.1, y: -0.7, z: 3.2},
        rotation: {x: 0.4, y: 2.7, z: 0}
    },
    {
        id: 'section-theme',
        position: {x: -0.24, y: -0.1, z: 9.6},
        rotation: {x: 1.3, y: 10.7, z: 1}
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(pancake.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 2,
            ease: "power1.out"
        });
        gsap.to(pancake.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 2,
            ease: "power1.out"
        })

    }
}
window.addEventListener('scroll', () => {
    if (pancake) {
        modelMove();
    }
})

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})