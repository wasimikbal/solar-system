import { createEarth, createMoon, createSun } from "./createModel";
import "./style.css";
import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import AxisGridHelper from "./AxisGridHelper";

const objects: THREE.Object3D[] = [];
const canvas: HTMLElement = document.getElementById("c");
const canvasSize = { width: canvas.clientWidth, height: canvas.clientHeight };
const gui = new GUI();

const scene: THREE.Scene = new THREE.Scene();

const pointLight: THREE.Object3D = new THREE.PointLight("0xFFFFFF", 80);
scene.add(pointLight);

const camera: THREE.Camera = new THREE.PerspectiveCamera(
  75,
  canvasSize.width / canvasSize.height,
  0.1,
  100
);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);

const solarSystem: THREE.Object3D = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

const sun = createSun();
const { earth, earthOrbit } = createEarth();
const { moon, moonOrbit } = createMoon();
objects.push(sun);
objects.push(earth);
objects.push(moon);
solarSystem.add(sun);

earthOrbit.add(moonOrbit);
solarSystem.add(earthOrbit);
objects.push(earthOrbit);
objects.push(moonOrbit);

// objects.forEach((obj: THREE.Object3D) => {
//   const axes = new THREE.AxesHelper();
//   axes.material.depthTest = false;
//   axes.renderOrder = 1;
//   obj.add(axes);
// });

function makeAxisGrid(node, label, units = 10) {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, "visible").name(label);
}

makeAxisGrid(solarSystem, "solarSystem", 26);
makeAxisGrid(sun, "sunMesh");
makeAxisGrid(earthOrbit, "earthOrbit");
makeAxisGrid(earth, "earthMesh");
makeAxisGrid(moonOrbit, "moonOrbit");
makeAxisGrid(moon, "moonMesh");

const renderer = new THREE.WebGLRenderer({ antiAlias: true, canvas: canvas });
renderer.setSize(canvasSize.width, canvasSize.height);

const render = (time: number) => {
  time *= 0.001;

  objects.forEach((obj: THREE.Object3D) => {
    obj.rotation.y = time;
  });

  if (resetToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
requestAnimationFrame(render);

const resetToDisplaySize = (renderer: THREE.WebGLRenderer) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = Math.floor(canvas.clientWidth * pixelRatio);
  const height = Math.floor(canvas.clientHeight * pixelRatio);
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};

console.log(sun);
