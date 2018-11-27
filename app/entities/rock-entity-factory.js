const TinyAnimate = require('TinyAnimate');

let Factory = (Type = 'Stone') => () => {

    return {
        Model: Type,
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
