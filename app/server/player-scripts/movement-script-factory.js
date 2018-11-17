let Factory = (entity) => (dt) => {
    let howMuch = 20 * dt;
    let x = 0;
    let z = 0;

    if (entity.keyboard.isKeyPressed('w')) {
        z = -1;
    }
    if (entity.keyboard.isKeyPressed('s')) {
        z = 1;
    }

    if (entity.keyboard.isKeyPressed('a')) {
        x = -1;
    }
    if (entity.keyboard.isKeyPressed('d')) {
        x = 1;
    }

    // Handle diagonal movement reducing the speed
    if (x !== 0 && z !== 0) {
        howMuch = howMuch / 1.414;
    }

    if (x !== 0) {
        entity.body.position.x += howMuch * x;
    }

    if (z !== 0) {
        entity.body.position.z += howMuch * z;
    }
};

module.exports = Factory;
