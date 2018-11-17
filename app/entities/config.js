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

// NOTE: Set only the props that will be sent to the client
const PROPS = {
    netType: 'n',
    position: 'p',
    quaternion: 'q',
    scale: 's',
    lerp: 'l'
};

module.exports = {PROPS, NET_TYPES, ENTITIES};
