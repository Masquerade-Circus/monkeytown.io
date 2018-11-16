const PROPS = require('./props');

let Player = require('./entity-player');

const TYPES = {
    Player: 1
};

const Entities = {
    isNode: typeof window === 'undefined',
    PROPS,
    TYPES,
    Factories: {},
    init() {
        Entities.Factories[TYPES.Player] = Player();
    },
    create(data = {}) {
        let entity = {
            id: data.id || (0 | Math.random() * 6.04e7).toString(36),
            body: new THREE.Object3D(),
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

                if (Entities.isNode) {
                    delete Game.worlds[entity.world].children[entity.id];
                }

                delete Game.children[entity.id];
                entity = undefined;
            },
            update(dt) {
                if (!Entities.isNode) {
                    // Update position on the client
                    if (entity[PROPS.lerp] === 1) {
                        entity.body.position.copy(entity[PROPS.position]);
                    } else if (entity[PROPS.lerp] < 1) {
                        entity.body.position.lerp(
                            new THREE.Vector3(
                                entity[PROPS.position].x,
                                entity[PROPS.position].y,
                                entity[PROPS.position].z
                            ),
                            entity[PROPS.lerp]
                        );
                    }

                    entity.body.quaternion.copy(entity[PROPS.quaternion]);
                }

                entity.updateMethod(dt);

                if (Entities.isNode) {
                    // Copy position that will be sent to the client
                    entity[PROPS.position] = entity.body.position;
                    entity[PROPS.quaternion] = entity.body.quaternion;
                }
            }
        };

        // Clone the model and set its initial position
        if (Entities.Factories[data[PROPS.netType]].Model) {
            entity.body.add(Entities.Factories[data[PROPS.netType]].Model.clone());
        }

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

        // Init the entity
        if (typeof Entities.Factories[entity[PROPS.netType]].init === 'function') {
            Entities.Factories[entity[PROPS.netType]].init(entity);
        }

        // Set the world and the socket that belongs to this entity if any
        if (Entities.isNode) {
            entity.world = data.world;
            entity.socket = data.socket;
        }

        return entity;
    }
};

module.exports = Entities;
