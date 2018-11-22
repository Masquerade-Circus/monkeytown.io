let MovementFactory = require('./movement-script-factory');
let KeyboardFactory = require('./keyboard-script-factory');
let Entities = require('../../entities');
let {PROPS, STATUS, NET_TYPES, RESOURCES, INVENTORY} = Entities;

let Factory = (entity) => {
    let needsUpdate = false;

    entity[PROPS.Resources] = {};
    Object.values(RESOURCES).forEach(item => entity[PROPS.Resources][item] = 0);

    entity[PROPS.Inventory] = {};
    Object.values(INVENTORY).forEach(item => entity[PROPS.Inventory][item.id] = 0);

    entity.socket.on('buy', (name) => {
        let resources = entity[PROPS.Resources];
        let item = INVENTORY[name];
        if (item) {
            let level = entity[PROPS.Inventory][item.id];
            if (
                level === 0
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
            ) {
                entity[PROPS.Resources][RESOURCES.Wood] -= item.wood;
                entity[PROPS.Resources][RESOURCES.Stone] -= item.stone;
                entity[PROPS.Inventory][item.id] = 1;
            }
            needsUpdate = true;
        }
    });

    KeyboardFactory(entity);
    entity.addScript('movement', MovementFactory(entity));
    entity.addScript('updatePlayer', () => {
        if (needsUpdate) {
            entity.socket.emit('updatePlayer', {
                [PROPS.Resources]: entity[PROPS.Resources],
                [PROPS.Inventory]: entity[PROPS.Inventory]
            });
            needsUpdate = false;
        }
    });

    entity.addScript('fight', () => {
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


                    needsUpdate = true;
                }
            }

            setTimeout(() => entity[PROPS.Status] = STATUS.Static, 500);
        }
    });


    entity.addScript('start', (dt) => {
        entity.runScript('movement', dt);
        entity.limit();
    });

    entity.addScript('tick', () => {
        // entity.runScript('fight');
    });

    entity.addScript('end', () => {
        entity.keyboard.reset();
        entity.runScript('updatePlayer');
    });
};

module.exports = Factory;
