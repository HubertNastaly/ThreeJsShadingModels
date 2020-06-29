class Car{
    constructor()
    {
        this.car = undefined
        this.direction = new THREE.Vector3(-0.1,0,0)
        this.beacon = undefined
        this.spinStep = Math.PI / 36
        this.angle = 0
        this.camera = undefined
        this.path = City.preparePath()
        console.log(this.path)
        this.vertices = [
            new THREE.Vector3(-1,-0.5,0.5),
            new THREE.Vector3(1,-0.5,0.5),
            new THREE.Vector3(1,0,0.5),
            new THREE.Vector3(0.5,1,0.5),
            new THREE.Vector3(-0.25,1,0.5),
            new THREE.Vector3(-0.5,0,0.5),
            new THREE.Vector3(-1,0,0.5),
            new THREE.Vector3(-1,-0.5,-0.5),
            new THREE.Vector3(1,-0.5,-0.5),
            new THREE.Vector3(1,0,-0.5),
            new THREE.Vector3(0.5,1,-0.5),
            new THREE.Vector3(-0.25,1,-0.5),
            new THREE.Vector3(-0.5,0,-0.5),
            new THREE.Vector3(-1,0,-0.5),
        ];
        this.faces = [
            new THREE.Face3(0,1,5),
            new THREE.Face3(0,5,6),
            new THREE.Face3(0,6,7),
            new THREE.Face3(0,1,8),
            new THREE.Face3(0,8,7),
            new THREE.Face3(1,2,5),
            new THREE.Face3(1,9,2),
            new THREE.Face3(1,8,9),
            new THREE.Face3(2,3,5),
            new THREE.Face3(2,10,3),
            new THREE.Face3(2,9,10),
            new THREE.Face3(3,4,5),
            new THREE.Face3(3,11,4),
            new THREE.Face3(3,10,11),
            new THREE.Face3(4,12,5),
            new THREE.Face3(4,11,12),
            new THREE.Face3(5,13,6),
            new THREE.Face3(5,12,13),
            new THREE.Face3(6,13,7),
            new THREE.Face3(7,12,8),
            new THREE.Face3(7,13,12),
            new THREE.Face3(8,12,9),
            new THREE.Face3(9,12,10),
            new THREE.Face3(10,12,11)
        ];
        this.prepareCar()
        this.prepareCamera()
    }
    prepareCamera()
    {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        const carPosition = this.car.position
        this.camera.position.set(carPosition.x, carPosition.y + 1.5, carPosition.z - 4)
        this.camera.rotateY(Math.PI)
        this.car.add(this.camera)
    }
    updateCameraView(point)
    {

    }
    moveAlongPath()
    {
        if(this.moveAlongPath.clock == undefined)
        {
            this.moveAlongPath.clock = new THREE.Clock()
        }
        const t = this.moveAlongPath.clock.getElapsedTime() * 0.04
        this.car.position.copy(this.path.getPointAt( t % 1))
        const point = this.path.getPointAt((t + 0.04) % 1)
        this.car.lookAt(point)
        this.updateCameraView(point)
    }
    spinBeaconLight()
    {
        this.beacon.rotation.y += this.spinStep
    }
    createFrontLight(shift)
    {
        let bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1,16,16), myPhongMaterial(myColors.carFrontLightColor));
        bulb.position.set(shift, -0.2, 1);
        this.car.add(bulb)
        let light = new THREE.SpotLight(0xffefee, 5, 10, THREE.Math.degToRad(20), 0.5)

        this.car.add(light.target)
        this.car.add(light)
        light.target.position.set(shift,-0.2,3)
        light.target.updateMatrixWorld()
        light.position.set(shift, -0.1, 1.1)
    }
    createBackLight(shift)
    {
        let geometry = new THREE.BoxGeometry(0.1,0.1,0.3)
        geometry.rotateY(Math.PI/2)
        let bulb = new THREE.Mesh(geometry, myPhongMaterial(myColors.carBackLightColor))
        bulb.position.set(shift, -0.2, -1)
        this.car.add(bulb)
        let light = new THREE.PointLight( 0xff0000,0.5,2 )
        light.position.set(shift, -0.2, -1)
        let lightbulb = new THREE.Group()
        lightbulb.add(light,bulb)
        this.car.add(lightbulb)
    }
    createBeaconLight()
    {
        let beacon = prepareBeacon()
        beacon.position.set(0,1.05,0)
        let light = new THREE.SpotLight(0x0062ff, 3, 5, THREE.Math.degToRad(50), 0.3)
        light.position.set(beacon.position.x, beacon.position.y, beacon.position.z)

        //creating beacon target with pivot
        let beaconTarget = new THREE.Object3D()
        beaconTarget.position.set(5,1.05,0)//radius = 5
        beacon.add(beaconTarget)
        light.target = beaconTarget
        this.beacon = new THREE.Group()
        this.beacon.position.set = (beacon.position.x, beacon.position.y, beacon.position.z)
        this.beacon.add(beacon,light,beaconTarget)
        this.car.add(this.beacon)
    }
    createLights()
    {
        this.createFrontLight(0.3)
        this.createFrontLight(-0.3)
        this.createBackLight(0.3)
        this.createBackLight(-0.3)
    }
    animate()
    {
        this.spinBeaconLight()
        this.moveAlongPath()
    }
    prepareCar()
    {
        const geometry = new THREE.Geometry()
        this.vertices.forEach(v => geometry.vertices.push(v))
        this.faces.forEach(f => geometry.faces.push(f))
        geometry.computeFaceNormals()
        geometry.rotateY(Math.PI/2)

        var material = myPhongMaterial(myColors.carBodyColor)
        var body = new THREE.Mesh ( geometry, material )

        const wheelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 32)
        wheelGeometry.rotateX(Math.PI/2)
        wheelGeometry.rotateY(Math.PI/2)
        material = myPhongMaterial(myColors.wheelColor)

        var wheels = [ new THREE.Mesh ( wheelGeometry, material ),
                        new THREE.Mesh ( wheelGeometry, material ),
                        new THREE.Mesh ( wheelGeometry, material ),
                        new THREE.Mesh ( wheelGeometry, material )]
        wheels[0].position.set(-0.5,-0.5,-0.5);
        wheels[1].position.set(-0.5,-0.5,0.5);
        wheels[2].position.set(0.5,-0.5,-0.5);
        wheels[3].position.set(0.5,-0.5,0.5);
        this.car = new THREE.Group()
        this.car.add(body, wheels[0], wheels[1], wheels[2], wheels[3])
        this.car.position.set(0,0.75,0)
        this.createBeaconLight()
        this.createLights()
        scene.add(this.car)
    }
}
