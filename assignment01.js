
var camera,
renderer,
scene,
trackballControl,
clock,
control
;

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

//  Moons
var earth_Moon,

    jupiter_Moon1,
    jupiter_Moon2,
    jupiter_Moon3,
    jupiter_Moon4,
    jupiter_Moon5,

    saturn_Moon1,
    saturn_Moon2,
    saturn_Moon3;

//  -----------DISTANCE-------------
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

//  Moon Distance from their planet
    var earth_Moon_Distance     = 0.3844;
    var jupiter_Moon1_Distance  = 0.422;
    var jupiter_Moon2_Distance  = 0.671;
    var jupiter_Moon3_Distance  = 1.07;
    var jupiter_Moon4_Distance  = 1.883;
    var jupiter_Moon5_Distance  = 1.813;

//  ------------RADIUS--------------
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

//  Radius of Moons
    var earth_Moon_Radius   = 0.17375;
    var jupiter_Moon1_Radius= 0.1815;
    var jupiter_Moon2_Radius= 0.1565;
    var jupiter_Moon3_Radius= 0.2634;
    var jupiter_Moon4_Radius= 0.2403;
    var jupiter_Moon5_Radius= 0.0131;

//  -----------VELOCITY---------------
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

//  Velocity of Moons
    var earth_Moon_Velocity     = 0.01 / 2;
    var jupiter_Moon1_Velocity  = 0.01769 / 2;
    var jupiter_Moon2_Velocity  = 0.03551 /2;
    var jupiter_Moon3_Velocity  = 0.07155 /2;
    var jupiter_Moon4_Velocity  = 0.16689 /2;
    var jupiter_Moon5_Velocity  = 0.004981 /2;

// Axis Velocity


//  Custom Inspector Properties
    var planetSpeed = 1;
    var moonSpeed   = 1;

//  Initialization
function init(){
scene       = new THREE.Scene();
renderer    = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x050505); // Set it to 0x050505
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
camera.position.z   = 0.1;

camera.lookAt(scene.position);

// Lights
   
var ambient = new THREE.AmbientLight(0xfcfc00,0.02);
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

    control = new function(){
    this.planetSpeed    = 1;
    this.moonSpeed      = 1;
    
    }
    var gui = new dat.GUI();
    // Adjusting the speed to rotation of the planets around the sun
    gui.add(control, 'planetSpeed',1,15).listen().onChange((e) => {
        planetSpeed = e;
    });

    // Adjusting the orbiting speeds of the moons
    gui.add(control, 'moonSpeed', 1, 15).listen().onChange((e) => {
        moonSpeed = e;
    });
    gui.open();
}

//  Creating planet Geometry
function createGeometry(){

//  --------SUN---------

let _geoSUN = new THREE.SphereGeometry(sun_Radius,32,32);
let _matSUN = new THREE.MeshPhongMaterial ({color : 0xfcfc00, emissive: 0xfcfc00, emissiveIntensity:5});
let sun     = new THREE.Mesh(_geoSUN,_matSUN);

//sun.position.set(0,-5,5);
sun.castShadow = true;
sun.receiveShadow = true;
scene.add(sun);


//  --------Planets----------
mercury = new THREE.Object3D();
addPlanet(mercury,mercury_Radius,0x0061ff,sun_Radius + mercury_Distance);

venus = new THREE.Object3D();
addPlanet(venus,venus_Radius,0xff512d,sun_Radius + venus_Distance);

earth = new THREE.Object3D();
addPlanet(earth,earth_Radius,0x0048ff,sun_Radius + earth_Distance);

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

//  ---------Moons---------

//  Earth_Moon
earth_Moon = new THREE.Object3D();
earth_Moon.position.set(sun_Radius + earth_Distance,0,0);
addPlanet(earth_Moon,earth_Moon_Radius, 0x0048ff, earth_Radius + earth_Moon_Distance);
earth.add(earth_Moon);

//  Jupiter_Moon
jupiter_Moon1 = new THREE.Object3D();
jupiter_Moon1.position.set(sun_Radius + jupiter_Distance,0,0);
addPlanet(jupiter_Moon1,jupiter_Moon1_Radius, 0x0045ff, jupiter_Radius + jupiter_Moon1_Distance);
jupiter.add(jupiter_Moon1);

jupiter_Moon2 = new THREE.Object3D();
jupiter_Moon2.position.set(sun_Radius + jupiter_Distance,0,0);
addPlanet(jupiter_Moon2,jupiter_Moon2_Radius, 0x0045ff, jupiter_Radius + jupiter_Moon2_Distance);
jupiter.add(jupiter_Moon2);

jupiter_Moon3 = new THREE.Object3D();
jupiter_Moon3.position.set(sun_Radius + jupiter_Distance,0,0);
addPlanet(jupiter_Moon3,jupiter_Moon3_Radius, 0x0045ff, jupiter_Radius + jupiter_Moon3_Distance);
jupiter.add(jupiter_Moon3);

jupiter_Moon4 = new THREE.Object3D();
jupiter_Moon4.position.set(sun_Radius + jupiter_Distance,0,0);
addPlanet(jupiter_Moon4,jupiter_Moon4_Radius, 0x0045ff, jupiter_Radius + jupiter_Moon4_Distance);
jupiter.add(jupiter_Moon4);

jupiter_Moon5 = new THREE.Object3D();
jupiter_Moon5.position.set(sun_Radius + jupiter_Distance,0,0);
addPlanet(jupiter_Moon5,jupiter_Moon5_Radius, 0x0045ff, jupiter_Radius + jupiter_Moon5_Distance);
jupiter.add(jupiter_Moon5);

//  Saturn_Moon


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

mercury.rotation.z  += mercury_Velocity * planetSpeed;
venus.rotation.z    += venus_Velocity * planetSpeed;
earth.rotation.z    += earth_Velocity * planetSpeed;
mars.rotation.z     += mars_Velocity * planetSpeed;
jupiter.rotation.z  += jupiter_Velocity * planetSpeed;
saturn.rotation.z   += saturn_Velocity * planetSpeed;
uranus.rotation.z   += uranus_Velocity * planetSpeed;
neptune.rotation.z  += neptune_Velocity * planetSpeed
pluto.rotation.z    += pluto_Velocity * planetSpeed;

//  Moon Velocity
earth_Moon.rotation.y       += earth_Moon_Velocity * moonSpeed;
jupiter_Moon1.rotation.y    += jupiter_Moon1_Velocity * moonSpeed;
jupiter_Moon2.rotation.y    += jupiter_Moon2_Velocity * moonSpeed;
jupiter_Moon3.rotation.y    += jupiter_Moon3_Velocity * moonSpeed;
jupiter_Moon4.rotation.y    += jupiter_Moon4_Velocity * moonSpeed;
jupiter_Moon5.rotation.y    += jupiter_Moon5_Velocity * moonSpeed;

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