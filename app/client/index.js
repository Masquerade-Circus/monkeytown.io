import config from './config';
import AppFactory from './appFactory';
import test from './test';

let Game = {
    config,
    deltaTime: Date.now(),
    ready: false,
    quality: 0.8,
    app: null,
    initGame() {
        Game.app = AppFactory();
        Game.setQuality();
        Game.update();
        Game.ready = true;
        test(Game.app);
    },
    update() {
        let dt = (Date.now() - Game.deltaTime) * .001;


        Game.deltaTime = Date.now();
        Game.app.renderer.render(Game.app.scene, Game.app.camera);
        requestAnimationFrame(() => Game.update());
    },
    setQuality(pixelRatio = 0.8) {
        Game.quality = pixelRatio;
        Game.app.renderer.setPixelRatio(window.devicePixelRatio * Game.quality);
        Game.app.renderer.setSize(window.innerWidth, window.innerHeight);
    }
};

export default Game;
