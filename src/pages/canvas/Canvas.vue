<template>
  <div class="page">
    <canvas id="myCanvas" width="600" height="600"
      >你的浏览器不支持canvas!</canvas
    >
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  watch,
  computed,
} from "vue";
export default {
  setup() {
    document.title = "canvas";
    let canvas;
    let ctx: CanvasRenderingContext2D;
    const init = () => {
      canvas = document.getElementById("myCanvas");
      if (canvas?.getContext) {
        ctx = canvas.getContext("2d");
      }
    };

    const writeLine = () => {
      ctx.beginPath(); // 开始路径绘制
      ctx.moveTo(20, 20); // 设置路径起点，坐标为(20,20)
      ctx.lineTo(200, 20); // 绘制一条到(200,20)的直线
      ctx.lineWidth = 1.0; // 设置线宽
      ctx.strokeStyle = "#CC0000"; // 设置线的颜色
      ctx.stroke(); // 进行线的着色，这时整条线才变得可见
    };

    onMounted(() => {
      init();
      writeLine()
    });

    // const ctx = canvas.getContext('2d');
    return {};
  },
};
</script>
