const {
    PROPS,
    NET_TYPES,
    ENTITIES,
    STATUS,
    INVENTORY
} = require('./config');

const Entities = {
    isNode: typeof window === 'undefined',
    PROPS,
    STATUS,
    NET_TYPES,
    INVENTORY,
    Factories: {},
    init() {
        for (let nt in ENTITIES) {
            Entities.Factories[nt] = ENTITIES[nt]();
        }
    },
    create(data = {}) {
        let entity = {
            id: data.id || (0 | Math.random() * 6.04e7).toString(36),
            body: new THREE.Object3D(),
            parent: undefined,
            remove: false,

            [PROPS.NetType]: data[PROPS.NetType] || 0,
            [PROPS.Position]: data[PROPS.Position] || {x: 0, y: 1, z: 0},
            [PROPS.Quaternion]: data[PROPS.Quaternion] || {x: 0, y: 0, z: 0, w: 0},
            [PROPS.Scale]: data[PROPS.Scale] || 1,
            [PROPS.Lerp]: data[PROPS.Lerp] || 1,
            [PROPS.Status]: data[PROPS.Status] || 0,

            destroy() {
                if (entity && entity.body && entity.body.parent) {
                    entity.body.parent.remove(entity.body);
                }

                if (Entities.isNode) {
                    delete Game.worlds[entity.world].children[entity.id];
                }

                delete entity.parent.children[entity.id];
                entity = undefined;
            },
            update(dt) {
                // Update position on the client
                if (!Entities.isNode) {
                    if (entity[PROPS.Lerp] === 1) {
                        entity.body.position.copy(entity[PROPS.Position]);
                    } else if (entity[PROPS.Lerp] < 1) {
                        entity.body.position.lerp(
                            new THREE.Vector3(
                                entity[PROPS.Position].x,
                                entity[PROPS.Position].y,
                                entity[PROPS.Position].z
                            ),
                            entity[PROPS.Lerp]
                        );
                    }

                    entity.body.quaternion.copy(entity[PROPS.Quaternion]);
                }

                entity.runScript('start', dt);

                entity.runEveryTimers(dt);

                entity.runScript('tick', dt);

                // Copy position that will be sent to the client
                if (Entities.isNode) {
                    entity[PROPS.Position] = entity.body.position;
                    entity[PROPS.Quaternion] = entity.body.quaternion;
                }

                entity.runScript('end', dt);

                if (Entities.isNode && entity.remove) {
                    entity.destroy();
                }
            },
            // This should allow us to create methods like entity.every(100, () => 'Do something')
            every(nameOrTime, handler) {
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
            },
            runEveryTimers() {
                for (let i in entity.timers) {
                    if (
                        entity.timers[i].handlers.length > 0 &&
                        Date.now() - entity.timers[i].timer > +i
                    ) {
                        let dt = (Date.now() - entity.timers[i].timer) * .001;
                        for (let k = 0, l = entity.timers[i].handlers.length; k < l; k++) {
                            entity.timers[i].handlers[k](dt);
                        }
                        entity.timers[i].timer = Date.now();
                    }
                }
            },
            timers: {
                // '100': {timer: Date.now(), handlers: []},
            },
            // This should allow us to create methods like entity.addScript('start', () => 'Do something')
            addScript(name, handler) {
                if (entity.scripts[name] === undefined) {
                    entity.scripts[name] = [];
                }

                if (typeof handler === 'function') {
                    entity.scripts[name].push(handler);
                }
            },
            runScript(name, ...args) {
                if (entity.scripts[name].length > 0) {
                    for (let i = 0, l = entity.scripts[name].length; i < l; i++) {
                        entity.scripts[name][i](...args);
                    }
                }
            },
            scripts: {
                'start': [],
                'tick': [],
                'end': []
            },
            limit(distance = 100) {
                if (entity.body.position.x < -distance) {
                    entity.body.position.x = -distance;
                }
                if (entity.body.position.x > distance) {
                    entity.body.position.x = distance;
                }
                if (entity.body.position.z < -distance) {
                    entity.body.position.z = -distance;
                }
                if (entity.body.position.z > distance) {
                    entity.body.position.z = distance;
                }
            }
        };

        // Clone the model and set its initial position
        // At serverside we don't need the real model, just handle the Object3D props
        if (!Entities.isNode && Entities.Factories[data[PROPS.NetType]].Model) {
            let Model = Entities.Factories[data[PROPS.NetType]].Model.clone();
            Model.name = 'Model';
            entity.body.add(Model);
        }

        entity.body.position.set(
            entity[PROPS.Position].x,
            entity[PROPS.Position].y,
            entity[PROPS.Position].z
        );

        entity.body.quaternion.set(
            entity[PROPS.Quaternion].x,
            entity[PROPS.Quaternion].y,
            entity[PROPS.Quaternion].z,
            entity[PROPS.Quaternion].w
        );

        // Init the entity

        if (Entities.isNode && typeof Entities.Factories[entity[PROPS.NetType]].initServer === 'function') {
            Entities.Factories[entity[PROPS.NetType]].initServer(entity);
        }

        if (!Entities.isNode && typeof Entities.Factories[entity[PROPS.NetType]].initClient === 'function') {
            Entities.Factories[entity[PROPS.NetType]].initClient(entity);
        }

        // Set the world and the socket that belongs to this entity if any
        if (Entities.isNode) {
            entity.world = data.world;
        }

        // If there is a socket property add it to the entity
        if (data.socket !== undefined) {
            entity.socket = data.socket;
        }

        return entity;
    }
};

module.exports = Entities;
