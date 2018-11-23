let Entities = require('../../entities');
let {PROPS, RESOURCES, INVENTORY} = Entities;

let Factory = (entity) => {
    entity.needsUpdate = true;

    entity[PROPS.Resources] = {};
    Object.values(RESOURCES).forEach(item => entity[PROPS.Resources][item] = 0);

    entity[PROPS.Inventory] = {};
    Object.values(INVENTORY).forEach(item => entity[PROPS.Inventory][item.id] = 0);

    entity[PROPS.Equiped] = 0;

    entity.getEquipedItem = () => {
        let item;
        let equipedId = Object.values(INVENTORY)[entity[PROPS.Equiped]].id;

        for (let i in INVENTORY) {
            if (equipedId === INVENTORY[i].id) {
                let level = entity[PROPS.Inventory][equipedId];
                item = Object.assign({level}, INVENTORY[i]);
                item = {
                    level,
                    damage: INVENTORY[i].damage * level,
                    collect: INVENTORY[i].collect * level,
                    range: level === 0 ? 0 : INVENTORY[i].range
                };
                break;
            }
        }
        return item;
    };

    entity.keyboard.onChange((type, data) => {
        if (type === 'mousewheel' && data !== 0) {
            let next = entity[PROPS.Equiped];
            let max = Object.values(INVENTORY).length - 1;
            if (data === -1) {
                next += 1;
                if (next > max) {
                    next = 0;
                }
            }

            if (data === 1) {
                next -= 1;
                if (next < 0) {
                    next = max;
                }
            }

            entity[PROPS.Equiped] = next;
            entity.needsUpdate = true;
        }
    });

    entity.addScript('updatePlayer', () => {
        if (entity.needsUpdate) {
            entity.socket.emit('updatePlayer', {
                [PROPS.Resources]: entity[PROPS.Resources],
                [PROPS.Inventory]: entity[PROPS.Inventory],
                [PROPS.Equiped]: entity[PROPS.Equiped]
            });
            entity.needsUpdate = false;
        }
    });
    entity.runScript('updatePlayer');
};

module.exports = Factory;
