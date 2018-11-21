const TinyAnimate = require('TinyAnimate');

let AppleFactory = function () {
    let applesGeometry = new THREE.Geometry();
    let geometry = new THREE.SphereGeometry(0.3, 16, 16);

    geometry.translate(0, 1.7, 0);
    applesGeometry.merge(geometry);

    geometry.translate(-1, -1, -1);
    applesGeometry.merge(geometry);

    geometry.translate(0, 0, 2);
    applesGeometry.merge(geometry);

    geometry.translate(2, 0, 0);
    applesGeometry.merge(geometry);

    geometry.translate(0, 0, -2);
    applesGeometry.merge(geometry);

    let buffGeometry = new THREE.BufferGeometry().fromGeometry(applesGeometry);
    let material = new THREE.MeshStandardMaterial({ color: 0xff1122, side: THREE.DoubleSide, roughness: 1, metalness: 0 });
    let apples = new THREE.Mesh(buffGeometry, material);
    apples.position.set(0, 0, 0);
    return apples;
};

let BushFactory = function () {
    let ico = new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(2),
        new THREE.MeshStandardMaterial({color: 0x085f23, metalness: 0, roughness: 0.2})
    );
    ico.position.set(0, -0.4, 0);
    ico.castShadow = true;
    ico.receiveShadow = true;
    ico.add(AppleFactory());
    ico.scale.set(0.7, 0.7, 0.7);
    return ico;
};

let Factory = () => {
    return {
        Model: BushFactory(),
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
                        TinyAnimate.animate(0, -0.3, 100, Fighting.update, 'easeIn', () => {
                            TinyAnimate.animate(-0.3, 0, 400, Fighting.update, 'easeOut', () => {
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
