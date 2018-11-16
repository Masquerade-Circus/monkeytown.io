let PlayerEntityFactory = require('./player-entity-factory');

const NET_TYPES = {
    Player: 0
};

const ENTITIES = {
    [NET_TYPES.Player]: PlayerEntityFactory
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
