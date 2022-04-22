<template>
  <div class="home"></div>
</template>

<script lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  setup() {
    document.title = '方形';
    /**
     * 创建场景对象Scene
     */
    const scene = new THREE.Scene();
    
  },
};
</script>
