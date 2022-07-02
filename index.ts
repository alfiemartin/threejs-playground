import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

const light = new THREE.SpotLight(0xccc);
light.position.set( 0, 0, 5 );
light.intensity = 100
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 500;
light.shadow.camera.far = 4000;
light.shadow.camera.fov = 30;
scene.add(light);

renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector(".js-scene").appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(2, 1, 1);
const material = new THREE.MeshPhongMaterial({color: 0xccc})
const cube = new THREE.Mesh( geometry, material );

const ambient = new THREE.AmbientLight( 0xffffff, 0.5 );

const spotLight = new THREE.SpotLight( 0xffffff, 1 );
spotLight.position.set( 1, 5, 1 );
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 200;

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 512;
spotLight.shadow.mapSize.height = 512;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;
spotLight.shadow.focus = 1;

const lightHelper = new THREE.SpotLightHelper( spotLight );

scene.add( cube, ambient, spotLight, lightHelper );

camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement)

let amount = 10;
function animate() {
	requestAnimationFrame( animate );

    const geo = new THREE.SphereGeometry(2, amount, amount)
    const cube2 = new THREE.Mesh( geo, material );
    scene.remove(cube);
    scene.add(cube2);

	renderer.render( scene, camera );
}


animate();