class PerspectiveCamera
{
    constructor(camera)
    {
        //how far the camera is from the center of the scene
        this.radius = 10
        this.height = 3

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.camera.position.set(0,this.height,this.radius)
    }
    updateCameraView(){}
}

class TrackingCamera
{
    constructor(target)
    {
        this.target = target
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.camera.position.set(15,15,15)
        this.updateCameraView(target)
    }
    updateCameraView()
    {
        this.camera.lookAt(this.target)
    }
}
