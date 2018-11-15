import config from './config';
import AppFactory from './appFactory';
import test from './test';

let Game = {
    config,
    deltaTime: Date.now(),
    ready: false,
    quality: 0.8,
    app: null,
    children: {},
    initGame() {
        Game.app = AppFactory();
        Game.setQuality();

        Entities.init();
        test(Game.app);

        Game.update();
        Game.ready = true;
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
    },
    addEntity(childEntity) {
        Game.children[childEntity.id] = childEntity;
        childEntity.parent = Game;
        Game.app.scene.add(childEntity.body);
    }
};

export default Game;
