import { defineStore } from 'pinia'
import { ref, onMounted, watch } from 'vue'
import type { TaskItemType } from "@/components/TaskItem/type.ts";

export const useTaskListStore = defineStore('taskList', () => {
    const taskList = ref<TaskItemType[]>([]);

    // 初始化时从 localStorage 加载数据
    onMounted(() => {
        const tasks = localStorage.getItem('taskList');
        if (tasks) {
            taskList.value = JSON.parse(tasks);
        }
    });

    // 监听 taskList 变化，更新 localStorage
    watch(taskList, (newVal) => {
        localStorage.setItem('taskList', JSON.stringify(newVal));
    }, { deep: true });

    // 添加任务
    const addTask = (item: TaskItemType) => {
        item.status = item.status !== 0;
        taskList.value.unshift(item)
    }

    // 删除任务
    const deleteTask = (id: string) => {
        const index = taskList.value.findIndex(taskItem => taskItem.id === id)
        if (index !== -1) {
            taskList.value.splice(index, 1)
        }
    }

    // 更新任务
    const updateTask = (item: TaskItemType) => {
        item.status = item.status !== 0;
        const index = taskList.value.findIndex(taskItem => taskItem.id === item.id)
        if (index !== -1) {
            taskList.value.splice(index, 1)
            taskList.value.unshift(item)
        }
    }

    // 筛选
    const filterTask = (value: string) => {
        if (value === 'all') {
            return taskList.value
        } else {
            const status = value !== '0';
            return taskList.value.filter(taskItem => taskItem.status === status)
        }
    }

    return {
        taskList,
        addTask,
        deleteTask,
        updateTask,
        filterTask
    }
})