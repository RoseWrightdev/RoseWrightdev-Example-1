import * as THREE from 'https://cdn.skypack.dev/three@0.136';

import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    const fov = 70;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4.5;
  
    const scene = new THREE.Scene();
  
    {
      const color = 0xFFFFFF;
      const intensity = 0.7;
      const light = new THREE.DirectionalLight(color, intensity);
      const moreLight = new THREE.AmbientLight( 0x404040 );
      light.position.set(-1, 2, 4);
      scene.add(light, moreLight);
      scene.background = new THREE.Color( 0xffffff );
    }
  
    const boxWidth = 1.3;
    const boxHeight = 1.3;
    const boxDepth = 1.3;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  
    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({color});
  
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
  
      cube.position.x = x;
  
      return cube;
    }

    const color1 = 0xdf689f;
    const color2 = 0xa968df;
    const color3 = 0xdf68da;
  
    const cubes = [
      makeInstance(geometry, color1,  -1),
      makeInstance(geometry, color2,  -0.9),
      makeInstance(geometry, color3,  -0.8),
      makeInstance(geometry, color1,  -0.7),
      makeInstance(geometry, color2,  -0.6),
      makeInstance(geometry, color3,  -0.5),
      makeInstance(geometry, color1,  -0.4),
      makeInstance(geometry, color2,  -0.3),
      makeInstance(geometry, color3,  -0.2),
      makeInstance(geometry, color1,  -0.1),
      makeInstance(geometry, color2,  0),
      makeInstance(geometry, color3,  0.1),
      makeInstance(geometry, color1,  0.2),
      makeInstance(geometry, color2,  0.3),
      makeInstance(geometry, color3,  0.4),
      makeInstance(geometry, color1,  0.5),
      makeInstance(geometry, color2,  0.6),
      makeInstance(geometry, color3,  0.7),
      makeInstance(geometry, color1,  0.8),
      makeInstance(geometry, color2,  0.9),
      makeInstance(geometry, color3,  1),
    ];
  
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width  = canvas.clientWidth  * pixelRatio | 0;
      const height = canvas.clientHeight * pixelRatio | 0;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  
    function render(time) {
      time *= 0.001;
  
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
  
      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .002;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
  }
  
  main();
  