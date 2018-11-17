let Factory = (entity) => {
    entity.every(800, (dt) => {
        entity.body.position.x += 20 * dt;
    });
    entity.addScript('movement', (dt, direction) => {
        let howMuch = 0.5 * dt;
        if (direction === 'left') {
            entity.body.position.x -= howMuch;
        }
        if (direction === 'right') {
            entity.body.position.x += howMuch;
        }
    });
    entity.addScript('start', (dt) => {
        entity.runScript('movement', dt, 'left');
    });
    entity.every(5000, () => {
        console.log(entity.keyboard.pressedKeys);
    });
};

module.exports = Factory;
