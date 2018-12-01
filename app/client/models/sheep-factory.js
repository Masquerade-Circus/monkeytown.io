let circle = function (rad, color, segments = 32) {
    let geometry = new THREE.CircleBufferGeometry(rad, segments);
    let material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide });
    let circle = new THREE.Mesh(geometry, material);
    circle.receiveShadow = true;
    return circle;
};

let SheepFactory = () => {
    let i = 0.6;
    let sheep = circle(2, 0xeeedeb);
    sheep.rotation.x = -(Math.PI / 2);
    sheep.scale.set(0.5, 0.5, 0.5);
    sheep.castShadow = true;
    sheep.receiveShadow = true;

    let eye1 = circle(0.2, 0x000000);
    eye1.position.set(-0.3, -0.2, 0.2);
    let pl1 = circle(0.06, 0xffffff);
    pl1.position.set(0, -0.05, 0.2);
    eye1.add(pl1);
    eye1.castShadow = true;
    eye1.receiveShadow = true;
    sheep.add(eye1);

    let eye2 = circle(0.2, 0x000000);
    eye2.position.set(0.3, -0.2, 0.2);
    let pl2 = circle(0.06, 0xffffff);
    pl2.position.set(0, -0.05, 0.2);
    eye2.add(pl2);
    sheep.add(eye2);


    let shape = new THREE.Shape();
    shape.lineTo(i * 1, 0);
    shape.quadraticCurveTo (i * 2, i * -2.5, i * 1, i * -3);
    shape.quadraticCurveTo (0, i * -3.6, i * -1, i * -3);
    shape.quadraticCurveTo (i * -2, i * -2.5, i * -1, 0);
    let mouth = new THREE.Mesh(
        new THREE.ShapeGeometry(shape),
        new THREE.MeshStandardMaterial({ color: 0x515358, side: THREE.DoubleSide })
    );
    mouth.position.set(0, 0.5, 0.1);
    mouth.castShadow = true;
    mouth.receiveShadow = true;
    sheep.add(mouth);

    let head = circle(0.8, 0xeeedeb);
    head.position.set(0, 0.7, 0.12);
    head.scale.set(1, 0.7, 1);
    head.castShadow = true;
    head.receiveShadow = true;
    sheep.add(head);

    let k = 0.16;
    let earshape = new THREE.Shape();
    earshape.lineTo(k * 0.5, 0);
    earshape.quadraticCurveTo (k * 0.3, k * -4, k * 1, k * -6);
    earshape.quadraticCurveTo (0, k * -7.2, k * -1, k * -6);
    earshape.quadraticCurveTo (k * -2, k * -4, k * -0.5, 0);
    let ear = new THREE.Mesh(
        new THREE.ShapeGeometry(earshape),
        new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide })
    );
    ear.position.set(-0.5, 0.6, 0.1);
    ear.rotation.z = -Math.PI / 4;
    ear.castShadow = true;
    ear.receiveShadow = true;
    sheep.add(ear);

    let ear2 = new THREE.Mesh(
        new THREE.ShapeGeometry(earshape),
        new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide })
    );
    ear2.position.set(0.5, 0.6, 0.1);
    ear2.rotation.z = -Math.PI / 4;
    ear2.rotation.y = Math.PI;
    ear2.castShadow = true;
    ear2.receiveShadow = true;
    sheep.add(ear2);

    let object = new THREE.Object3D();
    object.add(sheep);
    return object;
};

export default SheepFactory;
