
var camera,
renderer,
scene,
trackballControl,
clock
;

var planet1, planet2,planet3, moonTest1,moonTest2;

//  Planets
var mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto;


//  Distance from Sun
    //  Formula : Mercury_Distance = (57.9 x 10^6)/(10^7)
    var mercury_Distance    = 5.7;
    var venus_Distance      = 10.82;
    var earth_Distance      = 14.96;
    var mars_Distance       = 22.79;
    var jupiter_Distance    = 77.86;
    var saturn_Distance     = 143.35;
    var uranus_Distance     = 287.25;
    var neptune_Distance    = 449.51;
    var pluto_Distance      = 590.64;


// Radius of planets = Diameter/2
    //  Formula : Mercury_ Radius = (4,878 km)/(2*10000) 
    var mercury_Radius  = 0.2439;
    var venus_Radius    = 0.6052;
    var earth_Radius    = 0.6378;
    var mars_Radius     = 0.3397;
    var jupiter_Radius  = 7.1492;
    var saturn_Radius   = 6.0268;
    var uranus_Radius   = 2.5559;
    var neptune_Radius  = 2.4766;
    var pluto_Radius    = 0.1185;

    var sun_Radius      = 69.5508 / 4;  // Reduced the sun_radius to one forth size

//  Orbit Velocity (around the Sun)
    //  Formula : Mercury_Velocity = (47.4 km/s)/(2 * 1000)
    var mercury_Velocity    = 0.0474 / 2;
    var venus_Velocity      = 0.035 / 2;
    var earth_Velocity      = 0.0298 / 2;
    var mars_Velocity       = 0.0241 / 2;
    var jupiter_Velocity    = 0.0131 / 2;
    var saturn_Velocity     = 0.0097 / 2;
    var uranus_Velocity     = 0.0068 / 2;
    var neptune_Velocity    = 0.0054 / 2;
    var pluto_Velocity      = 0.0047 / 2;

// Axis Velocity


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

var pointLight = new THREE.PointLight(0xfcfc00,10,1000);
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
let _geoSUN = new THREE.SphereGeometry(sun_Radius,32,32);
let _matSUN = new THREE.MeshPhongMaterial ({color : 0xfcfc00, emissive: 0xfcfc00, emissiveIntensity:5});
let sun     = new THREE.Mesh(_geoSUN,_matSUN);

//sun.position.set(0,-5,5);
sun.castShadow = true;
sun.receiveShadow = true;
scene.add(sun);


mercury = new THREE.Object3D();
addPlanet(mercury,mercury_Radius,0x0061ff,sun_Radius + mercury_Distance);

venus = new THREE.Object3D();
addPlanet(venus,venus_Radius,0xff512d,sun_Radius + venus_Distance);

earth = new THREE.Object3D();
addPlanet(earth,earth_Radius,0xff512d,sun_Radius + earth_Distance);

mars = new THREE.Object3D();
addPlanet(mars,mars_Radius,0xff512d,sun_Radius + mars_Distance);

jupiter = new THREE.Object3D();
addPlanet(jupiter,jupiter_Radius,0xff512d,sun_Radius + jupiter_Distance);

saturn = new THREE.Object3D();
addPlanet(saturn,saturn_Radius,0xff512d,sun_Radius + saturn_Distance);

uranus = new THREE.Object3D();
addPlanet(uranus,uranus_Radius,0xff512d,sun_Radius + uranus_Distance);

neptune = new THREE.Object3D();
addPlanet(neptune,neptune_Radius,0xff512d,sun_Radius + neptune_Distance);

pluto = new THREE.Object3D();
addPlanet(pluto,pluto_Radius,0xff512d,sun_Radius + pluto_Distance);

// moonTest1 = new THREE.Object3D();
// moonTest1.position.set(20,0,0);
// addPlanet(moonTest1,0.5,0x2e69ff,5);
// venus.add(moonTest1);

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

mercury.rotation.z  += mercury_Velocity;
venus.rotation.z    += venus_Velocity;
earth.rotation.z    += earth_Velocity;
mars.rotation.z     += mars_Velocity;
jupiter.rotation.z  += jupiter_Velocity;
saturn.rotation.z   += saturn_Velocity;
uranus.rotation.z   += uranus_Velocity;
neptune.rotation.z  += neptune_Velocity;
pluto.rotation.z    += pluto_Velocity;
// moonTest1.rotation.y += 0.01;
requestAnimationFrame(render);
}



window.onload = () => {
init();

createGeometry();
customInspector();
setUpCameraAndLight();
render();
}