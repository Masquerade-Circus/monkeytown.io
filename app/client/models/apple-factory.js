let AppleFactory = function () {
    let geometry = new THREE.SphereBufferGeometry(0.5, 16, 16);
    let material = new THREE.MeshStandardMaterial({ color: 0xff1122, side: THREE.DoubleSide, roughness: 1, metalness: 0 });
    let apples = new THREE.Mesh(geometry, material);
    apples.castShadow = true;
    apples.receiveShadow = true;
    apples.position.set(-0.9, 0, 1.2);
    return apples;
};

export default AppleFactory;
