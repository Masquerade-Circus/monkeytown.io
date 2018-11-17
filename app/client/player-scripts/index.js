let Factory = (Game) => {
    // We will set the player scripts in here
    Game.app.camera.position.set(0, 15, 12);
    Game.app.camera.lookAt(0, 0, 0);
    Game.player.every(5000, () => {
        console.log(Game.keyboard.pressedKeys);
        console.log(Game.keyboard.target);
        console.log(Game.keyboard.target === Game.canvas);
    });
};

export default Factory;
