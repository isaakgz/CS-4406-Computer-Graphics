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
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

// Create the green plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true; // Plane receives shadows
scene.add(plane);

// Create the methane molecule (1 carbon, 4 hydrogen)
const carbonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const carbonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color for carbon
const carbon = new THREE.Mesh(carbonGeometry, carbonMaterial);
carbon.castShadow = true; // Carbon casts shadow
scene.add(carbon);

const hydrogenGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const hydrogenMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue color for hydrogen
const hydrogens = [];
const positions = [
  [1, 1, 1],
  [-1, -1, 1],
  [-1, 1, -1],
  [1, -1, -1],
];

positions.forEach((pos) => {
  const hydrogen = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
  hydrogen.position.set(...pos);
  hydrogen.castShadow = true; // Hydrogen casts shadow
  hydrogens.push(hydrogen);
  scene.add(hydrogen);

  // Create bonds
  const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, Math.sqrt(3), 32);
  const bondMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x888888 });
  const bond = new THREE.Mesh(bondGeometry, bondMaterial);
  bond.position.set(0.5 * pos[0], 0.5 * pos[1], 0.5 * pos[2]);
  bond.rotation.setFromVector3(new THREE.Vector3(...pos).normalize().multiplyScalar(Math.PI / 2));
  bond.castShadow = true; // Bond casts shadow
  scene.add(bond);
});

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true; // Light casts shadows
scene.add(directionalLight);

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Animation loop
const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();

// Resize listener
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
