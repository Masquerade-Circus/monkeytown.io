const TinyAnimate = require('TinyAnimate');
let TreeFactory = function () {

    let cylinder = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(0.2, 0.5, 2, 32),
        new THREE.MeshStandardMaterial({color: 0x542207})
    );

    let ico = new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(2),
        new THREE.MeshStandardMaterial({color: 0x087f23})
    );
    ico.position.set(0, 2, 0);
    ico.castShadow = true;
    ico.receiveShadow = true;
    ico.name = 'top';

    cylinder.add(ico);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    return cylinder;
};
let Factory = () => {
    return {
        Model: TreeFactory(),
        initServer(entity) {
            const Config = require('./config');
            entity.addScript('fight', () => {
                entity[Config.PROPS.Status] = Config.STATUS.Fighting;
                setTimeout(() => entity[Config.PROPS.Status] = Config.STATUS.Static, 400);
            });
        },
        initClient(entity) {
            const Config = require('./config');
            let TreeModel = entity.body.getObjectByName('Model');
            let Model = TreeModel.getObjectByName('top');
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
