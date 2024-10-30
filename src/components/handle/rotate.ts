import * as pc from "playcanvas";

pc.script.create("rotate", {
  initialize: function () {
    this.speed = 100;
  },
  update: function (dt) {
    this.entity.rotate(0, this.speed * dt, 0);
  },
});
