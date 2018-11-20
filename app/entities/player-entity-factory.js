const Config = require('./config');
const TinyAnimate = require('TinyAnimate');

let circle = function (rad, color, segments = 32) {
    let geometry = new THREE.CircleBufferGeometry(rad, segments);
    let material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide });
    let circle = new THREE.Mesh(geometry, material);
    circle.receiveShadow = true;
    return circle;
};

let MonkeyFactory = () => {
    let hand = circle(0.8, 0x542207);
    hand.position.set(-1.5, -1.5, -0.2);
    let r = circle(0.74, 0xefcfa6);
    r.position.set(0, 0, 0.1);
    hand.add(r);
    hand.castShadow = true;
    hand.receiveShadow = true;

    let hand2 = circle(0.8, 0x542207);
    hand2.position.set(1.5, -1.5, -0.2);
    let r2 = circle(0.74, 0xefcfa6);
    r2.position.set(0, 0, 0.1);
    hand2.add(r2);
    hand2.castShadow = true;
    hand2.receiveShadow = true;

    let ear = circle(0.6, 0x542207);
    ear.position.set(-2.1, 0, -0.2);
    let ei = circle(0.4, 0xe0ac7d);
    ei.position.set(0.1, -0.1, 0.1);
    ear.add(ei);
    ear.castShadow = true;
    ear.receiveShadow = true;

    let ear2 = circle(0.6, 0x542207);
    ear2.position.set(2.1, 0, -0.2);
    let ei2 = circle(0.4, 0xe0ac7d);
    ei2.position.set(-0.1, -0.1, 0.1);
    ear2.add(ei2);
    ear2.castShadow = true;
    ear2.receiveShadow = true;

    let monkey = circle(2, 0x542207);

    let mouth = circle(1, 0xefcfa6);
    mouth.position.set(0, -1, 0.1);
    let n = circle(0.1, 0x000000);
    n.position.set(-0.15, -0.15, 0.1);
    mouth.add(n);
    let n2 = circle(0.1, 0x000000);
    n2.position.set(0.15, -0.15, 0.1);
    mouth.add(n2);

    let eye1 = circle(1, 0xefcfa6);
    eye1.position.set(-0.9, -0.1, 0.1);
    let p = circle(0.3, 0x000000);
    p.position.set(0, -0.2, 0.1);
    eye1.add(p);
    let pl = circle(0.1, 0xffffff);
    pl.position.set(0, -0.1, 0.1);
    p.add(pl);

    let eye2 = circle(1, 0xefcfa6);
    eye2.position.set(0.9, -0.1, 0.1);
    let p2 = circle(0.3, 0x000000);
    p2.position.set(0, -0.2, 0.1);
    eye2.add(p2);
    let pl2 = circle(0.1, 0xffffff);
    pl2.position.set(0, -0.1, 0.1);
    p2.add(pl2);

    monkey.add(hand);
    monkey.add(hand2);
    monkey.add(ear2);
    monkey.add(ear);
    monkey.add(eye1);
    monkey.add(eye2);
    monkey.add(mouth);

    monkey.rotation.x = -(Math.PI / 2);
    monkey.scale.set(0.5, 0.5, 0.5);

    monkey.castShadow = true;
    monkey.receiveShadow = true;

    let object = new THREE.Object3D();
    object.add(monkey);
    return object;
};

let Factory = () => {

    return {
        Model: MonkeyFactory(),
        initServer(entity) {

        },
        initClient(entity) {
            let Model = entity.body.getObjectByName('Model');
            let Fighting = {
                animating: false,
                animate() {
                    if (!Fighting.animating) {
                        Fighting.animating = true;
                        TinyAnimate.animate(0, Math.PI / 2, 100, Fighting.update, 'easeIn', () => {
                            TinyAnimate.animate(Math.PI / 2, 0, 400, Fighting.update, 'easeOut', () => {
                                Fighting.animating = false;
                            });
                        });
                    }
                },
                update(rad) {
                    Model.rotation.y = rad;
                }
            };

            entity.addScript('tick', (dt) => {
                if (entity[Config.PROPS.status] === Config.STATUS.Fighting) {
                    Fighting.animate();
                }
            });
        }
    };
};

module.exports = Factory;
