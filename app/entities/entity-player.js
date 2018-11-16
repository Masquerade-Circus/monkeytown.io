
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
            entity.every(400, (dt) => {
                entity.body.position.x += 5 * dt;
            });
        },
        initClient(entity) {

        }
    };
};

module.exports = Factory;
