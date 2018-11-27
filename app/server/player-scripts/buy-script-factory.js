let Entities = require('../../entities');
let {PROPS, RESOURCES, INVENTORY} = Entities;

let Factory = (entity) => (id) => {
    let resources = entity[PROPS.Resources];
    let item = INVENTORY[id];
    if (item) {
        let level = entity[PROPS.Inventory][id];
        if (
            level === 0
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
        ) {
            entity[PROPS.Resources][RESOURCES.Wood] -= item.wood;
            entity[PROPS.Resources][RESOURCES.Stone] -= item.stone;
            entity[PROPS.Inventory][id] = 1;
            entity.needsUpdate = true;
            return;
        }

        if (
            level === 1
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Iron]
        ) {
            entity[PROPS.Resources][RESOURCES.Wood] -= item.wood;
            entity[PROPS.Resources][RESOURCES.Stone] -= item.stone;
            entity[PROPS.Resources][RESOURCES.Iron] -= item.stone;
            entity[PROPS.Inventory][id] = 2;
            entity.needsUpdate = true;
            return;
        }

        if (
            level === 2
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Silver]
        ) {
            entity[PROPS.Resources][RESOURCES.Wood] -= item.wood;
            entity[PROPS.Resources][RESOURCES.Stone] -= item.stone;
            entity[PROPS.Resources][RESOURCES.Silver] -= item.stone;
            entity[PROPS.Inventory][id] = 3;
            entity.needsUpdate = true;
            return;
        }

        if (
            level === 3
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Gold]
        ) {
            entity[PROPS.Resources][RESOURCES.Wood] -= item.wood;
            entity[PROPS.Resources][RESOURCES.Stone] -= item.stone;
            entity[PROPS.Resources][RESOURCES.Gold] -= item.stone;
            entity[PROPS.Inventory][id] = 4;
            entity.needsUpdate = true;
            return;
        }

    }
};

module.exports = Factory;
