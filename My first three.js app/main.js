import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Define the shape of a pentagon
const shape = new THREE.Shape();
shape.moveTo(0, 1); // Start at top center
shape.lineTo(0.95, 0.31); // Bottom right
shape.lineTo(0.59, -0.81); // Bottom rightmost
shape.lineTo(-0.59, -0.81); // Bottom leftmost
shape.lineTo(-0.95, 0.31); // Bottom left
shape.lineTo(0, 1); // Close the shape

// Create a geometry from the shape
const geometry = new THREE.ShapeGeometry(shape);

// Choose a specific color (modify for different colors)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });

// Create a mesh with the geometry and material
const polygon = new THREE.Mesh(geometry, material);
scene.add(polygon);

camera.position.z = 5;

function animate() {
  polygon.rotation.x += 0.005;
  polygon.rotation.y += 0.01;

  renderer.render(scene, camera);
}
