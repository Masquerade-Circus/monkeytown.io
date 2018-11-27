let Entities = require('../../entities');
let {PROPS, INVENTORY} = Entities;

let Factory = (entity) => {
    entity[PROPS.Equiped] = 0;
    entity.getEquipedItem = () => {
        let id = Object.keys(INVENTORY)[entity[PROPS.Equiped]];
        let item = INVENTORY[id];

        let level = entity[PROPS.Inventory][id];
        let response = Object.assign({level}, item);
        response.damage = item.damage * level;
        response.collect = item.collect * level;
        response.range = level === 0 ? 0 : item.range;

        return response;
    };

    entity.keyboard.onChange((type, data) => {
        if (type === 'mousewheel' && data !== 0) {
            let next = entity[PROPS.Equiped];
            let max = Object.keys(INVENTORY).length - 1;
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
};

module.exports = Factory;
