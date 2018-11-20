let MovementFactory = require('./movement-script-factory');
let KeyboardFactory = require('../../shared/keyboard-factory');
let Entities = require('../../entities');
let {PROPS, STATUS, NET_TYPES} = Entities;

let Factory = (entity) => {
    let lookAt = new THREE.Vector3();
    entity.keyboard = KeyboardFactory();
    entity[PROPS.status] = STATUS.Static;

    entity.socket.on('keyboard', keys => {
        entity.keyboard.pressedKeys = keys;
    });

    entity.socket.on('mouse', mouseData => {
        if (mouseData.p) {
            lookAt.copy(mouseData.p);
            lookAt.y = entity.body.position.y;
            entity.body.lookAt(lookAt);
        }

        entity.keyboard.mouse.b = mouseData.b;
        entity.keyboard.mouse.d = mouseData.d;

        if (entity[PROPS.status] !== STATUS.Fighting && entity.keyboard.isButtonPressed('left')) {
            entity.runScript('fight');
        }
    });

    entity.addScript('movement', MovementFactory(entity));
    entity.addScript('fight', () => {
        entity[PROPS.status] = STATUS.Fighting;

        let entities = Game.getWorldEntities(entity, 3);
        for (let i in entities) {
            if (i !== entity.id) {
                if (entities[i][PROPS.netType] === NET_TYPES.Tree) {
                    Game.children[i].runScript('fight');
                }
            }
        }

        setTimeout(() => entity[PROPS.status] = STATUS.Static, 400);
    });


    entity.addScript('start', (dt) => {
        entity.runScript('movement', dt);
        entity.limit();
    });

    entity.addScript('tick', () => {
        // entity.runScript('fight');
    });

    entity.addScript('end', () => {
        entity.keyboard.pressedKeys = [];
        entity.keyboard.mouse.b = [];
        entity.keyboard.mouse.d = 0;
    });
};

module.exports = Factory;
