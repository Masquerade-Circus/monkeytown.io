import KeyboardScriptFactory from './keyboard-script-factory';

let Factory = (Game) => {
    // Camera
    Game.player.addScript('topDownCamera', (dt) => {
        Game.app.camera.position.copy(Game.player.body.position);
        Game.app.camera.position.y += 15;
        // Game.app.camera.position.y += 230;
        Game.app.camera.position.z += 12;
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
