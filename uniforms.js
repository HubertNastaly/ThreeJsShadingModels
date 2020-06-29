function updateUniforms()
{
    const canvas = renderer.domElement;
}

const myUniforms = {
    Ka: {value: 2.0},
    Ks: {value: 0.2},
    Kd: {value: 0.8},
    m: {value: 1.0},
    sunIntensity: {value: 2.0},
    pointLightIntensity: {value: 2.0},
    fogDensity: {value: 0.7}
}

const myColors = {
    carBodyColor:{
        value: new THREE.Color(0.3, 0.3, 0.8)
    },
    wheelColor:{
        value: new THREE.Color(0.0, 0.0, 0.0)
    },
    beaconColor:{
        value: new THREE.Color(0.05, 0.1, 0.7)
    },
    carFrontLightColor:{
        value: new THREE.Color(1.0, 1.0, 1.0)
    },
    carBackLightColor:{
        value: new THREE.Color(1.0, 0, 0)
    },
    groundColor:{
        value: new THREE.Color(0.5, 0.5, 0.5)
    },
    buildingColor:{
        value: new THREE.Color(0.05, 0.08, 0.14)
    },
    treeGreenColor:{
        value: new THREE.Color(0.027, 0.22, 0.0)
    },
    treeTrunkColor:{
        value: new THREE.Color(0.3, 0.15, 0.0)
    }
}

const { Ka, Ks, Kd, m, sunIntensity, pointLightIntensity, fogDensity } = myUniforms;

const myPhongMaterial = (vColor) => new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib[ "lights" ],
      THREE.UniformsLib[ "fog" ],
      { vColor, Ka, Ks, Kd, m, sunIntensity, pointLightIntensity, fogDensity }
  ]),
  vertexShader:   document.getElementById( 'basicVertexShader' ).textContent,
  fragmentShader: document.getElementById( 'phongLightingFragmentShader' ).textContent,
  lights: true,
  fog: true,
 });

 const myPhongBlinnMaterial = (vColor) => new THREE.ShaderMaterial({
   uniforms: THREE.UniformsUtils.merge([
       THREE.UniformsLib[ "lights" ],
       THREE.UniformsLib[ "fog" ],
       { vColor, Ka, Ks, Kd, m, sunIntensity, pointLightIntensity, fogDensity }
   ]),
   vertexShader:   document.getElementById( 'basicVertexShader' ).textContent,
   fragmentShader: document.getElementById( 'blinnLightingFragmentShader' ).textContent,
   lights: true,
   fog: true,
  });

 const myGouraudPhongMaterial = (vColor) => new THREE.ShaderMaterial({
   uniforms: THREE.UniformsUtils.merge([
       THREE.UniformsLib[ "lights" ],
       THREE.UniformsLib[ "fog" ],
       { vColor, Ka, Ks, Kd, m, sunIntensity, pointLightIntensity, fogDensity }
   ]),
   vertexShader:   document.getElementById( 'gouraudPhongVertexShader' ).textContent,
   fragmentShader: document.getElementById( 'gouraudFragmentShader' ).textContent,
   lights: true,
   fog: true
  });

  const myGouraudBlinnMaterial = (vColor) => new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib[ "lights" ],
        THREE.UniformsLib[ "fog" ],
        { vColor, Ka, Ks, Kd, m, sunIntensity, pointLightIntensity, fogDensity }
    ]),
    vertexShader:   document.getElementById( 'gouraudBlinnVertexShader' ).textContent,
    fragmentShader: document.getElementById( 'gouraudFragmentShader' ).textContent,
    lights: true,
    fog: true
   });
