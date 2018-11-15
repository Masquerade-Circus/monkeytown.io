let test = function (Game) {
    let entity = Entities.create({
        [Entities.PROPS.netType]: 1
    });

    Game.addEntity(entity);

    Game.app.camera.position.set(0, 10, 10);
    Game.app.camera.lookAt(entity.body.position);

    // remove entity after 5 seconds
    setTimeout(() => entity.destroy(), 5000);

    Game.connection.connectServer();
};

export default test;
