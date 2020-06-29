var scene = new THREE.Scene()
var perspectiveCamera = new PerspectiveCamera()
var activeCamera = perspectiveCamera.camera

const renderer = new THREE.WebGLRenderer({ antialias: true})
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.shadowMap.enabled = true
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

var controls = new THREE.OrbitControls( perspectiveCamera.camera, renderer.domElement )
controls.enableKeys = false
controls.maxDistance = 25;

scene.fog = new THREE.Fog(0x53595c, 5, 20)

var lights = new Lights()
var car = new Car()
var trackingCamera = new TrackingCamera(car.car.position)
City.prepareCity()

function animate()
{
    requestAnimationFrame(animate)
    lights.moveSunAndMoon()
    car.animate()
    controls.update()
    trackingCamera.updateCameraView()
    render(activeCamera)
}

function render(camera)
{
    renderer.render( scene, camera )
}

animate()

function keyPressed(event)
{
    console.log("keyPressed: " + (event.which || event.keyCode).toString())
    switch (event.which || event.keyCode)
    {
        case 32://Space
            lights.toggleDayAndNight();
            break;
        case 49://1
            activeCamera = perspectiveCamera.camera;
            break;
        case 50://2
            activeCamera = car.camera;
            break;
        case 51://3
            activeCamera = trackingCamera.camera;
            break;
        case 115://S
            changeShadingModel(1);
            break;
        case 108://L
            changeShadingModel(0);
            break;
        default:
    }
    if(activeCamera === trackingCamera.camera)
    {
        trackingCamera.updateCameraView()
    }
    controls.update();
    render(activeCamera)
}
