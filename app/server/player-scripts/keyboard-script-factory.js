let KeyboardFactory = require('../../shared/keyboard-factory');
let Factory = (entity) => {
    let lookAt = new THREE.Vector3();
    entity.keyboard = KeyboardFactory();
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

        if (entity.keyboard.isButtonPressed('left')) {
            entity.runScript('fight');
        }
    });
};

module.exports = Factory;
