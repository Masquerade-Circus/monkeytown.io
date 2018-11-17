
let AppFactory = function (Game) {
    Game.app = {};

    Game.app.scene = new THREE.Scene();
    Game.app.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    Game.app.camera.position.set(0, 100, 100);
    Game.app.camera.lookAt(new THREE.Vector3(0, 0, 0));
    Game.app.scene.add(Game.app.camera);

    Game.app.mixer = new THREE.AnimationMixer(Game.app.scene);

    Game.app.listener = new THREE.AudioListener();
    Game.app.camera.add(Game.app.listener);

    Game.app.renderer = new THREE.WebGLRenderer({ antialias: true });
    Game.app.renderer.setPixelRatio(window.devicePixelRatio);
    Game.app.renderer.setSize(window.innerWidth, window.innerHeight);
    Game.app.renderer.shadowMap.enabled = true;
    Game.app.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    Game.canvas = Game.app.renderer.domElement;

    document.body.appendChild(Game.canvas);
    Game.canvas.setAttribute('tabindex', '0');
    Game.canvas.setAttribute('id', 'game-canvas');

    window.addEventListener('resize', function () {
        Game.app.camera.aspect = window.innerWidth / window.innerHeight;
        Game.app.camera.updateProjectionMatrix();
        Game.app.renderer.setSize(window.innerWidth, window.innerHeight);
    });


    Game.app.light = new THREE.DirectionalLight(0xffffff, 0.9);
    Game.app.light.position.set(20, 40, 30);
    Game.app.light.position.multiplyScalar(2);

    Game.app.light.shadow.camera.left = -20;
    Game.app.light.shadow.camera.right = 20;
    Game.app.light.shadow.camera.top = 20;
    Game.app.light.shadow.camera.bottom = -20;
    Game.app.light.shadow.mapSize.width = 2048;
    Game.app.light.shadow.mapSize.height = 2048;

    Game.app.light.castShadow = true;
    Game.app.scene.add(Game.app.light);

    Game.app.ambientlight = new THREE.AmbientLight(0x999999);
    Game.app.scene.add(Game.app.ambientlight);

    Game.app.hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
    Game.app.scene.add(Game.app.hemiLight);


    Game.app.ground = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.MeshStandardMaterial({color: 0x9cff57, side: THREE.DoubleSide})
    );
    Game.app.ground.rotation.x = -(Math.PI / 2);
    Game.app.ground.castShadow = false;
    Game.app.ground.receiveShadow = true;
    Game.app.ground.position.set(0, -1, 0);
    Game.app.scene.add(Game.app.ground);
};

export default AppFactory;
