import Entities from '../../entities';
const {PROPS} = Entities;

let KeyboardScriptFactory = (Game) => {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let intersects;

    return () => {
        if (
            mouse.x !== Game.keyboard.mouse.x
            || mouse.y !== Game.keyboard.mouse.y
        ) {
            mouse.x = Game.keyboard.mouse.x;
            mouse.y = Game.keyboard.mouse.y;
            raycaster.setFromCamera(mouse, Game.app.camera);
            intersects = raycaster.intersectObjects([Game.app.ground]);
            if (intersects.length === 1) {
                Game.player.socket.emit('mouse', Game.fixedProps(intersects[0].point));
            }
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
