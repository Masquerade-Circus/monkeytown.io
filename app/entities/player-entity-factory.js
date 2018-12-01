const Config = require('./config');
const TinyAnimate = require('TinyAnimate');

let Factory = () => {
    const {PROPS, INVENTORY, STATUS} = Config;
    return {
        Model: 'Monkey',
        initServer(entity) {

        },
        initClient(entity, Entities) {
            let Game = Entities.Game;
            let audio = new THREE.PositionalAudio(Game.app.listener);
            audio.setBuffer(Game.audio.fight);
            audio.setRefDistance(5);
            audio.setVolume(0.9);

            entity.body.add(audio);
            let Model = entity.body.getObjectByName('Model');
            let Fighting = {
                animating: false,
                animate() {
                    if (!Fighting.animating) {
                        Fighting.animating = true;
                        audio.play();
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

            let itemLevels = {
                0: '',
                1: 'Stone',
                2: 'Iron',
                3: 'Silver',
                4: 'Gold'
            };
            entity.getItem = (index) => {
                let id = Object.keys(INVENTORY)[index];
                let item = INVENTORY[id];
                if (item) {
                    let level = entity[PROPS.Inventory][id];
                    let response = Object.assign({}, item);
                    response.level = level;
                    response.damage = item.damage * level;
                    response.collect = item.collect * level;
                    response.range = level === 0 ? 0 : item.range;
                    response.fullName = `${itemLevels[level]}${item.name}`;
                    return response;
                }
            };

            let prevItem;
            entity.every(100, () => {
                if (!prevItem) {
                    prevItem = entity.getItem(entity[PROPS.Equiped]);
                }

                let newItem = entity.getItem(entity[PROPS.Equiped]);

                if (newItem && newItem.fullName !== prevItem.fullName) {

                    if (prevItem) {
                        let model = Model.getObjectByName(prevItem.fullName);
                        if (model) {
                            Model.remove(model);
                        }
                    }

                    if (newItem && Game.models[newItem.fullName]) {
                        let model = Game.models[newItem.fullName].clone();
                        model.name = newItem.fullName;
                        Model.add(model);
                    }

                    prevItem = newItem;
                }
            });

            let lifeBar = Game.cssModels.BarFactory('danger');
            lifeBar.name = 'life';
            Game.app.scene.add(lifeBar);
            entity.addScript('destroy', () => Game.app.scene.remove(lifeBar));
            entity.every(400, () => {
                let percent = entity[PROPS.Life] / entity[PROPS.MaxLife] * 100;
                lifeBar.element.firstChild.style.width = `${percent}%`;
            });
            entity.lifeBar = lifeBar;

            let name = entity.name;
            let label = Game.cssModels.LabelFactory(name);
            label.name = 'label';
            Game.app.scene.add(label);
            entity.addScript('destroy', () => Game.app.scene.remove(label));
            entity.every(1000, () => {
                if (entity.name && entity.name !== name) {
                    name = entity.name;
                    label.element.innerText = name;
                }
            });

            entity.addScript('tick', (dt) => {
                lifeBar.position.copy(entity.body.position);
                lifeBar.position.z -= 1.3;
                label.position.copy(entity.body.position);
                label.position.z -= 1.8;
                if (entity[PROPS.Status] === STATUS.Fighting) {
                    Fighting.animate();
                }
            });
        }
    };
};

module.exports = Factory;
