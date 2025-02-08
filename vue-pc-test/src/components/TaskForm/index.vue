<template>
  <el-form
      ref="taskFormRef"
      style="max-width: 600px"
      :model="taskEmptyForm"
      status-icon
      label-width="auto"
  >
    <el-form-item label="标题" prop="title" :rules="[
        { required: true, message: '标题不能为空', trigger: 'blur' },
        { type: 'string', min: 3, max: 15, message: '标题长度在 3 到 15 个字符', trigger: 'change' }
      ]">
      <el-input v-model="taskEmptyForm.title" @input="handleInput"/>
    </el-form-item>
    <el-form-item label="描述" prop="checkPass">
      <el-input v-model="taskEmptyForm.description" type="textarea" />
    </el-form-item>
    <el-form-item class="form-btns">
      <el-button @click="cancelForm">取消</el-button>
      <el-button :disabled="isDisabled" type="primary" @click="confirmForm(taskFormRef)">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { TaskItemType } from "@/components/TaskItem/type";
import type { FormInstance } from 'element-plus';
import { nanoid } from "nanoid";
import dayjs from "dayjs";

const props = defineProps({
  taskForm: {
    type: Object as PropType<TaskItemType>,
    default: () => {}
  }
})

const emits = defineEmits(["confirmForm", "cancelForm"]);
const taskFormRef = ref<FormInstance>()
const taskEmptyForm = ref<TaskItemType>({
  id: '',
  title: '',
  description: '',
  status: 0,
  createTime: ''
})
const isDisabled = ref(true);

watch(
    () => props.taskForm,
    (newVal) => {
      taskEmptyForm.value = { ...newVal }
    },
    { deep: true, immediate: true }
)
const handleInput = () => {
  taskFormRef.value?.validateField('title', valid => {
    isDisabled.value = !valid
  })
}
const confirmForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const newTaskForm = {
        id: taskEmptyForm.value.id || nanoid(5),
        title: taskEmptyForm.value.title,
        description: taskEmptyForm.value.description,
        status: taskEmptyForm.value.status || 0,
        createTime: taskEmptyForm.value.createTime || dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      emits("confirmForm", newTaskForm);
    }
  })
}

const cancelForm = () => {
  taskEmptyForm.value = {} as TaskItemType;
  emits("cancelForm");
}
</script>

<style scoped>
:deep(.form-btns) {
  .el-form-item__content {
    justify-content: flex-end
  }
}
</style>