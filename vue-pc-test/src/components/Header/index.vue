<template>
  <div class="header-content">
    <div class="task-title">任务列表</div>
    <div v-for="(item, index) in menu" :key="item.name" class="menu-item" @click="handleClick(index, item.path)">
      <div :class="{ active: index === currentIndex }" class="text">{{ item.meta.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()
const menu = router.getRoutes()

const currentIndex = ref(0)

const handleClick = (index: number, path: string) => {
  currentIndex.value = index;
  router.push(path)
}
</script>

<style scoped>
.header-content {
  position: relative;
  height: 60px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  box-sizing: border-box;
}
.task-title {
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.text {
  line-height: 45px;
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer;
}
.active {
  color: #36d7b7;
  font-weight: bold;
  border-bottom: 2px solid #36d7b7;
}
</style>