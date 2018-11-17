import config from './config';
import AppFactory from './app-factory';
import ConnectionFactory from './connection-factory';
import test from './test';
import PlayerScriptFactory from './player-scripts';
import Entities from '../entities';
import KeyboardFactory from '../shared/keyboard-factory';

let Game = {
    config,
    deltaTime: Date.now(),
    is: {
        ready: false,
        connecting: false,
        connected: false
    },
    ready: false,
    quality: 0.8,
    app: null,
    children: {},
    keyboard: null,
    canvas: null,
    async initGame() {
        AppFactory(Game);
        Game.setQuality();

        Entities.init();
        Game.connection = ConnectionFactory(Game);
        Game.connection.initSocket(Game.config.serverUrl);
        Game.keyboard = KeyboardFactory(document.body);
        test(Game);

        Game.update();
        await Game.getWorlds();
        Game.is.ready = true;
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
            /**
             * Entity must be undefined and must not be the player,
             * we will handle the creation of the creation of the player entity
             * when the connectServer promise resolve
             */
            if (Game.children[i] === undefined && world.children[i].id !== Game.socket.id) {
                let entity = Entities.create(world.children[i]);
                Game.addEntity(entity);
            } else {
                if (Game.children[i] !== undefined) {
                    Object.assign(Game.children[i], world.children[i]);
                }
            }
        }
    },
    setPlayerScripts: PlayerScriptFactory,
    async connectServer() {
        if (Game.is.ready && !Game.is.connecting && !Game.is.connected) {
            Game.is.connecting = true;
            let player = await Game.connection.connectServer(Game.selectedWorld);
            let entity = Entities.create(player);
            Game.addEntity(entity);
            Game.player = entity;
            Game.setPlayerScripts(Game);
            Game.is.connected = true;
            Game.is.connecting = false;
        }
    },
    selectedWorld: null,
    worlds: {},
    async getWorlds() {
        let worlds = await Game.connection.getWorlds();
        let selected = false;
        for (let world in worlds) {
            worlds[world].selected = false;
            worlds[world].disabled = false;
            if (
                !selected &&
                worlds[world].playerCount < worlds[world].maxPlayers
            ) {
                worlds[world].selected = true;
                Game.selectedWorld = world;
                selected = true;
            }
            if (worlds[world].playerCount >= worlds[world].maxPlayers) {
                worlds[world].disabled = true;
            }
        }
        Game.worlds = worlds;
    },
    selectWorld(name) {
        for (let world in Game.worlds) {
            if (world === name) {
                Game.worlds[world].selected = true;
                Game.selectedWorld = world;
            } else {
                Game.worlds[world].selected = false;
            }
        }
    },
    fixedProps(obj = {}, precision = 3) {
        let o = Array.isArray(obj) ? [] : {};

        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                o[i] = Game.fixedProps(obj[i]);
                continue;
            }

            if (typeof obj[i] === 'number') {
                o[i] = +(obj[i]).toFixed(precision);
                continue;
            }

            o[i] = obj[i];
        }

        return o;
    }
};

export default Game;
