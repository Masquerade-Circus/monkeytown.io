

let test = function (Game) {
    let gridHelper = new THREE.GridHelper(200, 200);
    Game.app.scene.add(gridHelper);
    // Game.app.scene.add(Game.models.StoneKnife);
};

export default test;
