let Entities = require('../../entities');
let {PROPS, STATUS, NET_TYPES, RESOURCES, INVENTORY} = Entities;

let Factory = (entity) => {
    entity[PROPS.HasDied] = false;
    entity.die = () => {
        entity[PROPS.HasDied] = true;
        entity.needsUpdate = true;
        entity.remove = true;
    };
    entity.applyDamage = (damage) => {
        entity[PROPS.Life] -= damage;
        if (entity[PROPS.Life] < 0) {
            entity[PROPS.Life] = 0;
            entity.die();
        }
    };
    entity.addScript('fight', () => {

        if (!entity[PROPS.HasDied] && entity.keyboard.isButtonPressed('left') && entity[PROPS.Status] !== STATUS.Fighting) {
            entity[PROPS.Status] = STATUS.Fighting;
            let item = entity.getEquipedItem();
            // {damage: 2, range: 0, collect: 0.05, life: 0}

            if (item.life > 0) {
                if (
                    entity[PROPS.Resources][RESOURCES.Food] > 0
                    && entity[PROPS.Life] < entity[PROPS.MaxLife]
                ) {
                    let life = Math.min(item.life, entity[PROPS.Resources][RESOURCES.Food]);
                    entity[PROPS.Life] += life;
                    entity[PROPS.Resources][RESOURCES.Food] -= life;
                    if (entity[PROPS.Life] > entity[PROPS.MaxLife]) {
                        entity[PROPS.Life] = entity[PROPS.MaxLife];
                    }
                    entity.needsUpdate = true;
                }
            } else {
                let entities = Game.getWorldEntities(entity, 3 + item.range);
                for (let i in entities) {
                    if (i !== entity.id && Game.children[i]) {
                        if (entities[i][PROPS.NetType] !== NET_TYPES.Player) {
                            Game.children[i].runScript('fight');
                        }

                        let random = (0 | Math.random() * 101) - item.collect;

                        switch (entities[i][PROPS.NetType]) {
                            case NET_TYPES.Sheep:
                                Game.children[i].applyDamage(item.damage + 5);
                                if (Game.children[i][PROPS.HasDied]) {
                                    entity[PROPS.Resources][RESOURCES.Food] += 10;
                                    entity[PROPS.Resources][RESOURCES.Gold] += 10;
                                }
                                break;
                            case NET_TYPES.Player:
                                Game.children[i].applyDamage(item.damage + 5);
                                break;
                            case NET_TYPES.Tree:
                                if (random <= 70) {
                                    entity[PROPS.Resources][RESOURCES.Wood] += 3;
                                    entity[PROPS.Resources][RESOURCES.Food] += 1;
                                }
                                break;
                            case NET_TYPES.Stone:
                                if (random <= 70) {
                                    entity[PROPS.Resources][RESOURCES.Stone] += 1;
                                }
                                break;
                            case NET_TYPES.Bush:
                                if (random <= 70) {
                                    entity[PROPS.Resources][RESOURCES.Food] += 3;
                                }
                                break;
                            case NET_TYPES.Iron:
                                if (random <= 60) {
                                    entity[PROPS.Resources][RESOURCES.Iron] += 1;
                                }
                                break;
                            case NET_TYPES.Silver:
                                if (random <= 40) {
                                    entity[PROPS.Resources][RESOURCES.Silver] += 1;
                                }
                                break;
                            case NET_TYPES.Gold:
                                if (random <= 20) {
                                    entity[PROPS.Resources][RESOURCES.Gold] += 1;
                                }
                                break;
                        }

                        entity.needsUpdate = true;
                    }
                }
            }

            setTimeout(() => entity[PROPS.Status] = STATUS.Static, 500);
        }
    });
};

module.exports = Factory;
