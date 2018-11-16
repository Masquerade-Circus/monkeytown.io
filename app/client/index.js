import config from './config';
import AppFactory from './app-factory';
import Connection from './connection';
import test from './test';
import PlayerScriptFactory from './player-scripts';
import Entities from '../entities';

let Game = {
    config,
    deltaTime: Date.now(),
    ready: false,
    quality: 0.8,
    app: null,
    children: {},
    connection: Connection,
    initGame() {
        Game.app = AppFactory();
        Game.setQuality();

        Entities.init();
        Connection.initSocket(Game.config.serverUrl);
        test(Game);

        Game.update();
        Game.ready = true;
    },
    update() {
        let dt = (Date.now() - Game.deltaTime) * .001;

        for (let i in Game.children) {
            Game.children[i].update(dt);
        }

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
    },
    updateWorld(world) {
        for (let i in Game.children) {
            if (world.children[i] === undefined) {
                Game.children[i].destroy();
            }
        }

        for (let i in world.children) {
            if (Game.children[i] === undefined) {
                let entity = Entities.create(world.children[i]);
                Game.addEntity(entity);
                if (i === Game.playerId) {
                    Game.player = entity;
                    Game.setPlayerScripts();
                }
            } else {
                Object.assign(Game.children[i], world.children[i]);
            }
        }
    },
    setPlayerScripts: PlayerScriptFactory
};

export default Game;
