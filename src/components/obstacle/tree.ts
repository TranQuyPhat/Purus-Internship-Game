import * as pc from "playcanvas";

export class treeManager {
  private app: pc.Application;
  private trees: pc.Entity[] = [];
  private cellSize: number;
  private col: number;
  private rows: number;
  private treeAssets: string[] = [
    "../../../assets/Pinetree/Pinetree.glb",
    "../../../assets/Pine Tree/Pine Tree.glb",
    "../../../assets/Tree/Tree.glb",
  ];

  constructor(
    app: pc.Application,
    cellSize: number,
    col: number,
    rows: number
  ) {
    this.app = app;
    this.cellSize = cellSize;
    this.col = col;
    this.rows = rows;
  }

  async loadRandomTreeAsset() {
    const randomIndex = Math.floor(Math.random() * this.treeAssets.length);
    const randomAssetUrl = this.treeAssets[randomIndex];

    return new Promise((resolve, reject) => {
      this.app.assets.loadFromUrl(
        randomAssetUrl,
        "model",
        (err, asset: pc.Asset | undefined) => {
          if (err) {
            console.error("Error loading tree asset: ", err);
            reject(err);
          } else {
            resolve({ asset, url: randomAssetUrl });
          }
        }
      );
    });
  }

  createTrees(x: number, zPosition: number) {
    const firstTwoRows = [zPosition, zPosition - this.cellSize];
    const lastTwoRows = [
      zPosition - this.cellSize * (this.rows - 1),
      zPosition - this.cellSize * this.rows,
    ];

    for (
      let z = zPosition - 2 * this.cellSize;
      z > zPosition - this.cellSize * (this.rows - 2);
      z -= this.cellSize
    ) {
      if (!firstTwoRows.includes(z) && !lastTwoRows.includes(z)) {
        for (let posX = -this.col; posX <= -x; posX += this.cellSize) {
          this.createTree(posX, z);
        }
        for (let posX = x; posX <= this.col; posX += this.cellSize) {
          this.createTree(posX, z);
        }
      }
    }
  }

  async createTree(x: number, z: number) {
    const { asset: treeAsset, url } = await this.loadRandomTreeAsset();
    const tree = new pc.Entity();
    tree.addComponent("model", {
      type: "asset",
      asset: treeAsset,
    });

    // Kiểm tra nếu là asset thứ ba để điều chỉnh scale nhỏ hơn
    if (url === "../../../assets/Tree/Tree.glb") {
      tree.setLocalScale(0.25, 0.25, 0.25);
      tree.setPosition(x, 0, z); // Scale nhỏ hơn
    } else if (url === "../../../assets/Pine Tree/Pine Tree.glb") {
      tree.setLocalScale(1, 1, 1);
      tree.setPosition(x, 1.5, z); // Scale mặc định
    } else {
      tree.setLocalScale(1, 1, 1);
      tree.setPosition(x, 1, z);
    }

    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color(1, 0.84, 0);
    material.metalness = 1;
    material.shininess = 100;
    material.update();
    tree.model.material = material;

    tree.addComponent("collision", {
      type: "sphere",
      radius: 0.8,
      height: 0.2,
    });
    tree.addComponent("rigidbody", {
      type: "kinematic",
    });

    tree.tags.add("tree");
    this.app.root.addChild(tree);
    this.trees.push(tree);
  }

  getTrees() {
    return this.trees;
  }
}
