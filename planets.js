import * as THREE from "three";
import { OrbitControls } from './lib/OrbitControls.js';
//creating the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//so you can move the camera
//itll adjust to the window when you zoom in or out
window.addEventListener('resize', function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//add orbit controls
var controls = new OrbitControls(camera, renderer.domElement);

//add the sky
var skyGeometry = new THREE.SphereGeometry(400,32,32);
var skyMaterial = new THREE.MeshPhongMaterial({ 
  map: new THREE.TextureLoader().load('img/stars.jpg'),
  side: THREE.DoubleSide
});
var sky = new THREE.Mesh(skyGeometry,skyMaterial);
scene.add(sky)

var ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // White light with moderate intensity
scene.add(ambientLight);

//create the sun
var sunGeometry = new THREE.SphereGeometry(1.5,32,32);
var sunMaterial = new THREE.MeshPhongMaterial({ 
  map: new THREE.TextureLoader().load('img/sunmap.jpg'),
  emissive: 0xffaa00, // Add emissive color for a glowing effect
  emissiveIntensity: 0.7, // Adjust intensity of emissive glow
  emissiveMap: new THREE.TextureLoader().load('img/sunmap.jpg')
});
var sun = new THREE.Mesh(sunGeometry,sunMaterial);
scene.add(sun)

//using a PointLight for the sun, to make it look as it its "emmiting" light
var sunLight = new THREE.PointLight(0xFFFFFF, 40, 100000000); // Color, intensity, and range
sunLight.position.copy(sun.position); // Position the light at the sun's location
scene.add(sunLight); // Add the light to the scene

//create the earth
var eGeometry = new THREE.SphereGeometry(0.5,32,32);
var earthMaterial = new THREE.MeshPhongMaterial({ 
  map: new THREE.TextureLoader().load('img/earthmap.jpg') 
});
var earth = new THREE.Mesh(eGeometry,earthMaterial);
scene.add(earth);
earth.position.set(40,30,-100);

//create Mercury
var merGeometry = new THREE.SphereGeometry(0.2, 32, 32);
var mercuryMaterial = new THREE.MeshPhongMaterial({ 
  map: new THREE.TextureLoader().load('img/mercurymap.jpg') 
});
var mercury = new THREE.Mesh(merGeometry,mercuryMaterial);
scene.add(mercury);
mercury.position.set(40,30,-100);

//venus
var vGeometry = new THREE.SphereGeometry(0.4, 32, 32);
var venusMaterial = new THREE.MeshPhongMaterial({ 
  map: new THREE.TextureLoader().load('img/venusmap.jpg') 
});
var venus = new THREE.Mesh(vGeometry,venusMaterial);
scene.add(venus);
venus.position.set(40,30,-100);

//mars
var mGeometry = new THREE.SphereGeometry(0.35, 32, 32);
var marsMaterial = new THREE.MeshPhongMaterial({ 
  map: new THREE.TextureLoader().load('img/marsmap.jpg') 
});
var mars = new THREE.Mesh(mGeometry,marsMaterial);
scene.add(mars);
mars.position.set(40,30,-100);

//jupiter
var jGeometry = new THREE.SphereGeometry(1, 32, 32);
var jupiterMaterial = new THREE.MeshPhongMaterial({ 
  map: new THREE.TextureLoader().load('img/jupitermap.jpg') 
});
var jupiter = new THREE.Mesh(jGeometry,jupiterMaterial);
scene.add(jupiter);
jupiter.position.set(40,30,-100);

// saturn
var sGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    var sMaterial = new THREE.MeshPhongMaterial({ 
      map: new THREE.TextureLoader().load('img/saturnmap.jpg') 
    });
    var saturn = new THREE.Mesh(sGeometry, sMaterial);
    saturn.position.set(40, 30, -100);

// Saturn's Ring
var ringMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('img/saturnring.png'),
  side: THREE.DoubleSide // Ensure the ring is visible from both sides
});
var saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(0.9, 1.3, 30), // Ring with 30 segments
  ringMaterial
);
saturnRing.rotation.x = Math.PI / 2; // Correct the rotation of the ring (90 degrees in radians)

// Add the ring to Saturn
saturn.add(saturnRing);

// Add Saturn to the scene
scene.add(saturn);

// Uranus
var uGeometry = new THREE.SphereGeometry(0.7, 32, 32);
var uMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('img/uranusmap.jpg') // Use an appropriate texture for Uranus
});
var uranus = new THREE.Mesh(uGeometry, uMaterial);
uranus.position.set(40, 30, -100); // Set the position of Uranus

// Uranus Ring
var ringMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('img/uranusring.jpg'), // Use a correct texture for Uranus's rings
  side: THREE.DoubleSide // Ensure the ring is visible from both sides
});
var uranusRing = new THREE.Mesh(
  new THREE.RingGeometry(0.9, 1.3, 30), // Define a ring geometry
  ringMaterial
);
uranusRing.rotation.x = Math.PI / 2; // Correct the rotation to be horizontal
// Add the ring to Uranus
uranus.add(uranusRing);
// Add Uranus to the scene
scene.add(uranus);

//neptune
var nGeometry = new THREE.SphereGeometry(0.5,32,32);
var neptuneMaterial = new THREE.MeshPhongMaterial({ 
  map: new THREE.TextureLoader().load('img/neptunemap.jpg') 
});
var neptune = new THREE.Mesh(nGeometry,neptuneMaterial);
scene.add(neptune);
neptune.position.set(40,30,-100);

//adjust the camera
camera.position.z = 7;
camera.position.y = 1;


 // logic
 var update = function() {
  earth.rotation.y += 0.01;
  mercury.rotation.y += 0.01;
  venus.rotation.x += 0.01;
  mars.rotation.y += 0.01;
  jupiter.rotation.y += 0.01;
  saturn.rotation.y += 0.01;
  neptune.rotation.y += 0.01;
};

// Draw scene
var render = function() {
  renderer.render(scene, camera);
};

// The orbit
var eOrbitRadius = 8;
var mOrbitRadius = 4;
var vOrbitRadius = 6;
var marsOrbitRadius = 10;
var jOrbitRadius = 16;
var sOrbitRadius = 20;
var uOrbitRadius = 22;
var nOrbitRadius = 24;

//orbit outlines
var orbitSegments = 64; //makes it a circle, if you set it to 0 teh outlines become a triangle
var orbitColor = 0xc8c8c8;
// line material for the orbits
var orbitMaterial = new THREE.LineBasicMaterial({
  color:orbitColor,
  transparent: true,
  opacity:0.05
})
//function to create orbit (im lazy)
function createSmoothOrbit(radius) {
  var vertices = []; // Array to hold the circle's vertices

  // Generate vertices for the circle
  for (var i = 0; i <= orbitSegments; i++) {
    var angle = (i / orbitSegments) * Math.PI * 2; // Complete circle
    var x = Math.cos(angle) * radius; // x-coordinate
    var z = Math.sin(angle) * radius; // z-coordinate
    vertices.push(x, 0, z); // Add the vertex to the array
  }

  var orbitGeometry = new THREE.BufferGeometry();
  orbitGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3) // Set 3D vertices
  );

  var orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial); // Create LineLoop

  return orbit; // Return the orbit
}
// Create and add the orbits to the scene
scene.add(createSmoothOrbit(4, 128)); // Mercury
scene.add(createSmoothOrbit(6, 128)); // Venus
scene.add(createSmoothOrbit(8, 128)); // Earth
scene.add(createSmoothOrbit(10, 128)); // Mars
scene.add(createSmoothOrbit(16, 128)); // Jupiter
scene.add(createSmoothOrbit(20, 128)); // Saturn
scene.add(createSmoothOrbit(22, 128)); // Uranus
scene.add(createSmoothOrbit(24, 128)); // Neptune

// Orbital speed
var eDate;
var mDate;
var vDate;
var marsDate;
var jDate;
var sDate;
var uDate;
var nDate;

// Update, render, repeat
var planetLoop = function() {
  eDate = Date.now() * 0.0006;
  mDate = Date.now() * 0.0043;
  vDate = Date.now() * 0.0008;
  marsDate = Date.now() * 0.0003;
  jDate = Date.now() * 0.0001;
  sDate = Date.now() * 0.00009;
  uDate = Date.now() * 0.00007;
  nDate = Date.now() * 0.00005;

  // Continue orbit
  earth.position.set(Math.cos(eDate) * eOrbitRadius, 0, Math.sin(eDate) * eOrbitRadius);
  mercury.position.set(Math.cos(mDate) * mOrbitRadius, 0, Math.sin(mDate) * mOrbitRadius);
  venus.position.set(Math.cos(vDate) * vOrbitRadius, 0, Math.sin(vDate) * vOrbitRadius);
  mars.position.set(Math.cos(marsDate) * marsOrbitRadius, 0, Math.sin(marsDate) * marsOrbitRadius);
  jupiter.position.set(Math.cos(jDate) * jOrbitRadius, 0, Math.sin(jDate) * jOrbitRadius);
  saturn.position.set(Math.cos(sDate) * sOrbitRadius, 0, Math.sin(sDate) * sOrbitRadius);
  uranus.position.set(Math.cos(uDate) * uOrbitRadius, 0, Math.sin(uDate) * uOrbitRadius);
  neptune.position.set(Math.cos(nDate) * nOrbitRadius, 0, Math.sin(nDate) * nOrbitRadius);
  requestAnimationFrame(planetLoop);
  update();
  render();
};

planetLoop();