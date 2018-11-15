global.Entities = require('../entities');
const Connection = require('./connection');
const test = require('./test');

const Game = {
    deltaTime: Date.now(),
    ready: false,
    children: {},
    connection: Connection,
    initGame() {

        Entities.init();
        Connection.initSockets();
        test();

        Game.update();
        Game.ready = true;
    },
    update() {
        let dt = (Date.now() - Game.deltaTime) * .001;

        for (let i in Game.children) {
            Game.children[i].update(dt);
        }

        Game.deltaTime = Date.now();
        setTimeout(() => Game.update(), 1000 / 30);
    },
    addEntity(childEntity) {
        Game.children[childEntity.id] = childEntity;
        childEntity.parent = Game;
    }
};

module.exports = Game;
