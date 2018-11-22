import KeyboardScriptFactory from './keyboard-script-factory';
import {PROPS, RESOURCES, INVENTORY} from '../../entities/config';

let Factory = (Game) => {
    Game.player[PROPS.Resources] = {};
    Object.values(RESOURCES).forEach(item => Game.player[PROPS.Resources][item] = 0);

    Game.player[PROPS.Inventory] = {};
    Object.values(INVENTORY).forEach(item => Game.player[PROPS.Inventory][item.id] = 0);

    Game.player.addScript('buy', (name) => {
        Game.player.socket.emit('buy', name);
    });

    Game.socket.on('updatePlayer', data => {
        if (Game.player) {
            Object.assign(Game.player, data);
        }
    });

    // Camera
    Game.player.addScript('topDownCamera', (dt) => {
        Game.app.camera.position.copy(Game.player.body.position);
        Game.app.camera.position.y += 15;
        // Game.app.camera.position.y += 220;
        Game.app.camera.position.z += 8;
        Game.app.camera.lookAt(Game.player.body.position);
    });

    Game.player.addScript('tick', (dt) => {
        Game.player.runScript('topDownCamera', dt);
    });

    Game.player.addScript('keyboard', KeyboardScriptFactory(Game));
    Game.player.addScript('end', () => {
        if (Game.keyboard.target === Game.canvas) {
            Game.player.runScript('keyboard');
        }
    });
};

export default Factory;
