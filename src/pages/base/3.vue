<!-- https://juejin.cn/post/7263846857407103032?searchId=202310231131417E21701E891DE124C3DC -->
<!-- 纹理 -->
<template>
  <div class="App" />
</template>

<script lang="ts">
import { ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import floor from "../../img/Stylized_Stone_Floor_005_basecolor.jpg"
import wall from "../../img/Gravel_001_BaseColor.jpg"
export default {
  name: 'base3',
  setup() {
    // 1. 创建渲染器,指定渲染的分辨率和尺寸,然后添加到body中
    const renderer = new THREE.WebGLRenderer({ antialias: true });  // 抗锯齿
    // 初始化纹理加载器
    const textloader = new THREE.TextureLoader();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.append(renderer.domElement);

    // 2. 创建场景
    const scene = new THREE.Scene();

    // 3. 创建相机
    // PerspectiveCamera 透视相机，相当于人眼
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // 4. 创建物体
    // AxesHelper 辅助线
    const axis = new THREE.AxesHelper(5);
    scene.add(axis);

    // 5. 移动相机
    camera['position'].set(5, 5, 10);
    camera.lookAt(0, 0, 0);

    // 添加立方体
    // 立方体几何体 width, height, depth 宽、高、深
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    // MeshStandardMaterial 受灯光影响的材质
    const material = new THREE.MeshStandardMaterial({ map: textloader.load(wall) });
    // 物体：几何形状和材质
    const cube = new THREE.Mesh(geometry, material as any);
    scene.add(cube);

    // 环境光
    const ambientLight = new THREE.AmbientLight('#fff', 0.4);
    scene.add(ambientLight);

    // 直束光
    const directionalLight = new THREE.DirectionalLight('#fff', 1);
    directionalLight['position'].set(0, 20, 0);
    directionalLight.target['position'].set(10, -20, 10);
    scene.add(directionalLight);

    // =====================================================
    // 阴影
    // 1. 渲染器能够渲染阴影效果
    renderer['shadowMap'].enabled = true;
    // 2. 该方向会投射阴影效果
    directionalLight.castShadow = true;
    // 3. 
    cube.castShadow = true;

    // 4. 
    // PlaneGeometry 平面几何体
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({ map: textloader.load(floor) });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial as any);
    planeMesh['rotation'].x = -0.5 * Math.PI;
    planeMesh['position'].set(0, -10, 0);
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    // 5. 方向光的辅助线
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight
    );
    scene.add(directionalLightHelper); // 辅助线


    // =====================================================================

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    animate();




  }
};
</script>

<style lang="scss" scoped></style>