import type { TaskItemType } from "@/components/TaskItem/type.ts";

export const TASK_LIST: TaskItemType[] =[
    {
        id: '1',
        title: '完成项目报告',
        description: '编写并提交项目进度报告，包括数据分析和结论',
        status: 0,
        createTime: '2025-02-08'
    },
    {
        id: '2',
        title: '设计新界面',
        description: '根据用户反馈，重新设计用户界面以提高用户体验',
        status: 1,
        createTime: '2025-01-31',
    },
    {
        id: '3',
        title: '修复登录bug',
        description: '排查并修复用户登录时遇到的错误',
        status: 1,
        createTime: '2025-02-08 14:00:00'
    },
    {
        id: '4',
        title: '编写单元测试',
        description: '为新功能编写单元测试，确保代码质量',
        status: 1,
        createTime: '2025-02-08 14:18:50'
    },
    {
        id: '5',
        title: '集成第三方API',
        description: '将新的第三方API集成到现有系统中',
        status: 0,
        createTime: '2023-09-25'
    }
]
