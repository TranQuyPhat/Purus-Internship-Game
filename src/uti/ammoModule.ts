import * as pc from "playcanvas";
export async function setupAmmo() {
  pc.WasmModule.setConfig("Ammo", {
    glueUrl: "./Utils/ammo.wasm.js",
    wasmUrl: "./Utils/ammo.wasm.wasm",
    fallbackUrl: "./Utils/ammo.js",
  });
  await new Promise((resolve) => {
    pc.WasmModule.getInstance("Ammo", (instance) => {
      resolve(instance);
    });
  });
}
