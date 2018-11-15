let test = function (app) {
    let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    sphere.position.set(0, 1, 0);
    app.scene.add(sphere);

    app.camera.position.set(0, 10, 10);
    app.camera.lookAt(sphere.position);
};

export default test;
