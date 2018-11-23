let Entities = require('../../entities');
let {PROPS, STATUS, NET_TYPES, RESOURCES, INVENTORY} = Entities;

let Factory = (entity) => () => {
    if (entity[PROPS.Status] !== STATUS.Fighting) {
        entity[PROPS.Status] = STATUS.Fighting;

        let entities = Game.getWorldEntities(entity, 3);
        for (let i in entities) {
            if (i !== entity.id) {
                if (entities[i][PROPS.NetType] !== NET_TYPES.Player) {
                    Game.children[i].runScript('fight');
                }

                let random = Math.random();
                random = 1;

                if (random > 0.7) {
                    switch (entities[i][PROPS.NetType]) {
                        case NET_TYPES.Tree:
                            entity[PROPS.Resources][RESOURCES.Wood] += 3;
                            entity[PROPS.Resources][RESOURCES.Food] += 1;
                            break;
                        case NET_TYPES.Stone:
                            entity[PROPS.Resources][RESOURCES.Stone] += 1;
                            break;
                        case NET_TYPES.Iron:
                            entity[PROPS.Resources][RESOURCES.Iron] += 1;
                            break;
                        case NET_TYPES.Silver:
                            entity[PROPS.Resources][RESOURCES.Silver] += 1;
                            break;
                        case NET_TYPES.Gold:
                            entity[PROPS.Resources][RESOURCES.Gold] += 1;
                            break;
                        case NET_TYPES.Bush:
                            entity[PROPS.Resources][RESOURCES.Food] += 3;
                            break;
                    }
                }


                entity.needsUpdate = true;
            }
        }

        setTimeout(() => entity[PROPS.Status] = STATUS.Static, 500);
    }
};

module.exports = Factory;
