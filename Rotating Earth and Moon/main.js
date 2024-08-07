import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('./The_Earth_seen_from_Apollo_17.jpg');
const moonTexture = textureLoader.load('./FullMoon2010.jpg');

// Create Earth
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Create Moon
const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(2, 0, 0); // Position the moon near the Earth
scene.add(moon);

// Add a light source to simulate the Sun
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 0, 5);
scene.add(light);

// Animate the scene
function animate() {
    requestAnimationFrame(animate);

    // Earth rotation
    earth.rotation.y += 0.001;

    // Moon rotation on its own axis
    moon.rotation.y += 0.002;

    // Moon orbit around the Earth
    moon.position.x = Math.cos(Date.now() * 0.001) * 2;
    moon.position.z = Math.sin(Date.now() * 0.001) * 2;

    renderer.render(scene, camera);
}

animate();
