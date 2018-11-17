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
    Game.app.camera.position.set(0, 15, 12);
    Game.app.camera.lookAt(0, 0, 0);


    Game.player.addScript('keyboard', KeyboardScriptFactory(Game));
    Game.player.every(100, () => {
        if (
            Game.player
            && Game.player.socket
            && Game.keyboard.target === Game.canvas
        ) {
            Game.player.runScript('keyboard');
        }
    });

};

export default Factory;
