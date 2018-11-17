
let Factory = () => {
    let Model = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    Model.receiveShadow = true;
    Model.castShadow = true;

    return {
        Model,
        initServer(entity) {

        },
        initClient(entity) {

        }
    };
};

module.exports = Factory;
