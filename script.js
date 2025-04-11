const scene = new THREE.Scene();

// BoxGeometry(2, 2, 2); take(width,height,)
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

//rendering
const canvas = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);

//Animate
const tick = () => {
 cube.rotation.y += 0.01;
  cube.rotation.x += 0.01; 

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
