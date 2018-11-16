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
            remove: false,

            [PROPS.netType]: data[PROPS.netType] || 0,
            [PROPS.position]: data[PROPS.position] || {x: 0, y: 1, z: 0},
            [PROPS.quaternion]: data[PROPS.quaternion] || {x: 0, y: 0, z: 0, w: 0},
            [PROPS.scale]: data[PROPS.scale] || 1,
            [PROPS.lerp]: data[PROPS.lerp] || 1,

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

                // Run start handlers
                if (entity.timers.start.length > 0) {
                    for (let i = 0, l = entity.timers.start.length; i < l; i++) {
                        entity.timers.start[i](dt);
                    }
                }

                // Run timer handlers
                for (let i in entity.timers) {
                    // Update just the time based handlers
                    if (
                        entity.timers[i].timer &&
                        Array.isArray(entity.timers[i].handlers) &&
                        entity.timers[i].handlers.length > 0 &&
                        Date.now() - entity.timers[i].timer > +i
                    ) {
                        for (let k = 0, l = entity.timers[i].handlers.length; k < l; k++) {
                            entity.timers[i].handlers[k](dt);
                        }
                        entity.timers[i].timer = Date.now();
                    }
                }

                // Run tick handlers
                if (entity.timers.tick.length > 0) {
                    for (let i = 0, l = entity.timers.tick.length; i < l; i++) {
                        entity.timers.tick[i](dt);
                    }
                }

                if (Entities.isNode) {
                    // Copy position that will be sent to the client
                    entity[PROPS.position] = entity.body.position;
                    entity[PROPS.quaternion] = entity.body.quaternion;
                }

                // Run end handlers
                if (entity.timers.end.length > 0) {
                    for (let i = 0, l = entity.timers.end.length; i < l; i++) {
                        entity.timers.end[i](dt);
                    }
                }

                if (entity.remove) {
                    entity.destroy();
                }
            },
            // This should allow us to create methods like entity.every(100, () => 'Do something')
            every(nameOrTime, handler) {
                if (typeof nameOrTime === 'number') {
                    if (entity.timers[nameOrTime] === undefined) {
                        entity.timers[nameOrTime] = {
                            timer: Date.now(),
                            handlers: []
                        };
                    }

                    if (typeof handler === 'function') {
                        entity.timers[nameOrTime].handlers.push(handler);
                    }
                    return;
                }

                if (entity.timers[nameOrTime] === undefined) {
                    entity.timers[nameOrTime] = [];
                }

                if (typeof handler === 'function') {
                    entity.timers[nameOrTime].push(handler);
                }
            },
            timers: {
                // '100': {timer: Date.now(), handlers: []},
                'start': [],
                'tick': [],
                'end': []
            }
        };

        // Clone the model and set its initial position
        // At serverside we don't need the real model, just handle the Object3D props
        if (!Entities.isNode && Entities.Factories[data[PROPS.netType]].Model) {
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

        if (Entities.isNode && typeof Entities.Factories[entity[PROPS.netType]].initServer === 'function') {
            Entities.Factories[entity[PROPS.netType]].initServer(entity);
        }

        if (!Entities.isNode && typeof Entities.Factories[entity[PROPS.netType]].initClient === 'function') {
            Entities.Factories[entity[PROPS.netType]].initClient(entity);
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
