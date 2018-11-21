const TinyAnimate = require('TinyAnimate');
let RockFactory = function (Type) {
    let data;
    switch (Type) {
        case 'gold':
            data = {color: 0xFFD700};
            break;
        case 'silver':
            data = {color: 0xCBCDCD};
            break;
        case 'iron':
            data = {color: 0x828383};
            break;
        case 'stone':
            data = {color: 0x535454};
            break;
    }

    let ico = new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(2),
        new THREE.MeshStandardMaterial(data)
    );
    ico.position.set(0, -0.5, 0);
    ico.castShadow = true;
    ico.receiveShadow = true;
    ico.rotation.y = -Math.PI / Math.random() * 2;

    return ico;
};

let Factory = (Type = 'stone') => () => {

    return {
        Model: RockFactory(Type),
        initServer(entity) {
            const Config = require('./config');
            entity.addScript('fight', () => {
                entity[Config.PROPS.Status] = Config.STATUS.Fighting;
                setTimeout(() => entity[Config.PROPS.Status] = Config.STATUS.Static, 400);
            });
        },
        initClient(entity) {
            const Config = require('./config');
            let Model = entity.body.getObjectByName('Model');
            let Fighting = {
                animating: false,
                animate() {
                    if (!Fighting.animating) {
                        Fighting.animating = true;
                        TinyAnimate.animate(0, -0.5, 100, Fighting.update, 'easeIn', () => {
                            TinyAnimate.animate(-0.5, 0, 400, Fighting.update, 'easeOut', () => {
                                Fighting.animating = false;
                            });
                        });
                    }
                },
                update(pos) {
                    Model.position.z = pos;
                }
            };

            entity.addScript('tick', (dt) => {
                if (entity[Config.PROPS.Status] === Config.STATUS.Fighting) {
                    Fighting.animate();
                }
            });
        }
    };
};

module.exports = Factory;
