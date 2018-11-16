
let Factory = () => {
    let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    sphere.receiveShadow = true;
    sphere.castShadow = true;

    return {
        Model: sphere,
        initServer(entity) {
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
        },
        initClient(entity) {

        }
    };
};

module.exports = Factory;
