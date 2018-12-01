const TinyAnimate = require('TinyAnimate');

let Factory = () => {
    return {
        Model: 'Sheep',
        initServer(entity, Entities) {
            const Game = Entities.Game;
            const Config = require('./config');
            const {PROPS, STATUS, NET_TYPES} = Config;
            entity.addScript('fight', () => {
                entity[PROPS.Status] = STATUS.Fighting;
                setTimeout(() => entity[PROPS.Status] = STATUS.Static, 400);
            });

            entity[PROPS.HasDied] = false;
            entity[PROPS.Life] = 30;
            entity[PROPS.MaxLife] = 30;

            entity.applyDamage = (damage) => {
                entity[PROPS.Life] -= damage;
                if (entity[PROPS.Life] < 0) {
                    entity[PROPS.Life] = 0;
                    entity[PROPS.HasDied] = true;
                    entity.remove = true;
                    Game.addEntity(Entities.create({
                        [PROPS.NetType]: NET_TYPES.Sheep,
                        [PROPS.Position]: Game.getRandomPointInRegion(),
                        world: entity.world
                    }));
                    return;
                }
                entity.ai.receivedDamage();
            };

            entity.ai = {};
            entity.ai.direction = null;
            entity.ai.timeout = null;
            entity.ai.damaged = false;
            entity.ai.randomMovement = function (distance = 10) {
                let position = entity.body.position.clone();
                entity.ai.direction = Game.getRandomPointInRegion({
                    x: position.x - distance,
                    x2: position.x + distance,
                    y: position.y,
                    y2: position.y,
                    z: position.z - distance,
                    z2: position.z + distance
                });
                let randomTime = Game.getRandomNumber(5000, 7000);
                clearTimeout(entity.ai.timeout);
                entity.ai.timeout = setTimeout(() => entity.ai.randomMovement(), randomTime);
            };
            entity.ai.randomMovement();
            entity.ai.receivedDamage = function () {
                if (!entity.ai.damaged) {
                    entity.ai.damaged = true;
                    entity.ai.randomMovement(40);
                    setTimeout(() => entity.ai.damaged = false, 5000);
                }
            };

            entity.addScript('start', () => {
                let direction = new THREE.Vector3(
                    entity.ai.direction.x,
                    entity.ai.direction.y,
                    entity.ai.direction.z
                );
                entity.body.lookAt(direction);
                entity.body.position.lerp(direction, 0.01);
                entity.limit();
            });
        },
        initClient(entity, {Game}) {
            const Config = require('./config');
            const {PROPS} = Config;
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

            let lifeBar = Game.cssModels.BarFactory('danger');
            lifeBar.name = 'life';
            Game.app.scene.add(lifeBar);
            entity.addScript('destroy', () => Game.app.scene.remove(lifeBar));
            entity.every(400, () => {
                let percent = entity[PROPS.Life] / entity[PROPS.MaxLife] * 100;
                lifeBar.element.firstChild.style.width = `${percent}%`;
            });
            entity.lifeBar = lifeBar;

            entity.addScript('tick', (dt) => {
                lifeBar.position.copy(entity.body.position);
                lifeBar.position.z -= 1.8;
                if (entity[Config.PROPS.Status] === Config.STATUS.Fighting) {
                    Fighting.animate();
                }
            });
        }
    };
};

module.exports = Factory;
