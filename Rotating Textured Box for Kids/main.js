import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a light source
const light = new THREE.PointLight(0xffffaa, 1);
light.position.set(5, 5, 5); // Position light source top left
scene.add(light);

// Load textures from URLs
const textureLoader = new THREE.TextureLoader();
const textures = [
  textureLoader.load("https://threejs.org/examples/textures/brick_diffuse.jpg"),
  textureLoader.load(
    "https://threejs.org/examples/textures/uv_grid_opengl.jpg"
  ),
  textureLoader.load("https://threejs.org/examples/textures/roughness_map.jpg"),
  textureLoader.load("https://threejs.org/examples/textures/brick_diffuse.jpg"),
  textureLoader.load(
    "https://threejs.org/examples/textures/uv_grid_opengl.jpg"
  ),
  textureLoader.load("https://threejs.org/examples/textures/roughness_map.jpg"),

];

// Create a box geometry and apply textures to each face
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = textures.map(
  (texture) => new THREE.MeshBasicMaterial({ map: texture })
);
const box = new THREE.Mesh(geometry, materials);
scene.add(box);

// Set up controls for rotating the box
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

// Function to animate the scene
function animate() {
  requestAnimationFrame(animate);

  // Rotate the box automatically
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  // Update controls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Event listeners for mouse clicks and arrow keys to control rotation
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      box.rotation.x -= 0.1;
      break;
    case "ArrowDown":
      box.rotation.x += 0.1;
      break;
    case "ArrowLeft":
      box.rotation.y -= 0.1;
      break;
    case "ArrowRight":
      box.rotation.y += 0.1;
      break;
  }
});

document.addEventListener("click", () => {
  box.rotation.y += 0.1;
});
