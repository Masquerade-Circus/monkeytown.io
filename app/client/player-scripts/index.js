import Entities from '../../entities';
const {PROPS} = Entities;
let Factory = (Game) => {
    Game.player.every(200, () => {
        let position = {
            x: Game.player[PROPS.position].x,
            y: Game.player[PROPS.position].y + 15,
            z: Game.player[PROPS.position].z + 12
        };
        Game.app.camera.position.lerp(position, 0.1);

        Game.app.camera.lookAt(Game.player.body.position);
    });

    Game.player.every(100, () => {
        if (Game.player && Game.player.socket) {
            let pressedKeys = Game.keyboard.pressedKeys;
            if (
                pressedKeys.length > 0 &&
                Game.keyboard.target === Game.canvas
            ) {
                Game.player.socket.emit('keyboard', pressedKeys);
            }
        }
    });

};

export default Factory;
