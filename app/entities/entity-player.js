let ModelFactory = () => {
    let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    return sphere;
};

let ServerUpdate = (entity) => (dt) => {
    entity.body.position.x += 1 * dt;
};

let ClientUpdate = (entity) => (dt) => {
    // entity.body.position.x += 1 * dt;
};

let Factory = () => {
    return {
        Model: ModelFactory(),
        ServerUpdate,
        ClientUpdate
    };
};

module.exports = Factory;
