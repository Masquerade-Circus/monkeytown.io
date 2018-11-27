let RockFactory = (Type) => () => {
    let data;
    switch (Type) {
        case 'Gold':
            data = {color: 0xFFD700};
            break;
        case 'Silver':
            data = {color: 0xCBCDCD};
            break;
        case 'Iron':
            data = {color: 0x828383};
            break;
        case 'Stone':
            data = {color: 0x535454};
            break;
    }

    let ico = new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(2),
        new THREE.MeshStandardMaterial(data)
    );
    ico.position.set(0, -0.5, 0);
    ico.castShadow = true;
    ico.receiveShadow = true;
    ico.rotation.y = -Math.PI / Math.random() * 2;

    return ico;
};
export default RockFactory;
