import * as THREE from 'three';

console.log('THREE loaded successfully, version:', THREE.REVISION);
const geom = new THREE.CylinderGeometry(5, 5, 3, 16, 1, true, 0, 0.3);
console.log('CylinderGeometry created, vertices count:', geom.attributes.position.count);
