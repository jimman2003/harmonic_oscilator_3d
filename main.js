import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
function physics(force, mass, dt) {
    let acceleration = force / mass
    let velocity = acceleration * dt
    let displacement = velocity * dt
    return displacement
}
let lastTime = 0
function animate(currentTime) {
    requestAnimationFrame(animate);
    controls.update();
    let dt = currentTime - lastTime / 1000
    let displacement = physics(0.1, 10000, dt)
    console.log(displacement)
    cube.position.x = displacement;
    renderer.render(scene, camera);
    lastTime = currentTime
}
animate()