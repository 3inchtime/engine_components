# @thatopen/components 中文文档

> 基于 Three.js 的现代化 BIM 工具库完整指南

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![Version](https://img.shields.io/badge/version-2.4.11-green.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](#)

## 🚀 项目概述

Open BIM Components 是一个基于 [Three.js](https://github.com/mrdoob/three.js/) 构建的现代化 BIM 工具库，专为构建高性能的 3D BIM 应用程序而设计。它提供了完整的组件生态系统，从基础的 3D 渲染到复杂的 IFC 文件处理，为开发者提供了构建专业级 BIM 应用所需的一切工具。

### ✨ 核心特性

#### 🏗️ 架构设计
- **模块化组件系统**: 基于依赖注入的可扩展架构
- **TypeScript 原生支持**: 完整的类型定义和智能提示
- **跨平台兼容**: 同时支持浏览器和 Node.js 环境
- **内存安全**: 完善的生命周期管理和内存泄漏防护

#### 🏢 BIM 功能
- **IFC 文件支持**: 完整的 IFC 2x3/4 标准支持
- **Fragments 几何体系统**: 基于 GPU 实例化的高性能渲染
- **属性管理**: 完整的 IFC 属性和 Pset 管理
- **关系索引**: 智能的空间和逻辑关系索引
- **数据导出**: 灵活的 JSON/IFC 数据导出

#### 📐 测量工具
- **多维度测量**: 长度、角度、面积、体积测量
- **智能捕捉**: 顶点、边缘、面的智能识别
- **实时标注**: 动态的测量结果显示
- **工作平面**: 自定义测量平面支持

#### 🎨 可视化效果
- **高质量渲染**: 基于 Three.js 的现代渲染管线
- **后处理效果**: 阴影、环境光遮蔽、景深等效果
- **交互式高亮**: 智能的元素选择和高亮系统
- **标记系统**: 3D 场景中的标记和标签管理

#### 🛠️ 开发工具
- **丰富的工具类**: 几何计算、材质管理、UUID 生成等
- **事件系统**: 完整的组件间通信机制
- **调试支持**: 内置的性能监控和调试工具
- **示例丰富**: 40+ 完整的使用示例

### 🔧 技术栈

#### 核心依赖
- **Three.js** `^0.158.0` - 3D 渲染引擎
- **web-ifc** `^0.0.57` - IFC 文件解析
- **@thatopen/fragments** `^1.0.0` - 几何体片段管理
- **@thatopen/ui** `^1.0.0` - UI 组件库

#### 开发工具
- **TypeScript** `^5.0.0` - 类型安全的 JavaScript
- **Vite** `^4.0.0` - 现代化构建工具
- **ESLint** - 代码质量检查
- **Jest** - 单元测试框架

## 📦 项目架构

### 包结构概览

项目采用 **Monorepo** 架构，通过 Yarn Workspaces 管理多个相互关联的包：

```
@thatopen/components (工作空间根目录)
├── packages/
│   ├── core/                    # 核心包
│   │   ├── src/
│   │   │   ├── core/           # 核心组件
│   │   │   ├── fragments/      # 几何体管理
│   │   │   ├── ifc/           # IFC 处理
│   │   │   ├── measurement/    # 测量工具
│   │   │   └── utils/         # 工具类
│   │   └── package.json
│   └── front/                   # 前端包
│       ├── src/
│       │   ├── core/          # 前端核心
│       │   ├── fragments/     # 前端几何体
│       │   ├── measurement/   # 前端测量
│       │   ├── civil/         # 土木工程
│       │   └── utils/         # 前端工具
│       └── package.json
├── examples/                    # 示例代码
├── docs/                       # 文档
└── resources/                  # 资源文件
```

### 核心包详解

#### 🔧 @thatopen/components (核心包)

**设计理念**: 提供跨平台的 BIM 核心功能，同时支持浏览器和 Node.js 环境。

**主要模块**:

- **🏗️ 核心系统** (`core/`)
  - `Components` - 组件管理器
  - `Worlds` - 3D 世界管理
  - `SimpleScene` - 场景管理
  - `SimpleCamera` - 相机系统
  - `SimpleRenderer` - 渲染器

- **📁 IFC 处理** (`ifc/`)
  - `IfcLoader` - IFC 文件加载
  - `IfcPropertiesManager` - 属性管理
  - `IfcRelationsIndexer` - 关系索引
  - `IfcFinder` - 元素查找
  - `IfcJsonExporter` - 数据导出

- **🧩 几何体管理** (`fragments/`)
  - `FragmentsManager` - 几何体管理器
  - `Classifier` - 分类器
  - `Hider` - 隐藏/显示控制
  - `Exploder` - 爆炸视图

- **📏 测量工具** (`measurement/`)
  - `LengthMeasurement` - 长度测量
  - `AngleMeasurement` - 角度测量
  - `AreaMeasurement` - 面积测量
  - `VolumeMeasurement` - 体积测量

#### 🎨 @thatopen/components-front (前端包)

**设计理念**: 专为浏览器环境优化的前端交互组件，提供丰富的用户体验。

**主要模块**:

- **🖱️ 交互组件** (`core/`)
  - `Highlighter` - 高亮器
  - `ClipEdges` - 裁剪边缘
  - `PostproductionRenderer` - 后处理渲染
  - `OrthoPerspectiveCamera` - 正交/透视相机

- **🏷️ 标记系统** (`fragments/`)
  - `Marker` - 标记管理器
  - `Plans` - 平面图导航
  - `MiniMap` - 小地图

- **📐 高级测量** (`measurement/`)
  - `EdgeMeasurement` - 边缘测量
  - `FaceMeasurement` - 面测量
  - `MeasurementUtils` - 测量工具集

- **🏗️ 土木工程** (`civil/`)
  - `Civil3DNavigator` - 3D 导航
  - `CivilPlanNavigator` - 平面导航
  - `CivilElevationNavigator` - 立面导航
  - `CivilCrossSectionNavigator` - 横截面导航

### 核心模块分析

#### 核心包 (@thatopen/components) 模块结构

```
src/
├── core/           # 核心系统组件
├── fragments/       # 片段管理组件
├── ifc/            # IFC 文件处理组件
├── measurement/     # 测量工具基础
├── openbim/        # OpenBIM 标准支持
└── utils/          # 工具函数
```

##### 1. Core 模块
- **Components**: 组件系统的入口点，管理所有组件的生命周期
- **Worlds**: 3D 世界管理器，支持多世界场景
- **Clipper**: 几何体裁剪工具
- **Cullers**: 视锥体剔除优化
- **Grids**: 网格系统
- **Raycasters**: 射线投射工具
- **Viewpoints**: 视点管理

##### 2. Fragments 模块
- **FragmentsManager**: 片段管理器
- **Classifier**: 几何体分类器
- **Exploder**: 爆炸视图工具
- **Hider**: 几何体隐藏/显示控制
- **IfcLoader**: IFC 文件加载器
- **IfcGeometryTiler**: IFC 几何体分块处理

##### 3. IFC 模块
- **IfcFinder**: IFC 元素查找工具
- **IfcPropertiesManager**: IFC 属性管理器
- **IfcRelationsIndexer**: IFC 关系索引器
- **IfcJsonExporter**: IFC 到 JSON 导出器

#### 前端包 (@thatopen/components-front) 模块结构

```
src/
├── core/           # 前端核心组件
├── civil/          # 土木工程组件
├── fragments/      # 前端片段处理
├── measurement/    # 交互式测量工具
└── utils/          # 前端工具函数
```

##### 1. Core 模块
- **PostproductionRenderer**: 后期制作渲染器
- **Marker**: 3D 标记系统
- **ClipEdges**: 裁剪边缘处理
- **ShadowDropper**: 阴影投射工具

##### 2. Civil 模块
- **Civil3DNavigator**: 3D 土木导航器
- **CivilPlanNavigator**: 平面图导航器
- **CivilCrossSectionNavigator**: 横截面导航器
- **CivilElevationNavigator**: 立面导航器

##### 3. Measurement 模块
- **LengthMeasurement**: 长度测量
- **AngleMeasurement**: 角度测量
- **AreaMeasurement**: 面积测量
- **VolumeMeasurement**: 体积测量
- **EdgeMeasurement**: 边缘测量
- **FaceMeasurement**: 面测量

## 快速开始

## 📥 安装指南

### 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 或 **yarn**: >= 1.22.0 或 **pnpm**: >= 7.0.0
- **TypeScript**: >= 4.5.0 (推荐)
- **现代浏览器**: 支持 ES2020 和 WebGL 2.0

### 包管理器安装

#### 使用 npm

```bash
# 安装核心包
npm install @thatopen/components

# 安装前端包（浏览器环境）
npm install @thatopen/components-front

# 安装相关依赖
npm install three @types/three web-ifc
```

#### 使用 yarn

```bash
# 安装核心包
yarn add @thatopen/components

# 安装前端包（浏览器环境）
yarn add @thatopen/components-front

# 安装相关依赖
yarn add three @types/three web-ifc
```

#### 使用 pnpm

```bash
# 安装核心包
pnpm add @thatopen/components

# 安装前端包（浏览器环境）
pnpm add @thatopen/components-front

# 安装相关依赖
pnpm add three @types/three web-ifc
```

### CDN 引入

对于快速原型开发，您也可以通过 CDN 直接引入：

```html
<!-- 引入 Three.js -->
<script src="https://unpkg.com/three@0.158.0/build/three.min.js"></script>

<!-- 引入 web-ifc -->
<script src="https://unpkg.com/web-ifc@0.0.57/web-ifc-api.js"></script>

<!-- 引入 @thatopen/components -->
<script src="https://unpkg.com/@thatopen/components@latest/dist/index.js"></script>
<script src="https://unpkg.com/@thatopen/components-front@latest/dist/index.js"></script>
```

### 开发环境配置

#### Vite 配置

如果您使用 Vite 作为构建工具，建议添加以下配置：

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@thatopen/components', '@thatopen/components-front']
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
});
```

#### TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["three", "web-ifc"]
  }
}
```

### 基础使用示例

```typescript
import * as THREE from "three";
import * as OBC from "@thatopen/components";

// 获取容器元素
const container = document.getElementById("container")!;

// 创建组件系统
const components = new OBC.Components();

// 获取世界管理器
const worlds = components.get(OBC.Worlds);

// 创建一个新的世界
const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();

// 设置场景、渲染器和相机
world.scene = new OBC.SimpleScene(components);
world.renderer = new OBC.SimpleRenderer(components, container);
world.camera = new OBC.SimpleCamera(components);

// 初始化组件系统
components.init();

// 创建一个简单的立方体
const material = new THREE.MeshLambertMaterial({ color: "#6528D7" });
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, material);
world.scene.three.add(cube);

// 设置场景
world.scene.setup();

// 设置相机位置
world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);
```

## 🚀 快速开始

### 第一个 BIM 应用

让我们创建一个简单但功能完整的 BIM 查看器：

#### 1. 基础设置

```typescript
import * as OBC from "@thatopen/components";
import * as OBF from "@thatopen/components-front";
import * as THREE from "three";

// 创建组件管理器
const components = new OBC.Components();

// 获取容器元素
const container = document.getElementById("container") as HTMLDivElement;

// 创建世界管理器
const worlds = components.get(OBC.Worlds);

// 创建 3D 世界
const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();

// 配置场景
world.scene = new OBC.SimpleScene(components);
world.scene.setup();

// 配置渲染器
world.renderer = new OBC.SimpleRenderer(components, container);
world.renderer.postproduction.enabled = true;

// 配置相机
world.camera = new OBC.SimpleCamera(components);
world.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);

// 初始化组件系统
components.init();
```

#### 2. 添加基础几何体

```typescript
// 创建网格
const createMesh = (geometry: THREE.BufferGeometry, color: number) => {
  const material = new THREE.MeshLambertMaterial({ color });
  return new THREE.Mesh(geometry, material);
};

// 添加立方体
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cube = createMesh(cubeGeometry, 0x6528D7);
cube.position.set(-2, 1, 0);
world.scene.three.add(cube);

// 添加球体
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphere = createMesh(sphereGeometry, 0xDC2626);
sphere.position.set(2, 1, 0);
world.scene.three.add(sphere);

// 添加地面
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const plane = createMesh(planeGeometry, 0x84CC16);
plane.rotation.x = -Math.PI / 2;
world.scene.three.add(plane);
```

#### 3. 添加光照

```typescript
// 环境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
world.scene.three.add(ambientLight);

// 方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
world.scene.three.add(directionalLight);
```

#### 4. 启用交互功能

```typescript
// 启用高亮器
const highlighter = new OBF.Highlighter(components);
highlighter.config.world = world;
highlighter.config.selectEnabled = true;
highlighter.config.hoverEnabled = true;
await highlighter.setup();

// 监听选择事件
highlighter.events.select.onHighlight.add((fragmentIdMap) => {
  console.log("选中的对象:", fragmentIdMap);
});

// 启用射线投射
const raycasters = components.get(OBC.Raycasters);
raycasters.get(world);
```

#### 5. 加载 IFC 文件

```typescript
// 获取 IFC 加载器
const ifcLoader = components.get(OBC.IfcLoader);
const fragmentsManager = components.get(OBC.FragmentsManager);

// 配置 IFC 加载器
await ifcLoader.setup({
  autoSetWasm: true,
  coordinate: true,
  optimize: true
});

// 加载 IFC 文件
const loadIFC = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const model = await ifcLoader.load(buffer);
  
  console.log(`模型加载完成: ${model.name}`);
  console.log(`包含 ${model.items.size} 个几何体`);
  
  // 将模型添加到场景
  world.scene.three.add(model);
  
  // 调整相机视角
  world.camera.controls.fitToSphere(model, true);
};

// 文件输入处理
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.ifc';
fileInput.onchange = (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) loadIFC(file);
};
```

#### 6. 添加测量工具

```typescript
// 长度测量
const lengthMeasurement = new OBF.LengthMeasurement(components);
lengthMeasurement.world = world;
lengthMeasurement.enabled = true;
lengthMeasurement.snapDistance = 0.25;

// 角度测量
const angleMeasurement = new OBF.AngleMeasurement(components);
angleMeasurement.world = world;
angleMeasurement.enabled = false; // 默认禁用

// 切换测量模式
const toggleMeasurement = (type: 'length' | 'angle') => {
  lengthMeasurement.enabled = type === 'length';
  angleMeasurement.enabled = type === 'angle';
};
```

### 完整的 HTML 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIM 查看器</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: #f0f0f0;
    }
    
    #container {
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    
    .toolbar {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.9);
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .toolbar button {
      margin: 0 5px;
      padding: 8px 16px;
      border: none;
      border-radius: 3px;
      background: #007bff;
      color: white;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .toolbar button:hover {
      background: #0056b3;
    }
    
    .toolbar button.active {
      background: #28a745;
    }
  </style>
</head>
<body>
  <div id="container"></div>
  
  <div class="toolbar">
    <input type="file" id="fileInput" accept=".ifc" style="display: none;">
    <button onclick="document.getElementById('fileInput').click()">
      📁 加载 IFC
    </button>
    <button id="lengthBtn" class="active" onclick="toggleMeasurement('length')">
      📏 长度测量
    </button>
    <button id="angleBtn" onclick="toggleMeasurement('angle')">
      📐 角度测量
    </button>
    <button onclick="clearMeasurements()">
      🗑️ 清除测量
    </button>
  </div>
  
  <script type="module">
    // 在这里添加上面的 TypeScript 代码
    // 注意：实际项目中建议使用构建工具
  </script>
</body>
</html>
```

## 📚 下一步学习

现在您已经创建了第一个功能完整的 BIM 应用，可以继续深入学习：

### 🎯 推荐学习路径

#### 初学者路径
1. **[核心组件详解](./02-核心组件详解.md)** - 深入理解组件系统架构
2. **[IFC 文件处理](./03-IFC文件处理系统.md)** - 掌握 BIM 数据处理核心技能
3. **[测量工具系统](./04-测量工具系统.md)** - 学习添加专业测量功能

#### 进阶开发者路径
1. **[前端组件系统](./05-前端组件系统.md)** - 构建丰富的用户交互体验
2. **[工具类与最佳实践](./06-工具类与最佳实践.md)** - 性能优化和架构设计

### 🛠️ 实践项目建议

- **BIM 模型查看器**: 支持多种 IFC 文件格式
- **建筑测量工具**: 集成多种测量功能的专业工具
- **施工进度管理**: 结合时间轴的 4D BIM 应用
- **设施管理系统**: 基于 BIM 的设施运维平台

### 🌟 社区资源

- **官方示例**: [在线演示](https://thatopen.github.io/engine_components/)
- **GitHub 仓库**: [源代码](https://github.com/ThatOpen/engine_components)
- **API 文档**: [完整 API 参考](https://docs.thatopen.com/)
- **社区讨论**: [GitHub Discussions](https://github.com/ThatOpen/engine_components/discussions)

---

> 📝 **注意**: 本文档基于 Open BIM Components v2.4.11 版本编写。项目正在积极开发中，部分 API 可能会在未来版本中发生变化。