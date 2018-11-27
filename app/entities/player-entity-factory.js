const Config = require('./config');
const TinyAnimate = require('TinyAnimate');

let Factory = () => {
    const {PROPS, INVENTORY, STATUS} = Config;
    return {
        Model: 'Monkey',
        initServer(entity) {

        },
        initClient(entity, Entities) {
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

            let itemLevels = {
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

                if (newItem.fullName !== prevItem.fullName) {

                    if (prevItem) {
                        let model = Model.getObjectByName(prevItem.fullName);
                        if (model) {
                            Model.remove(model);
                        }
                    }

                    if (newItem.level > 0) {
                        let model = Entities.models[newItem.fullName].clone();
                        model.name = newItem.fullName;
                        Model.add(model);
                    }

                    prevItem = newItem;
                }
            });

            entity.addScript('tick', (dt) => {
                if (entity[PROPS.Status] === STATUS.Fighting) {
                    Fighting.animate();
                }
            });
        }
    };
};

module.exports = Factory;
