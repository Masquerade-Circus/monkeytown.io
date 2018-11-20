let MovementFactory = require('./movement-script-factory');
let KeyboardFactory = require('./keyboard-script-factory');
let Entities = require('../../entities');
let {PROPS, STATUS, NET_TYPES, INVENTORY} = Entities;

let Factory = (entity) => {
    let needsUpdate = false;
    entity[PROPS.Inventory] = {
        [INVENTORY.Wood]: 0
    };

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
                    if (entities[i][PROPS.NetType] === NET_TYPES.Tree) {
                        Game.children[i].runScript('fight');
                        entity[PROPS.Inventory][INVENTORY.Wood] += 5;
                        needsUpdate = true;
                    }
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
