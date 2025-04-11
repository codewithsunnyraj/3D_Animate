//Creating Object

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

console.log(sizes);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
console.log(renderer);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

//creating scence
const scene = new THREE.Scene();

//creating camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
scene.add(camera);

//Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

//loader
const loader = new THREE.FontLoader();

//preloader line animation
gsap.to("#line", {
  width: "100%",
  duration: 1.5,
  ease: "power2.inOut",
  onComplete: () => {
    gsap.to("#line", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        document.getElementById("line").remove();
        show3DText(); //call text animation
      },
    });
  },
});

// Function to load and animate 3D text
function show3DText() {
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const textGeometry = new THREE.TextGeometry("sunny", {
        font: font,
        size: 1,
        height: 0.3,
      });

      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffff0 });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.center();
      scene.add(textMesh);

      //Animate text with GSAP
      // First entry rotation (optional)
      gsap.from(textMesh.rotation, {
        y: -Math.PI,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          // Infinite rotation
          gsap.to(textMesh.rotation, {
            y: "+=" + Math.PI * 2,
            duration: 5,
            ease: "none",
            repeat: -1, // infinite
          });
        },
      });

      animate();
    }
  );
}

// Animation Loop
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
