import Entities from '../../entities';
const {PROPS} = Entities;

let KeyboardScriptFactory = (Game) => {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let intersects;

    return () => {

        let mouseData = {
            b: Game.keyboard.mouse.b,
            d: Game.keyboard.mouse.d
        };

        if (
            mouse.x !== Game.keyboard.mouse.x || mouse.y !== Game.keyboard.mouse.y // Mouse moved
            || mouseData.b.length > 0 // Button pressed
            || mouseData.d !== 0 // Mousewheel event
        ) {
            mouse.x = Game.keyboard.mouse.x;
            mouse.y = Game.keyboard.mouse.y;
            mouseData.p = false;
            raycaster.setFromCamera(mouse, Game.app.camera);
            intersects = raycaster.intersectObjects([Game.app.ground]);
            if (intersects.length === 1) {
                mouseData.p = {
                    x: intersects[0].point.x,
                    y: intersects[0].point.y,
                    z: intersects[0].point.z
                };
            }
            Game.player.socket.emit('mouse', Game.fixedProps(mouseData));
        }

        if (
            Game.keyboard.pressedKeys.length > 0 &&
            Game.keyboard.target === Game.canvas
        ) {
            Game.player.socket.emit('keyboard', Game.keyboard.pressedKeys);
        }
    };
};

let Factory = (Game) => {
    Game.player.addScript('tick', () => {
        Game.app.camera.position.copy(Game.player.body.position);
        Game.app.camera.position.y += 15;
        // Game.app.camera.position.y += 230;
        Game.app.camera.position.z += 12;
        Game.app.camera.lookAt(Game.player.body.position);
    });


    Game.player.addScript('keyboard', KeyboardScriptFactory(Game));
    Game.player.every(100, () => {
        if (Game.keyboard.target === Game.canvas) {
            Game.player.runScript('keyboard');
        }
    });
};

export default Factory;
