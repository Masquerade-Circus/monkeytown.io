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
    shape.moveTo(i / 4, 0, 0);
    shape.lineTo(i * 1.5, 0);
    shape.lineTo(i * 2, i);
    shape.lineTo(i, i * 5);
    shape.lineTo(-0.05, i);

    let mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(shape),
        new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide })
    );
    mesh.position.set(-1.4, 0, 1.2);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    let plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(i, i * 10, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x542207, side: THREE.DoubleSide })
    );
    plane.position.set(i * 0.9, -i * 5, 0);
    plane.castShadow = true;
    plane.receiveShadow = true;

    mesh.add(plane);
    mesh.name = 'Knife';
    return mesh;
};

export default KnifeFactory;
