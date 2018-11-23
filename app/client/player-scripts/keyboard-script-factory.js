let KeyboardScriptFactory = (Game) => {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let intersects;

    Game.keyboard.onChange((type, data) => {
        if (Game.keyboard.target === Game.canvas) {
            if (type === 'mousemove') {
                if (mouse.x !== data.x || mouse.y !== data.y) {
                    mouse.x = data.x;
                    mouse.y = data.y;
                    raycaster.setFromCamera(mouse, Game.app.camera);
                    intersects = raycaster.intersectObjects([Game.app.ground]);
                    if (intersects.length === 1) {
                        let p = {
                            x: intersects[0].point.x,
                            y: intersects[0].point.y,
                            z: intersects[0].point.z
                        };
                        Game.player.socket.emit('keyboard', type, Game.fixedProps(p));
                    }
                }
                return;
            }

            Game.player.socket.emit('keyboard', type, data);
        }
    });
};

export default KeyboardScriptFactory;
