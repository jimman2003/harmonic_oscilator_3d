import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { springGeometry } from './spring.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.1);

const cubeTexture = new THREE.TextureLoader().load( 'textures/wood.jpg' );
const springTexture = new THREE.TextureLoader().load('textures/metal.jpg');

const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture});
const springMaterial = new THREE.MeshStandardMaterial({ map: springTexture });
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
const ropeMesh = new THREE.Mesh(springGeometry, springMaterial);

ropeMesh.geometry.translate(0, 0.5, 0);

const light = new THREE.AmbientLight( 0xffffff ,Math.PI); 

scene.add(light);
scene.add(cubeMesh);
scene.add(sphereMesh);
scene.add(ropeMesh);

camera.position.z = 4
let ocsillation_width = 1
ropeMesh.position.y = ocsillation_width*2

function physics(k, mass, time) {
    let angular_freq = (k / mass) ** 0.5
    let displacement = ocsillation_width * Math.cos((angular_freq * time) * (Math.PI / 180))
    return displacement
}

function animate(currentTime) {
    controls.update();
    
    let displacement = physics(1, 100, currentTime)
    cubeMesh.position.y = displacement;
    ropeMesh.scale.y = -(ocsillation_width*2 - displacement)
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}

function firstFrame(timeStamp) {
    animate(timeStamp);
}
requestAnimationFrame(firstFrame);