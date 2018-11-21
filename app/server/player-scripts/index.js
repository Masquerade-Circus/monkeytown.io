let MovementFactory = require('./movement-script-factory');
let KeyboardFactory = require('./keyboard-script-factory');
let Entities = require('../../entities');
let {PROPS, STATUS, NET_TYPES, INVENTORY} = Entities;

let Factory = (entity) => {
    let needsUpdate = false;
    entity[PROPS.Inventory] = {};
    Object.values(INVENTORY).forEach(item => entity[PROPS.Inventory][item] = 0);

    KeyboardFactory(entity);
    entity.addScript('movement', MovementFactory(entity));
    entity.addScript('updatePlayer', () => {
        if (needsUpdate) {
            entity.socket.emit('updatePlayer', {
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
                    Game.children[i].runScript('fight');
                    let random = Math.random();

                    if (random > 0.7) {
                        switch (entities[i][PROPS.NetType]) {
                            case NET_TYPES.Tree:
                                entity[PROPS.Inventory][INVENTORY.Wood] += 3;
                                entity[PROPS.Inventory][INVENTORY.Food] += 1;
                                entity[PROPS.Inventory][INVENTORY.Leaves] += 1;
                                break;
                            case NET_TYPES.Stone:
                                entity[PROPS.Inventory][INVENTORY.Stone] += 3;
                                break;
                            case NET_TYPES.Iron:
                                entity[PROPS.Inventory][INVENTORY.Iron] += 2;
                                break;
                            case NET_TYPES.Silver:
                                entity[PROPS.Inventory][INVENTORY.Silver] += 1;
                                break;
                            case NET_TYPES.Gold:
                                entity[PROPS.Inventory][INVENTORY.Gold] += 1;
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
