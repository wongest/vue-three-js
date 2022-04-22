<template>
  <div class="home"></div>
</template>

<script lang="ts">
import * as THREE from "three";
export default {
  setup() {
    document.title = "柱形";

    let camera, scene, renderer;
    let mesh;

    const init = () => {
      const ASPECT_RATIO = window.innerWidth / window.innerHeight; // 宽高比

      scene = new THREE.Scene();

      scene.add(new THREE.AmbientLight(0x222244));

      const light = new THREE.DirectionalLight();
      light.position.set(0.5, 0.5, 1);
      light.castShadow = true;
      light.shadow.camera.zoom = 4; // tighter shadow map
      scene.add(light);

      const geometryBackground = new THREE.PlaneGeometry(100, 100);
      const materialBackground = new THREE.MeshPhongMaterial({
        color: 0x000066,
      });

      const background = new THREE.Mesh(geometryBackground, materialBackground);
      background.receiveShadow = true;
      background.position.set(0, 0, -1);
      scene.add(background);

      const geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
      const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 });

      mesh = new THREE.Mesh(geometryCylinder, materialCylinder);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 0.1, 10);
      camera.position.multiplyScalar(2);
      camera.lookAt(scene.position);
      camera.updateMatrixWorld();

      camera.position.z = 3.5;

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      document.body.appendChild(renderer.domElement);

      //

      window.addEventListener("resize", onWindowResize);
    };

    function onWindowResize() {
      const ASPECT_RATIO = window.innerWidth / window.innerHeight;
      camera.aspect = ASPECT_RATIO;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      mesh.rotation.x += 0.005;
      mesh.rotation.z += 0.01;

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }

    init();
    animate();

    return {};
  },
};
</script>
