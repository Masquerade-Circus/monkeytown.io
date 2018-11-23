let KeyboardFactory = require('../../shared/keyboard-factory');
let Factory = (entity) => {
    let lookAt = new THREE.Vector3();
    entity.keyboard = KeyboardFactory();
    entity.socket.on('keyboard', (type, data) => {
        if (type === 'mousemove') {
            lookAt.copy(data);
            lookAt.y = entity.body.position.y;
            entity.body.lookAt(lookAt);
        }

        if (type === 'mousedown' || type === 'mouseup') {
            entity.keyboard.mouse.b = data;
        }

        if (type === 'mousewheel') {
            entity.keyboard.mouse.d = data;
        }

        if (type === 'keydown' || type === 'keyup') {
            entity.keyboard.pressedKeys = data;
        }

        entity.keyboard.run(type, data);
    });
};

module.exports = Factory;
