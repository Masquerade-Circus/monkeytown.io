let MovementFactory = require('./movement-script-factory');
let KeyboardFactory = require('../../shared/keyboard-factory');

let Factory = (entity) => {
    let lookAt = new THREE.Vector3();
    entity.keyboard = KeyboardFactory();
    entity.socket.on('keyboard', keys => entity.keyboard.pressedKeys = keys);
    entity.socket.on('mouse', mouseData => {
        if (mouseData.p) {
            lookAt.copy(mouseData.p);
            lookAt.y = entity.body.position.y;
            entity.body.lookAt(lookAt);
        }

        entity.keyboard.mouse.b = mouseData.b;
        entity.keyboard.mouse.d = mouseData.d;
    });

    entity.addScript('movement', MovementFactory(entity));
    entity.addScript('start', (dt) => {
        entity.runScript('movement', dt);
        entity.limit();
    });
    entity.every(5000, () => {

    });
    entity.addScript('end', () => {
        entity.keyboard.pressedKeys = [];
        entity.keyboard.mouse.b = [];
        entity.keyboard.mouse.d = 0;
    });
};

module.exports = Factory;
