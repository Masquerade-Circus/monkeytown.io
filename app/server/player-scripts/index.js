let MovementFactory = require('./movement-script-factory');
let KeyboardFactory = require('../../shared/keyboard-factory');

let Factory = (entity) => {
    let lookAt = new THREE.Vector3();
    entity.keyboard = KeyboardFactory();
    entity.socket.on('keyboard', keys => entity.keyboard.pressedKeys = keys);
    entity.socket.on('mouse', point => {
        lookAt.copy(point);
    });

    entity.addScript('movement', MovementFactory(entity));
    entity.addScript('start', (dt) => {
        entity.body.lookAt(lookAt);
        entity.runScript('movement', dt);
    });
    entity.every(5000, () => {

    });
    entity.addScript('end', () => {
        entity.keyboard.pressedKeys = [];
    });
};

module.exports = Factory;
