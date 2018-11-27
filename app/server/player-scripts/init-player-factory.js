let Entities = require('../../entities');
let {PROPS, RESOURCES, INVENTORY} = Entities;

let Factory = (entity) => {
    entity.needsUpdate = true;

    entity[PROPS.Resources] = {};
    Object.values(RESOURCES).forEach(item => entity[PROPS.Resources][item] = 0);

    entity[PROPS.Inventory] = {};
    Object.keys(INVENTORY).forEach(id => entity[PROPS.Inventory][id] = 0);

    entity.addScript('updatePlayer', () => {
        if (entity.needsUpdate) {
            entity.socket.emit('updatePlayer', {
                [PROPS.Resources]: entity[PROPS.Resources],
                [PROPS.Inventory]: entity[PROPS.Inventory]
            });
            entity.needsUpdate = false;
        }
    });
    entity.runScript('updatePlayer');
};

module.exports = Factory;
