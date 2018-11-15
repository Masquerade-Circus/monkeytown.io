const PROPS = require('./props');

let Player = require('./entity-player');

const TYPES = {
    Player: 1
};

const ENTITIES = {
    isNode: typeof window === 'undefined',
    PROPS,
    TYPES,
    Models: {},
    init() {
        ENTITIES.Models[TYPES.Player] = Player();
    },
    create(data = {}) {
        let entity = {
            id: data.id || (0 | Math.random() * 6.04e7).toString(36),
            body: ENTITIES.Models[data[PROPS.netType] || 0].Model.clone(),
            parent: undefined,

            [PROPS.netType]: data[PROPS.netType] || 0,
            [PROPS.position]: data[PROPS.position] || {x: 0, y: 1, z: 0},
            [PROPS.quaternion]: data[PROPS.quaternion] || {x: 0, y: 0, z: 0, w: 0},
            [PROPS.scale]: data[PROPS.scale] || 1,
            [PROPS.lerp]: data[PROPS.lerp] || 1,
            [PROPS.remove]: false,

            destroy() {
                if (entity && entity.body && entity.body.parent) {
                    entity.body.parent.remove(entity.body);
                }
                delete Game.children[entity.id];
                entity = undefined;
            }
        };

        // Update method
        entity.update = ENTITIES.Models[entity[PROPS.netType]][
            ENTITIES.isNode ?
                'ServerUpdate'
                : 'ClientUpdate'
        ](entity);

        entity.body.position.set(
            entity[PROPS.position].x,
            entity[PROPS.position].y,
            entity[PROPS.position].z
        );

        entity.body.quaternion.set(
            entity[PROPS.quaternion].x,
            entity[PROPS.quaternion].y,
            entity[PROPS.quaternion].z,
            entity[PROPS.quaternion].w
        );

        if (ENTITIES.isNode) {
            entity.world = data.world;
            entity.socket = data.socket;
        }

        return entity;
    }
};

module.exports = ENTITIES;
