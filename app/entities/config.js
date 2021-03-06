let PlayerEntityFactory = require('./player-entity-factory');
let TreeEntityFactory = require('./tree-entity-factory');
let RockEntityFactory = require('./rock-entity-factory');
let BushEntityFactory = require('./bush-entity-factory');
let SheepEntityFactory = require('./sheep-entity-factory');

const NET_TYPES = {
    Player: 0,
    Tree: 1,
    Stone: 2,
    Iron: 3,
    Silver: 4,
    Gold: 5,
    Bush: 6,
    Sheep: 7
};

const ENTITIES = {
    [NET_TYPES.Player]: PlayerEntityFactory,
    [NET_TYPES.Tree]: TreeEntityFactory,
    [NET_TYPES.Stone]: RockEntityFactory('Stone'),
    [NET_TYPES.Iron]: RockEntityFactory('Iron'),
    [NET_TYPES.Silver]: RockEntityFactory('Silver'),
    [NET_TYPES.Gold]: RockEntityFactory('Gold'),
    [NET_TYPES.Bush]: BushEntityFactory,
    [NET_TYPES.Sheep]: SheepEntityFactory
};

const STATUS = {
    Static: 0,
    Fighting: 1
};

// NOTE: Set only the props that will be sent to the client
const PROPS = {
    NetType: 'a',
    Position: 'b',
    Quaternion: 'c',
    Scale: 'd',
    Lerp: 'e',
    Status: 'f',
    Resources: 'g',
    Inventory: 'h',
    Equiped: 'i',
    Life: 'j',
    MaxLife: 'k',
    HasDied: 'l'
};

const RESOURCES = {
    Wood: 'a',
    Stone: 'b',
    Iron: 'c',
    Silver: 'd',
    Gold: 'e',
    Food: 'f'
};

const INVENTORY = {
    a: {name: 'Knife', wood: 25, stone: 25, damage: 2, range: 1, collect: 5, life: 0, buyable: true},
    b: {name: 'Axe', wood: 50, stone: 50, damage: 1, range: 1.5, collect: 10, life: 0, buyable: true},
    c: {name: 'Spear', wood: 100, stone: 100, damage: 3, range: 2, collect: 0, life: 0, buyable: true},
    d: {name: 'Apple', wood: 0, stone: 0, damage: 0, range: 0, collect: 0, life: 10, buyable: false, color: 'apple'}
};

const ADDITIONAL_PROPERTIES = [
    PROPS.Inventory,
    PROPS.Equiped,
    PROPS.Life,
    PROPS.MaxLife
];

module.exports = {
    PROPS,
    NET_TYPES,
    ENTITIES,
    STATUS,
    RESOURCES,
    INVENTORY,
    ADDITIONAL_PROPERTIES
};
