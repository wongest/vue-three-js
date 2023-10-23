<template>
  <div class="App">
    about页面
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex' // 引入useStore 方法
export default {
  name: 'About',
  setup() {
    const num = ref<number>(1);
    const store = useStore()  // 该方法用于返回store 实例
    const add =  () => {
      num.value ++
    }
    return {
      store,
      num,
      add,
    }
  }
};
</script>

<style lang="scss" scoped>
.App {
  color: pink;
}
</style>