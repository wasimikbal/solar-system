import * as THREE from "three";

export const createSun = () => {
  const geometry = new THREE.SphereGeometry(1, 6, 6);
  const material = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  mesh.scale.set(10, 10, 10);
  return mesh;
};

export const createEarth = () => {
  const geometry = new THREE.SphereGeometry(1, 6, 6);
  const material = new THREE.MeshPhongMaterial({ emissive: 0x112244 });
  const earth = new THREE.Mesh(geometry, material);
  earth.scale.set(2, 2, 2);

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 20;
  earthOrbit.add(earth);

  return { earth, earthOrbit };
};

export const createMoon = () => {
  const geometry = new THREE.SphereGeometry(1, 6, 6);
  const material = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });
  const moon = new THREE.Mesh(geometry, material);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 4;
  moonOrbit.add(moon);

  moon.scale.set(1, 1, 1);
  return {moon, moonOrbit};
};
