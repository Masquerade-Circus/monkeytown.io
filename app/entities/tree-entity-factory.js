let TreeFactory = function () {
    let cylinder = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(0.2, 0.5, 2, 32),
        new THREE.MeshStandardMaterial({color: 0x542207})
    );

    let ico = new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(2),
        new THREE.MeshStandardMaterial({color: 0x087f23})
    );
    ico.position.set(0, 2, 0);
    ico.castShadow = true;
    ico.receiveShadow = true;

    cylinder.add(ico);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    let entity = new THREE.Object3D();
    entity.add(cylinder);
    return entity;
};
let Factory = () => {

    return {
        Model: TreeFactory(),
        initServer(entity) {

        },
        initClient(entity) {

        }
    };
};

module.exports = Factory;
