let PlayerEntityFactory = require('./player-entity-factory');
let TreeEntityFactory = require('./tree-entity-factory');
let RockEntityFactory = require('./rock-entity-factory');
let BushEntityFactory = require('./bush-entity-factory');

const NET_TYPES = {
    Player: 0,
    Tree: 1,
    Stone: 2,
    Iron: 3,
    Silver: 4,
    Gold: 5,
    Bush: 6
};

const ENTITIES = {
    [NET_TYPES.Player]: PlayerEntityFactory,
    [NET_TYPES.Tree]: TreeEntityFactory,
    [NET_TYPES.Stone]: RockEntityFactory('stone'),
    [NET_TYPES.Iron]: RockEntityFactory('iron'),
    [NET_TYPES.Silver]: RockEntityFactory('silver'),
    [NET_TYPES.Gold]: RockEntityFactory('gold'),
    [NET_TYPES.Bush]: BushEntityFactory
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
    Inventory: 'g'
};

const INVENTORY = {
    Wood: 'a',
    Stone: 'b',
    Iron: 'c',
    Silver: 'd',
    Gold: 'e',
    Food: 'f',
    Leaves: 'g'
};

module.exports = {
    PROPS,
    NET_TYPES,
    ENTITIES,
    STATUS,
    INVENTORY
};
