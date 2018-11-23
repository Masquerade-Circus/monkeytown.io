let MovementFactory = require('./movement-script-factory');
let KeyboardFactory = require('./keyboard-script-factory');
let BuyScriptFactory = require('./buy-script-factory');
let FightScriptFactory = require('./fight-script-factory');
let InitPlayerFactory = require('./init-player-factory');

let Factory = (entity) => {
    InitPlayerFactory(entity);
    KeyboardFactory(entity);
    entity.addScript('movement', MovementFactory(entity));
    entity.socket.on('buy', BuyScriptFactory(entity));
    entity.addScript('fight', FightScriptFactory(entity));

    entity.addScript('start', (dt) => {
        entity.runScript('movement', dt);
        entity.limit();
    });

    entity.addScript('end', () => {
        entity.keyboard.reset();
        entity.runScript('updatePlayer');
    });
};

module.exports = Factory;
