# 数据管理系统 (Data Management System)

一个现代化的企业数据管理平台，采用前后端分离架构，提供部门信息的完整管理功能。

## 项目架构

### 前端技术栈
- **核心框架**：React 18 + TypeScript
- **UI组件库**：Ant Design 5.x
- **数据可视化**：Ant Design Charts
- **构建工具**：React Scripts (Create React App)

### 后端技术栈
- **核心框架**：Spring Boot 2.7
- **数据持久层**：Spring Data JPA
- **数据库**：H2 内存数据库
- **API风格**：RESTful API

## 功能特性

### 部门管理模块 (v1.0.0)
- ✅ **查看部门列表**：表格化展示所有部门信息
- ✅ **创建新部门**：通过模态框添加部门信息
- ✅ **编辑部门信息**：修改现有部门的名称、代码和描述
- 🔄 **删除部门**：（计划中功能）

### 系统特性
- **响应式设计**：适配不同屏幕尺寸
- **表单验证**：确保数据输入的准确性
- **即时反馈**：操作结果通过消息提示
- **零配置数据库**：内嵌H2数据库，无需额外安装
- **开发友好**：支持热重载，提高开发效率

## 环境要求

- **Java**：JDK 8+ (OpenJDK 1.8.0_462 或更高)
- **Maven**：3.9.11+ (已配置在/Users/ouyangshourui/maven/apache-maven-3.9.11)
- **Node.js**：16+ (推荐使用 LTS 版本)
- **NPM**：8+ (随 Node.js 一起安装)

## 项目结构

```
data-manage/
├── src/                      # 后端源代码
│   ├── main/
│   │   ├── java/            # Java 源代码
│   │   │   └── com/example/ # 主包
│   │   │       ├── controller/  # REST API 控制器
│   │   │       ├── model/       # 数据模型
│   │   │       ├── repository/  # 数据访问层
│   │   │       └── config/      # 配置类
│   │   └── resources/       # 配置文件
│   │       └── application.properties  # 应用配置
├── frontend/                # 前端项目
│   ├── public/              # 静态资源
│   ├── src/                 # React 源代码
│   │   ├── App.tsx          # 主应用组件
│   │   └── index.tsx        # 应用入口
│   └── package.json         # 前端依赖配置
└── pom.xml                  # Maven 项目配置
```

## 快速开始

### 1. 启动后端服务

```bash
cd data-manage
/Users/ouyangshourui/maven/apache-maven-3.9.11/bin/mvn spring-boot:run
```

### 2. 启动前端服务

首次运行需要安装依赖：

```bash
cd data-manage/frontend
npm install
npm install react-scripts
npm install antd @ant-design/charts
```

启动开发服务器：

```bash
npm start  # 启动开发服务器
```

## 访问地址

- **前端界面**：http://localhost:3000
- **后端 API**：http://localhost:8080/api/departments
- **H2 数据库控制台**：http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - 用户名: `sa`
  - 密码: (留空)

## API 接口说明

### 部门管理 API

| 方法   | 路径                      | 描述         | 请求体示例                                      |
|------|-------------------------|------------|---------------------------------------------|
| GET  | /api/departments        | 获取所有部门     | -                                           |
| GET  | /api/departments/{id}   | 获取单个部门     | -                                           |
| POST | /api/departments        | 创建新部门      | `{"name":"财务部","code":"FIN","description":"负责公司财务管理"}` |
| PUT  | /api/departments/{id}   | 更新部门信息     | `{"name":"财务部","code":"FIN","description":"更新后的描述"}` |

## 初始化数据

应用启动时会自动创建以下测试部门：

1. 技术部 (TECH)
2. 市场部 (MKT)
3. 人事部 (HR)

## 故障排除

### 后端问题

1. **端口冲突**：
   - 修改 `application.properties` 中的 `server.port` 属性

2. **数据库连接问题**：
   - 确认 H2 控制台是否启用 (`spring.h2.console.enabled=true`)
   - 检查 JDBC URL 是否正确

### 前端问题

1. **模块未找到错误**：
   ```bash
   npm install react-scripts --save
   ```

2. **API 连接失败**：
   - 确认后端服务是否正常运行
   - 检查 `package.json` 中的 `proxy` 配置是否正确指向后端服务

3. **无法访问 localhost:3000**：
   - 检查服务是否启动成功
   - 尝试更换端口：
     ```bash
     npm run dev -- --port 3001
     ```

4. **依赖安装失败**：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 注意事项

1. H2 是内存数据库，应用重启后数据会丢失
2. 开发时建议同时启动前后端服务
3. 前端使用了 React 18 的新特性，确保 Node.js 版本兼容

## 未来计划
- [ ] 添加部门删除功能
- [ ] 实现员工管理模块
- [ ] 添加数据导入/导出功能
- [ ] 集成用户认证与授权
- [ ] 支持数据持久化存储

## 贡献指南

欢迎提交 Pull Request 或提出 Issue 来改进这个项目。
