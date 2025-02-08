<template>
  <div class="container">
    <div class="toolbar">
      <!--  筛选器  -->
      <div class="filter">
        <el-select
            v-model="filterValue"
            placeholder="全部"
            style="width: 200px"
            @change="handleFilterChange"
        >
          <el-option label="全部" value="all"></el-option>
          <el-option label="未完成" value="0"></el-option>
          <el-option label="已完成" value="1"></el-option>
        </el-select>
      </div>
      <!--  添加任务按钮  -->
      <div class="add-task-btn">
        <el-button type="primary" @click="handleAddTask">添加任务</el-button>
      </div>
    </div>
    <!--  空状态  -->
    <div v-if="taskList.length === 0" class="empty-state">
      <el-empty description="暂无数据！" />
    </div>

    <!--  任务列表  -->
    <div v-else class="task-list">
      <transition-group name="task-list">
        <div v-for="task in taskList" :key="task.id" class="task-card">
          <TaskItem :taskItem="task" @deleteTask="handleDeleteTask" @dblclick="handleDblclick(task)"/>
        </div>
      </transition-group>
    </div>


    <el-dialog
        v-model="dialogVisible"
        :title="dialogTitle + '任务'"
        width="500"
    >
      <TaskForm :taskForm="taskForm" @confirmForm="handleConfirmForm" @cancelForm="handleCancelForm"/>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type {TaskItemType} from '@/components/TaskItem/type';
import TaskItem from '@/components/TaskItem/index.vue';
import TaskForm from '@/components/TaskForm/index.vue';
import { ElMessage } from "element-plus";
import { useTaskListStore } from '@/store/task';

const taskList = ref<TaskItemType[]>([]);
const taskListStore = useTaskListStore();
const dialogVisible = ref(false);
const dialogTitle = ref('添加');
const taskForm = ref<TaskItemType>({
  id: '',
  title: '',
  description: '',
  status: 0,
  createTime: '',
});
const filterValue = ref('all');

watch(
    () => taskListStore.taskList,
    (newVal: TaskItemType[]) => {
      taskList.value = newVal;
    },
    { immediate: true, deep: true }
)

const taskState = localStorage.getItem('taskStatus') || 'all';

watch(
    () => taskState,
    (newVal: string) => {
      console.log('执行', newVal);
      localStorage.setItem('taskStatus', newVal);
      filterValue.value = newVal;
      taskList.value = taskListStore.filterTask(newVal);
    },
    { immediate: true, deep: true }
)

const handleAddTask = () => {
  dialogTitle.value = '添加';
  dialogVisible.value = true;
  taskForm.value = {} as TaskItemType;
}

const handleDeleteTask = (id: string) => {
  taskListStore.deleteTask(id);
}

const handleDblclick = (task: TaskItemType) => {
  if (task.status) {
    ElMessage.warning('该任务已完成，无法编辑！')
    return;
  }
  dialogVisible.value = true;
  dialogTitle.value = '编辑';
  taskForm.value = { ...task }
}

const handleConfirmForm = (value: TaskItemType) => {
  if (dialogTitle.value === '添加') {
    taskListStore.addTask(value);
    ElMessage({
      type: 'success',
      message: '添加成功！',
    })
  } else {
    taskListStore.updateTask(value);
    ElMessage({
      type: 'success',
      message: '修改成功！',
    })
  }
  dialogVisible.value = false;
}

const handleCancelForm = () => {
  dialogVisible.value = false;
}

function handleFilterChange(value: string) {
  localStorage.setItem('taskStatus', value);
  taskList.value = taskListStore.filterTask(value);
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 12px;
  height: calc(100vh - 60px - 64px);
}
.empty-state {
  text-align: center;
  padding: 12px 0;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.add-task-btn {
  margin-bottom: 12px;
}
.task-list {
  height: 90%;
  padding: 16px 12px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: #ffffff;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #eee;
  border-radius: 6px;
  border: 2px solid #f1f1f1;
}
.task-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>