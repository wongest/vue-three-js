<!-- https://juejin.cn/post/7263846857407103032?searchId=202310231131417E21701E891DE124C3DC -->
<template>
  <div class="App" />
</template>

<script lang="ts">
import { ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  name: 'base1',
  setup() {
    // 1. 创建渲染器,指定渲染的分辨率和尺寸,然后添加到body中
    const renderer = new THREE.WebGLRenderer({ antialias: true });  // 抗锯齿
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
    // MeshBasicMaterial 基本材质 不受灯光影响
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // 物体：几何形状和材质
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime(); // 返回已经过去的时间, 以秒为单位
      cube['rotation'].y = elapsedTime * Math.PI; // 两秒自转一圈

      renderer.render(scene, camera);


    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    animate();




  }
};
</script>

<style lang="scss" scoped></style>