/* eslint import/no-extraneous-dependencies: 0 */

import Stats from "stats.js";
// @ts-ignore
import * as dat from "three/examples/jsm/libs/lil-gui.module.min";
import * as OBC from "@thatopen/components";
import * as THREE from "three";
import * as OBCF from "../..";

const container = document.getElementById("container")!;

const components = new OBC.Components();

const worlds = components.get(OBC.Worlds);

const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBCF.PostproductionRenderer
>();

world.scene = new OBC.SimpleScene(components);
world.renderer = new OBCF.PostproductionRenderer(components, container);
world.camera = new OBC.SimpleCamera(components);

components.init();

world.camera.controls.setLookAt(5, 5, 5, 0, 0, 0);

world.scene.setup();

const grids = components.get(OBC.Grids);
grids.create(world);

/* MD
  ### 📏 Dimensions Tool
  ---
  At times, you may need to compute the dimensions of an object or measure the distance between two elements.
  Elements must be precisely aligned when working on complex models.
  Dimension Tool allows you to perform measurements effortlessly.

  :::tip First, let's set up a simple scene!

  👀 If you haven't started there, check out [that tutorial first](SimpleScene.mdx)!

  :::

  This tutorial will show you how to add Dimension Tool to your projects,
  which can be used to acquire accurate dimensions for any 3D Object.🔭


  ### 🎲 Creating a Cube Mesh
  ---
  For this tutorial we will use a Cube, you can add any geometry as per your preference.
  We will create a [Cube](https://threejs.org/docs/index.html?q=box#api/en/geometries/BoxGeometry)
  with `3x3x3` dimensions and use red color for the material.
  */

const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: "#6528D7" });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 1.5, 0);

/* MD
  Now, we will add the Cube to the `Scene`. We must also add the **cube** to `components.meshes`,
  which is simply an array of all the meshes in the Scene.🗄️
*/

world.scene.three.add(cube);
world.meshes.add(cube);

/* MD
  
  :::info Collection of Meshes

  📦 **Components.meshes** keeps all your meshes including IFC Models, Fragments in
  one place.

  :::

  ### 🛠️ Creating Dimension Tool
  ---
  A lot of logic is usually needed to compute dimensions for any item, beginning with ray casting,
  finding the vertices to snap to, and rendering the UI for every line element.🙄
  This may appear to be a lot of effort, but we are handling all the heavy lifting for you,
  and you only need to write a few lines for creating the Dimension Tool.💪
  */

const angles = components.get(OBCF.AngleMeasurement);
angles.world = world;

/* MD
  We will build dimensions by supplying the `components` to **OBC.SimpleDimensions**.

  :::info DIMENSIONS AND UI

  Read the **[Simple Dimensions](../api/classes/components.SimpleDimensions)** API for more on this.
  The Simple Dimensions API provides you with a compact UI as well to display the measurements.

  :::

  🎨 **SimpleDimensions** has several properties that help you to customize the behaviour of the `Line Element`.
  One such property which you can use is **`dimensions.color`** which modifies the color of the Line Element.

  */

angles.enabled = true;

/* MD
  ### 🖱️ Managing Events
  ---
  You can use the Dimension Tool to construct several dimension lines. Let's see how you handle them.

  #### ✍️ Creating the Dimensions

  Now that we've generated the dimensions object, we need to attach the line tooltip to a vertex of the 3D object.
  We'll use the double click event to invoke **`dimensions.create()`**.
  When this event occurs, a line element is generated,
  and the distance is calculated in real-time inside the label associated with that line.🏷️

  */

container.ondblclick = () => angles.create();

/* MD
  
  #### 🧹 Deleting the Dimensions

  Now that we know how to make multiple dimension lines, we must also know how to delete them when necessary.
  Dimensions can be removed using `dimensions.delete()`.
  **dimensions.delete()** deletes the dimension on which your mouse pointer is now located.

  :::tip Deleting all the Dimensions

  ❎ If you want to safely delete all the **dimensions** that were created you can simply call
  **`dimensions.deleteAll()`**

  :::

  */

window.onkeydown = (event) => {
  if (event.code === "Delete" || event.code === "Backspace") {
    angles.delete();
  }
};

// const mainToolbar = new OBC.Toolbar(components, {
//   name: "Main Toolbar",
//   position: "bottom",
// });
// mainToolbar.addChild(dimensions.uiElement.get("main"));
// components.ui.addToolbar(mainToolbar);

/* MD
  
  🎛️ Check **[Toolbar and UIManager](./UIManager.mdx)** tutorial if you have any doubts!

  ### 🖌️ Adding Styles
  ---

  Few final things, we need to add styles for the `labels` which display the measurement information.
  - **`ifcjs-dimension-label`** - The label which is used to show the metric value after both the tooltips are attached.
  - **`ifcjs-dimension-label:hover`** - Changing the styling when someone hovers on the dimension label.
  - **`ifcjs-dimension-preview`** - The label which shows the measurement when the tooltip is not yet attached.

  ```css title="style"
  .ifcjs-dimension-label {
      background-color: black;
      font-family: sans-serif;
      color: white;
      padding: 8px;
      border-radius: 8px;
      pointer-events: all;
      transition: background-color 200ms ease-in-out;
  }

  .ifcjs-dimension-label:hover {
      background-color: grey;
  }

  .ifcjs-dimension-preview {
      background-color: #ffffff;
      width: 2rem;
      height: 2rem;
      opacity: 0.3;
      padding: 8px;
      border-radius: 100%;
  }
  ```


  **Congratulations** 🎉 on completing this tutorial! Now you can measure any BIM Model or any 3D Object easily using
  **[Simple Dimension Component](../api/classes/components.SimpleDimensions)** 📐
  Let's keep it up and check out another tutorial! 🎓

  */

// Set up stats

const stats = new Stats();
stats.showPanel(2);
document.body.append(stats.dom);
stats.dom.style.left = "0px";
world.renderer.onBeforeUpdate.add(() => stats.begin());
world.renderer.onAfterUpdate.add(() => stats.end());

// Set up dat.gui menu

// const gui = new dat.GUI();

// const shortcutsFolder = gui.addFolder('Shortcuts');

// const shortcuts = {
// 	'Create dimension': 'Double click',
// 	'Delete dimension': 'Delete',
// };

// shortcutsFolder.add(shortcuts, 'Create dimension');
// shortcutsFolder.add(shortcuts, 'Delete dimension');

// const actionsFolder = gui.addFolder('Actions');

// actionsFolder.add(dimensions, 'enabled').name('Dimensions enabled');
// actionsFolder.add(dimensions, "visible").name("Dimensions visible");

// const color = {
// 	value: 0x000000,
// };

// const helperColor = new THREE.Color();
// actionsFolder.addColor(color, 'value')
// 	.name('Dimensions color')
// 	.onChange((value) => {
// 		helperColor.setHex(value);
// 		dimensions.color = helperColor;
// 	});

// const actions = {
// 	'Delete all dimensions': () => {
// 		dimensions.deleteAll();
// 	},
// };

// actionsFolder.add(actions, 'Delete all dimensions');
