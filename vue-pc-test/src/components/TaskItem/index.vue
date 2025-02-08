<template>
  <div class="card-content">
    <div class="status-section">
      <el-checkbox v-model="taskItem.status" @change="updateTaskStatus"/>
    </div>
    <div class="info-section">
      <h3 class="title" :class="{ 'completed': taskItem.status }">
        {{ taskItem.title }}
      </h3>
      <p v-if="taskItem.description" class="description">{{ taskItem.description }}</p>
      <div class="meta-section">
        <span class="status-badge" :class="taskItem.status ? 'completed' : 'pending'">
          {{ taskItem.status ? '完成' : '未完成' }}
        </span>
        <span class="create-time">{{ formatTimeAgo(new Date(taskItem.createTime)) }}</span>
      </div>
    </div>
    <el-button class="delete-btn" @click="deleteTask(taskItem.id)">×</el-button>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { TaskItemType } from './type';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { ElMessage, ElMessageBox } from "element-plus";

defineProps({
  taskItem: {
    type: Object as PropType<TaskItemType>,
    default: () => {}
  }
})

const emits = defineEmits(["deleteTask"]);

const updateTaskStatus = (status: boolean) => {
  const statusText = status ? '完成' : '未完成';
  ElMessage({
    message: `标记为${statusText}`,
    type: 'success'
  })
}

const deleteTask = (id: string) => {
  ElMessageBox.confirm(
      '是否确认删除',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    emits('deleteTask', id);
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
}
</script>

<style scoped>
.card-content {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.info-section {
  flex: 1;
}
.title {
  margin: 0 0 8px;
  font-size: 18px;
  color: #333;
}

.title.completed {
  text-decoration: line-through;
  color: #999;
}

.description {
  margin: 0 0 8px;
  color: #666;
  font-size: 14px;
}
.meta-section {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
  font-size: 14px;
  color: #888;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
}

.status-badge.pending {
  background: #ffeeba;
  color: #856404;
}

.status-badge.completed {
  background: #36d7b7;
  color: #155724;
}
.delete-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
}

.delete-btn:hover {
  color: #ff4444;
}

</style>