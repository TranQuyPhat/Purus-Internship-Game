import * as pc from "playcanvas";

export function createLight(app) {
  const light = new pc.Entity("DirectionalLight");
  app.root.addChild(light);

  light.addComponent("light", {
    type: pc.LIGHTTYPE_DIRECTIONAL,
    color: new pc.Color(1, 1, 1),
    intensity: 3,
    castShadows: true, // Bật shadow cho đèn
    shadowDistance: 50, // Khoảng cách xa nhất của shadow
    shadowResolution: 1024, // Độ phân giải shadow (chất lượng bóng)
    shadowType: pc.SHADOW_PCF3, // Kiểu shadow (bóng mờ hơn)
  });

  light.setEulerAngles(90, 50, 50);

  return light;
}
