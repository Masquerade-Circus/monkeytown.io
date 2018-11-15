let test = function (app) {
    let entity = Entities.create({
        [Entities.PROPS.netType]: 1
    });

    Game.addEntity(entity);

    app.camera.position.set(0, 10, 10);
    app.camera.lookAt(entity.body.position);

    // remove entity after 5 seconds
    setTimeout(() => entity.destroy(), 5000);
};

export default test;
