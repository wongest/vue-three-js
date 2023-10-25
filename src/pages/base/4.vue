<!-- https://juejin.cn/post/7264397109498839077 -->
<!-- 光源 -->
<template>
  <div class="control-box">
    <div class="control-item">
      <span class="label">环境光</span>
      <el-switch class="value" v-model="lightOpen" size="large" />
    </div>
    <div class="control-item">
      <span class="label">光强度</span>
      <el-slider class="value" v-model="intensity" />
    </div>

  </div>
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
    const intensity = ref(100);
    const lightOpen = ref(true);

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
    // scene.add(cube);

    // 环境光
    const ambientLight = new THREE.AmbientLight('#fff', intensity.value / 100);
    scene.add(ambientLight);

    const rectLight = new THREE.RectAreaLight(0xffffff, 4, 4, 4);
    rectLight['position'].set(0, 2, 0);
    rectLight.lookAt(0, 0, 0);
    scene.add(rectLight);


    // =====================================================
    // 阴影
    // 1. 渲染器能够渲染阴影效果
    renderer['shadowMap'].enabled = true;
    // 2. 该方向会投射阴影效果
    // directionalLight.castShadow = true;
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

    // =====================================================================

    function animate() {
      requestAnimationFrame(animate);
      ambientLight.intensity = intensity.value / 100;
      ambientLight.visible = lightOpen.value;
      renderer.render(scene, camera);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    animate();

    return {
      intensity,
      lightOpen,
    }


  }
};
</script>

<style lang="scss" scoped>
.control-box {
  width: 300px;
  position: absolute;
  right: 0;
  padding: 30px 15px;

  .control-item {
    display: flex;
    align-items: center;

    .label {
      flex: 0.3;
      white-space: nowrap;
    }

    .value {
      flex: 0.7;
    }
  }
}
</style>