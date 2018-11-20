let PlayerEntityFactory = require('./player-entity-factory');
let TreeEntityFactory = require('./tree-entity-factory');

const NET_TYPES = {
    Player: 0,
    Tree: 1
};

const ENTITIES = {
    [NET_TYPES.Player]: PlayerEntityFactory,
    [NET_TYPES.Tree]: TreeEntityFactory
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
    Wood: 'a'
};

module.exports = {
    PROPS,
    NET_TYPES,
    ENTITIES,
    STATUS,
    INVENTORY
};
