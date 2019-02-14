
var camera,
renderer,
scene,
trackballControl,
clock
;

var planet1, planet2,planet3, moonTest1,moonTest2;
var geoPlanet, matPlanet;

var ambientLight;

//  Initialization
function init(){
scene       = new THREE.Scene();
renderer    = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xbfbfbf); // Set it to 0x050505
document.body.appendChild(renderer.domElement);

clock = new THREE.Clock();
}

//  Camera and Light setup
function setUpCameraAndLight(){
camera  = new THREE.PerspectiveCamera(
    80, 
    window.innerWidth/window.innerHeight,
    0.1,
    1000);

camera.position.x   = 0;
camera.position.y   = -60;
camera.position.z   = 0;

camera.lookAt(scene.position);

// Lights
   
ambient = new THREE.AmbientLight(0xfcfc00,0.02);
ambient.castShadow = true;
scene.add(ambient);

var pointLight = new THREE.PointLight(0xfcfc00,10,100);
pointLight.position.set(0,0,0);
pointLight.castShadow = true;
scene.add(pointLight);


trackballControl = new THREE.TrackballControls(camera, renderer.domElement);
}

// Custom Inspectper Setting up
function customInspector(){

}

//  Creating planet Geometry
function createGeometry(){

//  SUN
let _geoSUN = new THREE.SphereGeometry(4,32,32);
let _matSUN = new THREE.MeshPhongMaterial ({color : 0xfcfc00, emissive: 0xfcfc00, emissiveIntensity:5});
let sun     = new THREE.Mesh(_geoSUN,_matSUN);

//sun.position.set(0,-5,5);

sun.castShadow = true;
sun.receiveShadow = true;
scene.add(sun);


// Planet2
let _geoPlanet2 = new THREE.SphereGeometry(2,32,32);
let _matPlanet2 = new THREE.MeshPhongMaterial({color:0x0061ff});
planet2 = new THREE.Mesh(_geoPlanet2,_matPlanet2);

planet2.position.set(30,0,0);
planet2.castShadow = true;
planet2.receiveShadow = true;


planet1 = new THREE.Object3D();
addPlanet(planet1,3,0x0061ff,20);

planet3 = new THREE.Object3D();
addPlanet(planet3,2,0xff512d,30);

moonTest1 = new THREE.Object3D();
moonTest1.position.set(20,0,0);
addPlanet(moonTest1,0.5,0x2e69ff,5);
planet1.add(moonTest1);

}

function addPlanet(obj, planet_Size, planet_Color, distanceFromSun ){
    let geoPlanet = new THREE.SphereGeometry(planet_Size,32,32);
    let matPlanet = new THREE.MeshLambertMaterial({color: planet_Color});
    let planet = new THREE.Mesh(geoPlanet, matPlanet);
    planet.position.set(distanceFromSun,0,0);
    planet.castShadow = true;
    planet.receiveShadow = true;

    obj.add(planet);
    scene.add(obj);

}

function render(){
// planetRotation();
trackballControl.update(clock.getDelta());
renderer.render(scene,camera);

planet1.rotation.z += 0.01;
planet3.rotation.z += 0.02;
moonTest1.rotation.y += 0.01;
requestAnimationFrame(render);
}



window.onload = () => {
init();

createGeometry();
customInspector();
setUpCameraAndLight();
render();
}