import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const sphere = new THREE.SphereGeometry(0.1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
const sphereMesh = new THREE.Mesh(sphere, material);
scene.add(cube);
scene.add(sphereMesh);
camera.position.z = 4
let ocsillation_width = 1

function physics(k, mass, time) {
    let angular_freq = (k / mass) ** 0.5
    let displacement = ocsillation_width * Math.cos((angular_freq * time) * (Math.PI / 180))
    return displacement
}

function animate(currentTime) {
    controls.update();
    let displacement = physics(1, 100, currentTime)
    console.log(displacement)
    cube.position.x = displacement;
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}

function firstFrame(timeStamp) {
    animate(timeStamp);
}
requestAnimationFrame(firstFrame);