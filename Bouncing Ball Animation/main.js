import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xFFFFAA, 1);
light.position.set(5, 5, 5); // Position light source top left
scene.add(light);

// Create a sphere geometry
const geometry = new THREE.SphereGeometry(0.5, 32, 32);

let currentColor = Math.random() * 0xffffff; // Random starting color
let directionX = 1; // Initial horizontal movement direction
let directionY = 1; // Initial vertical movement direction

const material = new THREE.MeshBasicMaterial({ color: currentColor });

// Create a mesh with the geometry and material
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

function animate() {
  // Update position based on direction
  sphere.position.x += 0.05 * directionX;
  sphere.position.y += 0.05 * directionY;

  // Check for and handle edge collisions
  if (sphere.position.x > camera.aspect * 2 || sphere.position.x < -camera.aspect * 2) {
    directionX *= -1;
    currentColor = Math.random() * 0xffffff; // Change color on bounce
    material.color.set(currentColor);
  }

  if (sphere.position.y > 2 || sphere.position.y < -2) {
    directionY *= -1;
    currentColor = Math.random() * 0xffffff; // Change color on bounce
    material.color.set(currentColor);
  }

  renderer.render(scene, camera);
}