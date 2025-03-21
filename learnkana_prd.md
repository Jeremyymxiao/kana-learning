# LearnKana 项目需求文档

## 1. 项目概述

### 1.1 项目目标
打造一个免费、开源的日语假名学习平台，帮助用户快速掌握日语假名（平假名和片假名）的读写。

### 1.2 目标用户
- 日语初学者
- 需要练习假名的学习者
- 需要日语文字转换工具的用户

### 1.3 核心价值
- 提供免费、高质量的日语假名学习资源
- 通过交互式工具提升学习效果
- 支持多种学习方式，满足不同用户需求

## 2. 功能需求

### 2.1 核心功能

#### 2.1.1 假名学习工具
- 交互式五十音图
  - 支持音频发音
  - 清音、浊音、拗音分类展示
  - 平假名和片假名切换

#### 2.1.2 测试系统
- 多种测试模式：
  - 单选题
  - 配对游戏
  - 听写测试
- 难度分级：
  - 简单（仅平假名）
  - 中等（平假名+片假名）
  - 困难（包含浊音和拗音）
- 成绩追踪和错题记录

#### 2.1.3 文字转换器
- 支持以下转换：
  - 汉字到平假名
  - 英文到日文
  - 罗马字到假名
  - 平假名到片假名互转

#### 2.1.4 AI 辅助学习
- AI 聊天助手
- 发音指导
- 写法练习辅助

### 2.2 用户系统
- 用户注册/登录
- 个人学习进度追踪
- 学习历史记录

## 3. 技术要求

### 3.1 前端技术栈
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn/ui

### 3.2 后端技术
- Next.js API Routes
- Prisma ORM
- PostgreSQL

### 3.3 第三方服务
- 有道翻译 API（英日转换）
- Kuroshiro（假名转换）

## 4. 非功能需求

### 4.1 性能要求
- 页面加载时间 < 3秒
- API响应时间 < 1秒

### 4.2 安全要求
- 用户密码加密存储
- JWT token 认证
- 防SQL注入
- CORS 安全配置

### 4.3 兼容性要求
- 支持主流浏览器
- 响应式设计，支持移动端访问
- 支持深色模式

## 5. 项目规划

### 5.1 已完成功能
- 基础用户系统
- 假名转换器
- 测试系统的三种模式
- AI 聊天功能

### 5.2 待开发功能
- 用户学习数据统计
- 学习进度追踪
- 社区互动功能
- 更多练习题型

## 6. 备注
- 项目域名：learnkana.pro
- 开源协议：待定
- 支持语言：中文、英文、日文