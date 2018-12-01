let Entities = require('../entities');
let {PROPS, NET_TYPES} = Entities;

let Factory = (Game) => {

    for (let world in Game.worlds) {
        for (let i = 40; i--;) {
            Game.addEntity(Entities.create({
                [PROPS.NetType]: NET_TYPES.Tree,
                [PROPS.Position]: Game.getRandomPointInRegion(),
                world
            }));
        }

        for (let i = 4; i--;) {
            Game.addEntity(Entities.create({
                [PROPS.NetType]: NET_TYPES.Gold,
                [PROPS.Position]: Game.getRandomPointInRegion(),
                world
            }));
        }
        for (let i = 6; i--;) {
            Game.addEntity(Entities.create({
                [PROPS.NetType]: NET_TYPES.Silver,
                [PROPS.Position]: Game.getRandomPointInRegion(),
                world
            }));
        }
        for (let i = 10; i--;) {
            Game.addEntity(Entities.create({
                [PROPS.NetType]: NET_TYPES.Iron,
                [PROPS.Position]: Game.getRandomPointInRegion(),
                world
            }));
        }
        for (let i = 20; i--;) {
            Game.addEntity(Entities.create({
                [PROPS.NetType]: NET_TYPES.Stone,
                [PROPS.Position]: Game.getRandomPointInRegion(),
                world
            }));
        }

        for (let i = 20; i--;) {
            Game.addEntity(Entities.create({
                [PROPS.NetType]: NET_TYPES.Bush,
                [PROPS.Position]: Game.getRandomPointInRegion(),
                world
            }));
        }

        for (let i = 30; i--;) {
            Game.addEntity(Entities.create({
                [PROPS.NetType]: NET_TYPES.Sheep,
                [PROPS.Position]: Game.getRandomPointInRegion(),
                world
            }));
        }
    }


};

module.exports = Factory;
