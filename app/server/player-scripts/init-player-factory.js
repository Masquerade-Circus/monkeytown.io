let Entities = require('../../entities');
let {PROPS, RESOURCES, INVENTORY} = Entities;

let Factory = (entity) => {
    entity.needsUpdate = false;

    entity[PROPS.Resources] = {};
    Object.values(RESOURCES).forEach(item => entity[PROPS.Resources][item] = 0);

    entity[PROPS.Inventory] = {};
    Object.values(INVENTORY).forEach(item => entity[PROPS.Inventory][item.id] = 0);

    entity.addScript('updatePlayer', () => {
        if (entity.needsUpdate) {
            entity.socket.emit('updatePlayer', {
                [PROPS.Resources]: entity[PROPS.Resources],
                [PROPS.Inventory]: entity[PROPS.Inventory]
            });
            entity.needsUpdate = false;
        }
    });
};

module.exports = Factory;
