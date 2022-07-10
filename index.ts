import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TorusGeometry,
  MeshBasicMaterial,
  Mesh,
  AmbientLight,
  SpotLight,
  SpotLightHelper,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PointLight,
  TextureLoader,
  SphereGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer({ canvas: document.querySelector(".js-scene") });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(39);

renderer.render(scene, camera);

const geo = new SphereGeometry(10, 30, 30);
const moonTexture = new TextureLoader().load("moon.jpeg");
const moonNormal = new TextureLoader().load("moonNormal.png");
const mat = new MeshPhongMaterial({
  color: 0xffbbaa,
  reflectivity: 1,
  map: moonTexture,
  normalMap: moonNormal,
});
const torus = new Mesh(geo, mat);

const light = new PointLight(0xffffff, 0.6);
const ambient = new AmbientLight(0xffffff, 0.2);
light.position.setY(30);

const background = new TextureLoader().load("peep1.jpeg");
scene.background = background;

scene.add(torus, light, ambient);

// const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.render(scene, camera);
  // controls.update();
}

animate();

window.onscroll = function (e) {
  if (this.scrollY < this.oldScroll) {
    torus.rotation.y += 0.05;
    torus.rotation.x += 0.05;
  } else {
    torus.rotation.y -= 0.05;
    torus.rotation.x -= 0.05;
  }

  this.oldScroll = this.scrollY;
};

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
};
