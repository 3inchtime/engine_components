# IFC 文件处理系统

本章将详细介绍 Open BIM Components 的 IFC 文件处理能力，包括文件加载、几何体转换、属性管理、关系索引等核心功能。

## 1. IFC 处理概述

### 1.1 什么是 IFC？

IFC (Industry Foundation Classes) 是建筑信息模型 (BIM) 数据交换的国际标准格式。它允许不同软件之间自由交换建筑数据，而不依赖于特定厂商的专有格式。

### 1.2 Fragments 几何体系统

在 Open BIM Components 中，IFC 文件被转换为 **Fragments** - 一种基于 Three.js `InstancedMesh` 的轻量级几何体表示：

- **高性能**: 基于 GPU 实例化渲染
- **内存优化**: 共享几何体和材质
- **BIM 友好**: 保留 IFC 元素的语义信息
- **可扩展**: 支持大型建筑模型

### 1.3 核心组件架构

```
IFC 处理系统
├── IfcLoader           # IFC 文件加载和转换
├── FragmentsManager    # Fragments 几何体管理
├── IfcPropertiesManager # IFC 属性和 Pset 管理
├── IfcRelationsIndexer # IFC 关系索引
├── IfcFinder          # IFC 元素查找
└── IfcJsonExporter    # IFC 数据导出
```

## 2. IFC 文件加载 (IfcLoader)

### 2.1 IfcLoader 组件

`IfcLoader` 是 IFC 文件处理的核心组件，负责将 IFC 文件转换为 Fragments 几何体。

#### 核心特性

- **Web-IFC 集成**: 基于 web-ifc 库进行 IFC 解析
- **流式加载**: 支持大文件的分块加载
- **类别过滤**: 可选择性加载特定 IFC 类别
- **几何体优化**: 自动合并和优化几何体
- **空间结构**: 保留 IFC 空间层次结构

#### 基础使用

```typescript
import * as OBC from "@thatopen/components";
import * as WEBIFC from "web-ifc";

// 获取组件
const components = new OBC.Components();
const fragments = components.get(OBC.FragmentsManager);
const ifcLoader = components.get(OBC.IfcLoader);

// 配置加载器
await ifcLoader.setup({
  autoSetWasm: true,  // 自动设置 WASM 路径
  coordinate: true,   // 启用坐标转换
  optimize: true      // 启用几何体优化
});

// 加载 IFC 文件
const file = await fetch("path/to/model.ifc");
const buffer = await file.arrayBuffer();
const model = await ifcLoader.load(buffer);

console.log(`加载完成: ${model.name}`);
console.log(`包含 ${model.items.size} 个几何体`);
```

### 2.2 加载配置选项

#### IfcFragmentSettings 配置

```typescript
interface IfcFragmentSettings {
  // WASM 设置
  autoSetWasm: boolean;           // 自动设置 WASM 路径
  wasm: {
    path: string;                 // WASM 文件路径
    absolute: boolean;            // 是否为绝对路径
  };
  
  // 几何体设置
  coordinate: boolean;            // 坐标转换
  optimize: boolean;              // 几何体优化
  
  // 过滤设置
  excludedCategories: Set<number>; // 排除的 IFC 类别
  includeProperties: boolean;      // 是否包含属性
  
  // 性能设置
  streamSettings: {
    baseUrl: string;              // 流式加载基础 URL
    ids: Uint32Array;            // 要加载的元素 ID
  };
}
```

#### 配置示例

```typescript
// 基础配置
await ifcLoader.setup({
  autoSetWasm: true,
  coordinate: true,
  optimize: true,
  includeProperties: true
});

// 高级配置 - 排除特定类别
ifcLoader.settings.excludedCategories.add(WEBIFC.IFCOPENINGELEMENT);
ifcLoader.settings.excludedCategories.add(WEBIFC.IFCSPACE);

// 自定义 WASM 路径
await ifcLoader.setup({
  autoSetWasm: false,
  wasm: {
    path: "/custom/path/web-ifc.wasm",
    absolute: true
  }
});
```

### 2.3 事件监听

```typescript
// 监听加载开始
ifcLoader.onIfcStartedLoading.add(() => {
  console.log("IFC 文件开始加载...");
  showLoadingIndicator();
});

// 监听设置完成
ifcLoader.onSetup.add(() => {
  console.log("IfcLoader 设置完成");
});

// 监听组件销毁
ifcLoader.onDisposed.add((uuid) => {
  console.log(`IfcLoader 已销毁: ${uuid}`);
});
```

## 3. Fragments 管理 (FragmentsManager)

### 3.1 FragmentsManager 组件

`FragmentsManager` 负责管理所有的 Fragments 几何体，提供统一的访问和操作接口。

```typescript
// 获取 FragmentsManager
const fragments = components.get(OBC.FragmentsManager);

// 加载 fragments 文件
const fragmentsFile = await fetch("model.frag");
const fragmentsBuffer = await fragmentsFile.arrayBuffer();
const model = fragments.load(fragmentsBuffer);

// 获取所有模型
const allModels = fragments.groups;

// 根据 UUID 获取模型
const specificModel = fragments.groups.get(modelUUID);

// 添加模型到场景
for (const fragment of model.items) {
  world.scene.three.add(fragment.mesh);
}
```

### 3.2 Fragments 操作

```typescript
// 遍历所有 fragments
for (const [uuid, model] of fragments.groups) {
  console.log(`模型: ${model.name}`);
  
  for (const fragment of model.items) {
    console.log(`  Fragment: ${fragment.id}`);
    console.log(`  三角形数量: ${fragment.mesh.count}`);
  }
}

// 获取特定元素的几何体
const elementID = 12345;
const fragmentMap = model.getFragmentMap([elementID]);

// 高亮显示元素
for (const [fragmentID, expressIDs] of fragmentMap) {
  const fragment = model.items.find(f => f.id === fragmentID);
  if (fragment) {
    // 高亮逻辑
    fragment.mesh.material = highlightMaterial;
  }
}
```

## 4. IFC 属性管理 (IfcPropertiesManager)

### 4.1 属性管理概述

`IfcPropertiesManager` 提供完整的 IFC 属性和属性集 (Pset) 管理功能。

#### 核心功能

- **属性读取**: 获取 IFC 元素的所有属性
- **属性编辑**: 修改现有属性值
- **Pset 管理**: 创建、编辑、删除属性集
- **类型安全**: 支持布尔、字符串、数值类型
- **变更追踪**: 监听属性变更事件

### 4.2 基础属性操作

```typescript
// 获取属性管理器
const properties = components.get(OBC.IfcPropertiesManager);

// 获取元素的所有属性
const elementID = 12345;
const elementProps = await properties.getProperties(model, elementID);

console.log("元素属性:", elementProps);

// 获取特定属性
const nameProperty = await properties.getProperty(
  model, 
  elementID, 
  "Name"
);

// 设置属性值
await properties.setProperty(
  model,
  elementID,
  "Name",
  "新的元素名称"
);

// 获取数值属性
const heightValue = await properties.getProperty(
  model,
  elementID,
  "Height"
) as number;
```

### 4.3 属性集 (Pset) 操作

```typescript
// 创建新的属性集
const psetID = await properties.newPset(model, "CustomProperties");

// 向属性集添加属性
await properties.newProperty(model, psetID, {
  name: "CustomProperty",
  type: "IfcText",
  value: "自定义值"
});

// 将元素关联到属性集
await properties.setElementToPset(model, elementID, psetID);

// 获取元素的所有属性集
const elementPsets = await properties.getElementPsets(model, elementID);

// 删除属性集
await properties.removePset(model, psetID);
```

### 4.4 属性类型处理

```typescript
// 布尔属性
await properties.setProperty(
  model,
  elementID,
  "IsExternal",
  true,
  "IfcBoolean"
);

// 数值属性
await properties.setProperty(
  model,
  elementID,
  "Area",
  125.5,
  "IfcReal"
);

// 字符串属性
await properties.setProperty(
  model,
  elementID,
  "Description",
  "墙体描述",
  "IfcText"
);

// 整数属性
await properties.setProperty(
  model,
  elementID,
  "FloorLevel",
  2,
  "IfcInteger"
);
```

### 4.5 属性变更监听

```typescript
// 监听属性变更
properties.onDataChanged.add((changeMap) => {
  for (const [modelUUID, changedElements] of Object.entries(changeMap)) {
    console.log(`模型 ${modelUUID} 中的变更元素:`);
    for (const elementID of changedElements) {
      console.log(`  元素 ${elementID} 已变更`);
    }
  }
});

// 监听元素添加到 Pset
properties.onElementToPset.add(({ model, psetID, elementID }) => {
  console.log(`元素 ${elementID} 已添加到属性集 ${psetID}`);
});

// 监听属性添加到 Pset
properties.onPropToPset.add(({ model, psetID, propID }) => {
  console.log(`属性 ${propID} 已添加到属性集 ${psetID}`);
});
```

## 5. IFC 关系索引 (IfcRelationsIndexer)

### 5.1 关系索引概述

`IfcRelationsIndexer` 负责建立和维护 IFC 元素之间的关系索引，支持高效的关系查询。

#### 支持的关系类型

- **空间关系**: 包含、分解关系
- **类型关系**: 元素与类型的关系
- **分组关系**: 元素分组和分类
- **关联关系**: 材质、文档关联
- **定义关系**: 属性集定义关系

### 5.2 关系索引操作

```typescript
// 获取关系索引器
const indexer = components.get(OBC.IfcRelationsIndexer);

// 为模型建立关系索引
await indexer.process(model);

// 获取元素的所有关系
const elementID = 12345;
const relations = indexer.getEntityRelations(model, elementID);

console.log("元素关系:", relations);

// 获取特定类型的关系
const spatialRelations = indexer.getEntityRelations(
  model, 
  elementID, 
  "spatial"
);

// 获取子元素
const children = indexer.getEntityChildren(model, elementID);

// 获取父元素
const parent = indexer.getEntityParent(model, elementID);
```

### 5.3 空间结构查询

```typescript
// 获取建筑的空间结构
const buildingID = await indexer.getBuildingElement(model);
const floors = indexer.getEntityChildren(model, buildingID);

for (const floorID of floors) {
  const floorName = await properties.getProperty(model, floorID, "Name");
  console.log(`楼层: ${floorName}`);
  
  // 获取楼层中的空间
  const spaces = indexer.getEntityChildren(model, floorID);
  for (const spaceID of spaces) {
    const spaceName = await properties.getProperty(model, spaceID, "Name");
    console.log(`  空间: ${spaceName}`);
    
    // 获取空间中的元素
    const elements = indexer.getEntityChildren(model, spaceID);
    console.log(`    包含 ${elements.length} 个元素`);
  }
}
```

### 5.4 关系事件监听

```typescript
// 监听关系索引完成
indexer.onRelationsIndexed.add(({ modelID, relationsMap }) => {
  console.log(`模型 ${modelID} 的关系索引已完成`);
  console.log(`索引了 ${Object.keys(relationsMap).length} 个元素的关系`);
});

// 监听实体关联事件
indexer.onEntitiesRelated.add((event) => {
  console.log("新的实体关系:", event);
});
```

## 6. IFC 元素查找 (IfcFinder)

### 6.1 元素查找功能

`IfcFinder` 提供强大的 IFC 元素搜索和过滤功能。

```typescript
// 获取查找器
const finder = components.get(OBC.IfcFinder);

// 按类型查找元素
const walls = await finder.byIfcType(model, WEBIFC.IFCWALL);
console.log(`找到 ${walls.size} 面墙`);

// 按属性查找元素
const externalWalls = await finder.byProperty(
  model,
  "IsExternal",
  true
);

// 按名称模糊查找
const namedElements = await finder.byName(model, "Wall");

// 组合查询
const query = {
  type: WEBIFC.IFCWALL,
  properties: {
    "IsExternal": true,
    "LoadBearing": true
  }
};
const loadBearingWalls = await finder.byQuery(model, query);
```

### 6.2 高级查询

```typescript
// 空间查询 - 查找特定楼层的所有墙
const floorID = 67890;
const floorWalls = await finder.bySpace(model, floorID, WEBIFC.IFCWALL);

// 材质查询 - 查找使用特定材质的元素
const materialID = 11111;
const elementsWithMaterial = await finder.byMaterial(model, materialID);

// 几何查询 - 查找特定尺寸范围的元素
const largeElements = await finder.byGeometry(model, {
  minVolume: 10.0,
  maxVolume: 100.0
});
```

## 7. IFC 数据导出 (IfcJsonExporter)

### 7.1 数据导出功能

`IfcJsonExporter` 支持将 IFC 数据导出为 JSON 格式，便于数据交换和分析。

```typescript
// 获取导出器
const exporter = components.get(OBC.IfcJsonExporter);

// 导出整个模型
const modelJson = await exporter.export(model);

// 导出特定元素
const elementIDs = [12345, 67890];
const elementsJson = await exporter.exportElements(model, elementIDs);

// 导出属性数据
const propertiesJson = await exporter.exportProperties(model);

// 导出关系数据
const relationsJson = await exporter.exportRelations(model);

// 保存到文件
const blob = new Blob([JSON.stringify(modelJson)], {
  type: 'application/json'
});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'model.json';
a.click();
```

### 7.2 自定义导出格式

```typescript
// 自定义导出配置
const exportConfig = {
  includeGeometry: true,
  includeProperties: true,
  includeRelations: true,
  format: 'compact',  // 'compact' | 'readable'
  precision: 3        // 几何精度
};

const customJson = await exporter.export(model, exportConfig);
```

## 8. 完整的 IFC 处理流程

以下是一个完整的 IFC 文件处理示例：

```typescript
import * as OBC from "@thatopen/components";
import * as WEBIFC from "web-ifc";

// 初始化组件系统
const components = new OBC.Components();
const worlds = components.get(OBC.Worlds);
const world = worlds.create();

// 设置场景
world.scene = new OBC.SimpleScene(components);
world.renderer = new OBC.SimpleRenderer(components, container);
world.camera = new OBC.SimpleCamera(components);
components.init();

// 获取 IFC 处理组件
const fragments = components.get(OBC.FragmentsManager);
const ifcLoader = components.get(OBC.IfcLoader);
const properties = components.get(OBC.IfcPropertiesManager);
const indexer = components.get(OBC.IfcRelationsIndexer);
const finder = components.get(OBC.IfcFinder);

// 配置和加载 IFC 文件
await ifcLoader.setup({ autoSetWasm: true });

const fileInput = document.getElementById('file-input') as HTMLInputElement;
fileInput.addEventListener('change', async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  
  try {
    // 加载 IFC 文件
    console.log('开始加载 IFC 文件...');
    const buffer = await file.arrayBuffer();
    const model = await ifcLoader.load(buffer);
    
    // 添加到场景
    for (const fragment of model.items) {
      world.scene.three.add(fragment.mesh);
    }
    
    // 建立关系索引
    console.log('建立关系索引...');
    await indexer.process(model);
    
    // 查找所有墙体
    const walls = await finder.byIfcType(model, WEBIFC.IFCWALL);
    console.log(`找到 ${walls.size} 面墙`);
    
    // 获取第一面墙的属性
    if (walls.size > 0) {
      const firstWall = Array.from(walls)[0];
      const wallProps = await properties.getProperties(model, firstWall);
      console.log('墙体属性:', wallProps);
      
      // 修改墙体名称
      await properties.setProperty(
        model,
        firstWall,
        "Name",
        "修改后的墙体名称"
      );
    }
    
    // 获取空间结构
    const buildingID = await indexer.getBuildingElement(model);
    if (buildingID) {
      const floors = indexer.getEntityChildren(model, buildingID);
      console.log(`建筑包含 ${floors.length} 个楼层`);
    }
    
    console.log('IFC 文件处理完成!');
    
  } catch (error) {
    console.error('IFC 文件处理失败:', error);
  }
});

// 清理资源
window.addEventListener('beforeunload', () => {
  components.dispose();
});
```

## 9. 性能优化建议

### 9.1 加载优化

```typescript
// 使用类别过滤减少加载时间
ifcLoader.settings.excludedCategories.add(WEBIFC.IFCSPACE);
ifcLoader.settings.excludedCategories.add(WEBIFC.IFCOPENINGELEMENT);

// 启用几何体优化
await ifcLoader.setup({
  optimize: true,
  coordinate: true
});

// 分批处理大型模型
const processInBatches = async (elements: number[], batchSize = 100) => {
  for (let i = 0; i < elements.length; i += batchSize) {
    const batch = elements.slice(i, i + batchSize);
    await processBatch(batch);
    // 让出控制权，避免阻塞 UI
    await new Promise(resolve => setTimeout(resolve, 0));
  }
};
```

### 9.2 内存管理

```typescript
// 及时清理不需要的模型
fragments.dispose(model);

// 清理属性缓存
properties.clearCache(model);

// 清理关系索引
indexer.clearRelations(model);
```

### 9.3 查询优化

```typescript
// 使用索引加速查询
const wallsIndex = new Map<number, boolean>();
for (const wallID of walls) {
  wallsIndex.set(wallID, true);
}

// 批量属性查询
const elementIDs = [1, 2, 3, 4, 5];
const batchProps = await properties.getBatchProperties(model, elementIDs);
```

---

> 📝 **下一章预告**: 在下一章中，我们将详细介绍测量工具系统，包括长度、角度、面积、体积等各种测量功能的使用方法。