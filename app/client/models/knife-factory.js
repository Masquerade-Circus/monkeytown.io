let KnifeFactory = (Type) => () => {
    let color;
    switch (Type) {
        case 'Gold':
            color = 0xFFD700;
            break;
        case 'Silver':
            color = 0xCBCDCD;
            break;
        case 'Iron':
            color = 0x828383;
            break;
        case 'Stone':
            color = 0x535454;
            break;
    }

    let i = 0.3;

    let shape = new THREE.Shape();

    shape.lineTo(i * 1, 0);
    shape.lineTo(i * 1, i * 4);
    shape.bezierCurveTo (0, i * 3, 0, i * 2, 0, 0);

    let mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(shape),
        new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide })
    );
    mesh.position.set(-1, 0, 1);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    let plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(i / 2, i * 2, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x542207, side: THREE.DoubleSide })
    );
    plane.position.set(i / 2, -i, 0);
    plane.castShadow = true;
    plane.receiveShadow = true;

    mesh.add(plane);
    mesh.name = 'Knife';
    return mesh;
};

export default KnifeFactory;
