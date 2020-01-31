

import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';
import {GLTFLoader} from './GLTFLoader.js';

function main() {
  const canvas = document.querySelector('#model');
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true,antialias:true});

  var meshArray = [];

  var mouse = new THREE.Vector2(), INTERSECTED;
  var raycaster = new THREE.Raycaster();
  const fov = 20;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, -5);
  camera.up = new THREE.Vector3(0,0,-1);
  var annotationActive = false;
  var origin = camera.position;

  const controls = new OrbitControls(camera, canvas);
  // to disable zoom
/*  controls.minPolarAngle = 0; // radians
  controls.maxPolarAngle = Math.PI/2 - 0.2;*/
  controls.enableZoom = false;

  controls.target.set(0, 0, 0);
  controls.update();
//  controls.enabled=false;
  const scene = new THREE.Scene();

/*  var size = 50;
  var divisions = 50;
  var gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );*/
  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 0.4;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0x777777;
    const intensity = 0.8;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 5, -5);
    scene.add(light);
    scene.add(light.target);

   const light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(-5, -5, -5);
    scene.add(light2);
    scene.add(light2.target);

    const light3 = new THREE.DirectionalLight(color, intensity);
    light3.position.set(5, -5, -5);
    scene.add(light3);
    scene.add(light3.target);

    const light4 = new THREE.DirectionalLight(color, intensity);
    light4.position.set(-5, 5, -5);
    scene.add(light4);
    scene.add(light4.target);

  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.Math.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 2, 1))
        .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  {

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./bomb.glb', (gltf) => {
      gltf.scene.traverse( function( node ) {

        if ( node instanceof THREE.Mesh ) {
          console.log(true);
           node.castShadow = true;
           node.receiveShadow = true;
         }

    } );
      const root = gltf.scene;
      scene.add(root);
      //scene.rotation.x += 1.5;
      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      frameArea(boxSize * 1.5, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();

    });
  }









  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }


    if (scene) {
     scene.rotation.z+= 0.0080;
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
