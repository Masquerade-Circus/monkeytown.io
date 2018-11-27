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
                    return response;
                }
            };

            let prevItem;
            entity.every(5000, () => {
                if (!prevItem) {
                    prevItem = entity.getItem(entity[PROPS.Equiped]);
                }

                let newItem = entity.getItem(entity[PROPS.Equiped]);

                if (
                    newItem &&
                    (
                        newItem.name !== prevItem.name
                        || newItem.level !== prevItem.level
                    )
                ) {

                    if (prevItem) {
                        let model = entity.body.getObjectByName(prevItem.name);
                        if (model) {
                            Model.remove(model);
                        }
                    }

                    if (newItem && newItem.level > 0) {
                        entity.body.add(Entities.models[newItem.name].clone());
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
