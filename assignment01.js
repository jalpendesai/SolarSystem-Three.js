var camera,
    renderer,
    scene,
    trackballControl,
    clock
    ;

var ambientLight;

//  Initialization
function init(){
    scene       = new THREE.Scene();
    renderer    = new THREE.WebGLRenderer();

    renderer.setSize(window.innerHeight, window.innerWidth);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    clock       =  new THREE.Clock();
}

//  Camera and Light setup
function setUpCameraAndLight(){
    camera  = new THREE.PerspectiveCamera(
        50, 
        window.innerWidth/window.innerHeight,
        100);
    
    camera.position.x   = 15;
    camera.position.y   = 10;
    camera.position.z   = 10;
    camera.lookAt(scene.position);

    trackballControl = new THREE.TrackballControls(camera,render.domElement);

    //  Light
    // ambientLight            = new THREE.AmbientLight({color:0x3c3c3c});
    // ambientLight.castShadow = true;
    // scene.add(ambientLight);
}

// Custom Inspectper Setting up
function customInspector(){

}

//  Creating planet Geometry
function createGeometry(){
    
    //  SUN
    let _geoSUN = new THREE.SphereGeometry(30);
    let _matSUN = new THREE.MeshLambertMaterial ({color : 0xffff00});
    let sun     = new THREE.Mesh(_geoSUN,_matSUN);

    sun.position.set(10,10,10);
    
    scene.add(sun);
}

function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene,camera);

    requestAnimationFrame(render);
}

window.onload = () => {
    init();
    setUpCameraAndLight();
    createGeometry();
    customInspector();
    render();
}