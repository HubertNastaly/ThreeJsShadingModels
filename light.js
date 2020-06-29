const ShadingModels =
{
    //LSB for lighting, MSB for shading
    GouraudPhong: 0,
    GouraudBlinn: 1,
    Phong: 2,
    PhongBlinn: 3
}

const ShadingModelsSwitch = [
    [1,2],[0,3],[3,0],[2,1]
]

function changeShadingModel(shadingToggle)
{
    newModel = ShadingModelsSwitch[changeShadingModel.currentModel][shadingToggle]
    changeShadingModel.currentModel = newModel
    let shadingInfo = document.getElementById('shadingInfo')
    let lightingInfo = document.getElementById('lightingInfo')
    scene.traverse((c,index) =>{
        if(c instanceof THREE.Mesh)
        {
            switch (newModel)
            {
                case ShadingModels.GouraudPhong:
                {
                    shadingInfo.textContent = 'Shading: Gouraud'
                    lightingInfo.textContent = 'Lighting: Phong'
                    c.geometry.normalsNeedUpdate = true
                    const color = c.material.uniforms.vColor.value
                    c.material = myGouraudPhongMaterial({ value: new THREE.Color(color.r, color.g, color.b)})
                }
                break;
                case ShadingModels.GouraudBlinn:
                {
                    shadingInfo.textContent = 'Shading: Gouraud'
                    lightingInfo.textContent = 'Lighting: Blinn-Phong'
                    c.geometry.normalsNeedUpdate = true
                    const color = c.material.uniforms.vColor.value
                    c.material = myGouraudBlinnMaterial({ value: new THREE.Color(color.r, color.g, color.b)})
                }
                break;
                case ShadingModels.Phong:
                {
                    shadingInfo.textContent = 'Shading: Phong'
                    lightingInfo.textContent = 'Lighting: Phong'
                    c.geometry.computeFaceNormals()
                    c.geometry.normalsNeedUpdate = true
                    const color = c.material.uniforms.vColor.value
                    c.material = myPhongMaterial({ value: new THREE.Color(color.r, color.g, color.b)})
                }
                break;
                case ShadingModels.PhongBlinn:
                {
                    shadingInfo.textContent = 'Shading: Phong'
                    lightingInfo.textContent = 'Lighting: Blinn-Phong'
                    c.geometry.normalsNeedUpdate = true
                    const color = c.material.uniforms.vColor.value
                    c.material = myPhongBlinnMaterial({ value: new THREE.Color(color.r, color.g, color.b)})
                }
                default:
            }
        }
    })
}
changeShadingModel.currentModel = 2

class Lights
{
    constructor()
    {
        var sunLight = new THREE.DirectionalLight(0xfff8d6, 1.0)
        sunLight.position.set(10,10,10)
        this.sun = sunLight
        scene.add(sunLight)
        this.dayAndNightAnimation = false
        this.day = true;
    }
    moveSunAndMoon()
    {
        if(!this.dayAndNightAnimation)
        {
            return
        }
        if(this.day)
        {
            this.day2Night()
        }
        else
        {
            this.night2Day()
        }
    }
    day2Night()
    {
        this.sun.intensity -= 0.01
        if(this.sun.intensity < 0.0)
        {
            this.sun.intensity = 0.0
            this.dayAndNightAnimation = false
            this.day = false
        }
        myUniforms.sunIntensity = this.sun.intensity
    }
    night2Day()
    {
        this.sun.intensity += 0.01
        if(this.sun.intensity > 1.0)
        {
            this.sun.intensity = 1.0
            this.dayAndNightAnimation = false
            this.day = true
        }
        myUniforms.sunIntensity = this.sun.intensity
    }
    toggleDayAndNight()
    {
        this.dayAndNightAnimation = true;
    }
}
