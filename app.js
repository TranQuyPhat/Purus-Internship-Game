// app.ts
class SceneSwitcher {
    private app: pc.Application;

    constructor(canvas: HTMLCanvasElement) {
        this.app = new pc.Application(canvas, {});
        this.app.start();

        // Tải các scene
        this.loadScenes();
    }

    private loadScenes() {
        // Tải scene đầu tiên
        this.loadScene('scene1', () => {
            console.log('Scene 1 loaded');
            this.setupUI();
        });
    }

    private setupUI() {
        // Tạo nút chuyển đổi
        const button = new pc.Entity();
        button.addComponent('element', {
            type: 'button',
            text: 'Chuyển đến Scene 2',
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
            fontSize: 24,
            color: new pc.Color(1, 1, 1),
            backgroundColor: new pc.Color(0, 0, 0)
        });

        button.setLocalPosition(0, 0, 0);
        this.app.root.addChild(button);

        // Thêm sự kiện click cho nút
        button.element.on('click', () => {
            this.changeScene('scene2');
        });
    }

    private changeScene(sceneName: string) {
        this.loadScene(sceneName, () => {
            console.log(`${sceneName} loaded`);
        });
    }

    private loadScene(sceneName: string, callback: Function) {
        const url = `${sceneName}.json`; // Đường dẫn đến file scene

        this.app.loadSceneHierarchy(url, (err) => {
            if (err) {
                console.error(err);
            } else {
                callback();
            }
        });
    }
}

// Khởi tạo ứng dụng
const canvas = document.getElementById('application-canvas') as HTMLCanvasElement;
const app = new SceneSwitcher(canvas);