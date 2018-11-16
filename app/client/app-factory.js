
let AppFactory = function () {
    let app = {};

    app.scene = new THREE.Scene();
    app.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    app.camera.position.set(0, 100, 100);
    app.camera.lookAt(new THREE.Vector3(0, 0, 0));
    app.scene.add(app.camera);

    app.mixer = new THREE.AnimationMixer(app.scene);

    app.listener = new THREE.AudioListener();
    app.camera.add(app.listener);

    app.renderer = new THREE.WebGLRenderer({ antialias: true });
    app.renderer.setPixelRatio(window.devicePixelRatio);
    app.renderer.setSize(window.innerWidth, window.innerHeight);
    app.renderer.shadowMap.enabled = true;
    app.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    window.addEventListener('resize', function () {
        app.camera.aspect = window.innerWidth / window.innerHeight;
        app.camera.updateProjectionMatrix();
        app.renderer.setSize(window.innerWidth, window.innerHeight);
    });
    document.body.appendChild(app.renderer.domElement);
    app.renderer.domElement.setAttribute('tabindex', '0');
    app.renderer.domElement.setAttribute('id', 'game-canvas');

    app.light = new THREE.DirectionalLight(0xffffff, 0.9);
    app.light.position.set(2, 4, 3);
    app.light.castShadow = true;
    app.scene.add(app.light);

    app.ambientlight = new THREE.AmbientLight(0x999999);
    app.scene.add(app.ambientlight);


    app.ground = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshStandardMaterial({color: 0x9cff57, side: THREE.DoubleSide})
    );
    app.ground.rotation.x = -(Math.PI / 2);
    app.ground.castShadow = false;
    app.ground.receiveShadow = true;
    app.ground.position.set(0, 0, 0);
    app.scene.add(app.ground);

    return app;
};

export default AppFactory;
