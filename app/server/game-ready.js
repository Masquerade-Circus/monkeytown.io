let Entities = require('../entities');
let {PROPS, NET_TYPES} = Entities;

let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getRandomPointInRegion = (region = {x: -100, x2: 100, y: 0, y2: 0, z: -100, z2: 100}) => {
    let point = {
        x: region.x2 !== region.x
            ? getRandomNumber(region.x, region.x2)
            : region.x,
        y: region.y2 !== region.y
            ? getRandomNumber(region.y, region.y2)
            : region.y,
        z: region.z2 !== region.z
            ? getRandomNumber(region.z, region.z2)
            : region.z
    };
    return point;
};

let Factory = (Game) => {

    for (let i = 40; i--;) {
        Game.addEntity(Entities.create({
            [PROPS.NetType]: NET_TYPES.Tree,
            [PROPS.Position]: getRandomPointInRegion(),
            world: 'Alpha'
        }));
    }

    for (let i = 4; i--;) {
        Game.addEntity(Entities.create({
            [PROPS.NetType]: NET_TYPES.Gold,
            [PROPS.Position]: getRandomPointInRegion(),
            world: 'Alpha'
        }));
    }
    for (let i = 6; i--;) {
        Game.addEntity(Entities.create({
            [PROPS.NetType]: NET_TYPES.Silver,
            [PROPS.Position]: getRandomPointInRegion(),
            world: 'Alpha'
        }));
    }
    for (let i = 10; i--;) {
        Game.addEntity(Entities.create({
            [PROPS.NetType]: NET_TYPES.Iron,
            [PROPS.Position]: getRandomPointInRegion(),
            world: 'Alpha'
        }));
    }
    for (let i = 20; i--;) {
        Game.addEntity(Entities.create({
            [PROPS.NetType]: NET_TYPES.Stone,
            [PROPS.Position]: getRandomPointInRegion(),
            world: 'Alpha'
        }));
    }

};

module.exports = Factory;
