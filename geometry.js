function prepareBeacon()//kogut policyjny
{
    var geometry = new THREE.CylinderGeometry(0.07,0.1,0.2,8)
    var material = myPhongMaterial(myColors.beaconColor)
    var beacon = new THREE.Mesh(geometry, material)
    return beacon
}

function preparePlane()
{
    var geometry = new THREE.PlaneGeometry(29,29,10,10)
    var material = myPhongMaterial(myColors.groundColor)
    var plane = new THREE.Mesh ( geometry, material )
    plane.rotation.x = Math.PI * 1.5
    plane.position.y = 0
    plane.receiveShadow = true
    return plane
}

function prepareTree()
{
    var geometry = new THREE.SphereGeometry(2,16,16)
    var material = myPhongMaterial(myColors.treeGreenColor)
    var green = new THREE.Mesh ( geometry, material )
    geometry = new THREE.CylinderGeometry(0.3,0.3,3,8)
    var material = myPhongMaterial(myColors.treeTrunkColor)
    var trunk = new THREE.Mesh ( geometry, material )
    trunk.castShadow = true
    green.position.set(0,3.5,0)
    trunk.position.set(0,1.5,0)
    var tree = new THREE.Group()
    tree.add(green, trunk)
    return tree
}

function prepareSegment(width)
{
    const [height1,height2,height3] = [5,3,7]
    const segments = [3,3,3]
    var geometry = new THREE.BoxGeometry( width/2, height1, width/2, ...segments)
    var material = myPhongMaterial(myColors.buildingColor)
    var cube1 = new THREE.Mesh ( geometry, material )
    geometry = new THREE.BoxGeometry( width/2, height2, width/2, ...segments)
    var cube2 = new THREE.Mesh ( geometry, material )
    geometry = new THREE.BoxGeometry( width/2, height3, width/2, ...segments)
    var cube3 = new THREE.Mesh ( geometry, material )
    var tree = prepareTree()

    cube1.position.set(-width/4,height1/2,-width/4)
    cube2.position.set(-width/4,height2/2,width/4)
    cube3.position.set(width/4,height3/2,-width/4)
    tree.position.set(width/4,0,width/4)

    var segment = new THREE.Group()
    segment.add(cube1, cube2, cube3, tree)
    //segment.traverse(c => c.castShadow = true)
    return segment
}

class City
{
    static prepareCity()
    {
        const width = 29
        const segmentWidth = 10
        const streetWidth = 3
        //4 segmenty, 3 bloki i 1 drzewko na segment
        var [a, b, c, d] = [prepareSegment(segmentWidth),prepareSegment(segmentWidth),prepareSegment(segmentWidth),prepareSegment(segmentWidth)]
        var plane = preparePlane()
        const translation = segmentWidth/2 + streetWidth/2
        a.rotateY(Math.PI)
        b.rotateY(Math.PI/2)
        c.rotateY(Math.PI * 3/2)
        a.position.set(-translation, 0, -translation)
        b.position.set(-translation, 0, translation)
        c.position.set(translation, 0, -translation)
        d.position.set(translation, 0, translation)
        var city = new THREE.Group()
        city.add(a,b,c,d,plane)
        scene.add(city)
        return city
    }
    static preparePath()
    {
        var path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0.75, 0),
            new THREE.Vector3(-11.5, 0.75, 0),
            new THREE.Vector3(-13, 0.75, -1.5),
            new THREE.Vector3(-13, 0.75, -11.5),
            new THREE.Vector3(-11.5, 0.75, -13),
            new THREE.Vector3(11.5, 0.75, -13),
            new THREE.Vector3(13, 0.75, -11.5),
            new THREE.Vector3(13, 0.75, -1.5),
            new THREE.Vector3(11.5, 0.75, 0),
            new THREE.Vector3(1.5, 0.75, 0),
            new THREE.Vector3(0, 0.75, 1.5),
            new THREE.Vector3(0, 0.75, 11.5),
            new THREE.Vector3(1.5, 0.75, 13),
            new THREE.Vector3(11.5, 0.75, 13),
            new THREE.Vector3(13, 0.75, 11.5),
            new THREE.Vector3(13, 0.75, 1.5),
            new THREE.Vector3(11.5, 0.75, 0)
        ]);
        path.closed = true
        return path
    }
}
