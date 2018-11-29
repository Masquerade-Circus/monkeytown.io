let MovementFactory = require('./movement-script-factory');
let KeyboardFactory = require('./keyboard-script-factory');
let BuyScriptFactory = require('./buy-script-factory');
let FightScriptFactory = require('./fight-script-factory');
let InitPlayerFactory = require('./init-player-factory');
let EquipScriptFactory = require('./equip-script-factory');

let Factory = (entity) => {
    KeyboardFactory(entity);
    InitPlayerFactory(entity);
    EquipScriptFactory(entity);
    MovementFactory(entity);
    BuyScriptFactory(entity);
    FightScriptFactory(entity);

    entity.addScript('start', (dt) => {
        entity.runScript('movement', dt);
        entity.runScript('fight');
        entity.limit();
    });

    entity.addScript('end', () => {
        entity.runScript('updatePlayer');
    });
};

module.exports = Factory;
