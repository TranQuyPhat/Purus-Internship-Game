// AudioManager.ts
import * as pc from "playcanvas";

export class SoundManager {
  private app: pc.Application;
  private sounds: { [key: string]: pc.Sound };

  constructor(app: pc.Application) {
    this.app = app;
    this.sounds = {};
    this.loadSounds();
  }

  private loadSounds() {
    // Load các file âm thanh
    this.app.assets.loadFromUrl(
      "../../assets/coin.mp3",
      "audio",
      this.onLoadComplete.bind(this, "coin")
    );
    this.app.assets.loadFromUrl(
      "../../assets/gameover.mp3",
      "audio",
      this.onLoadComplete.bind(this, "gameover")
    );
    this.app.assets.loadFromUrl(
      "../../assets/jump.mp3",
      "audio",
      this.onLoadComplete.bind(this, "move")
    );
  }

  private onLoadComplete(name: string, err: any, asset: pc.Asset) {
    if (!err) {
      this.sounds[name] = asset.resource;
    } else {
      console.error(`Failed to load sound: ${name}`);
    }
  }

  public playSound(name: string) {
    if (this.sounds[name]) {
      const soundEntity = new pc.Entity();
      soundEntity.addComponent("audio", {
        sound: this.sounds[name].resource,
        loop: false,
      });

      // Add the sound entity to the app root
      this.app.root.addChild(soundEntity);

      // Play the sound
      soundEntity.audio.play();

      // Destroy the sound entity after it finishes playing
      soundEntity.audio.on("ended", () => {
        soundEntity.destroy();
      });
    } else {
      console.warn(`Sound not found: ${name}`);
    }
  }
}
