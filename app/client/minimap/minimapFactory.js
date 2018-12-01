import './canvas.map';
import Entities from '../../entities';

let MinimapFactory = function (Game) {
    let worldsize = 200;
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', '150');
    canvas.setAttribute('height', '150');
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('id', 'minimap');

    let map = CanvasMap(canvas, worldsize, worldsize);
    map.useRadians = true;
    map.zoom = 1;
    let middle = worldsize / 2;

    let fps = 30;
    let time = performance.now();

    let compass = {
        x: map.text({ x: middle, y: middle, text: '+', fill: 'rgba(255,255,255,0.4)', size: 40, baseline: 'middle' }),
        n: map.text({ x: middle, y: middle - 40, text: 'N', fill: 'rgba(255,255,255,0.4)', size: 20, baseline: 'middle' }),
        s: map.text({ x: middle, y: middle + 40, text: 'S', fill: 'rgba(255,255,255,0.4)', size: 20, baseline: 'middle' }),
        w: map.text({ x: middle - 40, y: middle, text: 'W', fill: 'rgba(255,255,255,0.4)', size: 20, baseline: 'middle' }),
        e: map.text({ x: middle + 40, y: middle, text: 'E', fill: 'rgba(255,255,255,0.4)', size: 20, baseline: 'middle' })
    };

    map
        .add(compass.x)
        .add(compass.n)
        .add(compass.s)
        .add(compass.w)
        .add(compass.e)
    ;

    let colors = {
        [Entities.NET_TYPES.Stone]: '#424343',
        [Entities.NET_TYPES.Iron]: '#828383',
        [Entities.NET_TYPES.Silver]: '#CBCDCD',
        [Entities.NET_TYPES.Gold]: '#FFD700',
        [Entities.NET_TYPES.Player]: '#F44336',
        [Entities.NET_TYPES.Bush]: '#4CAF50',
        [Entities.NET_TYPES.Tree]: '#5D4037'
    };

    let addPoint = (entity) => {
        if (colors[entity[Entities.PROPS.NetType]] !== undefined) {
            map.add(map.point({
                x: entity.body.position.x,
                y: entity.body.position.z,
                id: entity.id,
                nt: entity[Entities.PROPS.NetType],
                r: entity[Entities.PROPS.NetType] === Entities.NET_TYPES.Player ? 5 : 4,
                fill: entity.id === Game.player.id ? 'white' : colors[entity[Entities.PROPS.NetType]],
                stroke: {
                    color: 'rgba(0,0,0,0.4)',
                    width: entity[Entities.PROPS.NetType] === Entities.NET_TYPES.Player ? 4 : 1
                },
                z: 1
            }));
        }
    };


    let loop = function () {
        if (performance.now() - time > 1000 / fps) {
            if (Game.player === undefined) {
                for (let id in map.elements) {
                    if (map.elements[id].nt !== undefined) {
                        map.remove(map.elements[id]);
                    }
                }
            }

            if (Game.player !== undefined) {
                for (let id in map.elements) {
                    if (
                        map.elements[id].nt !== undefined
                        && Game.children[id] === undefined
                    ) {
                        map.remove(map.elements[id]);
                    }
                }

                for (let id in Game.children) {
                    if (map.elements[id] === undefined) {
                        addPoint(Game.children[id]);
                    }

                    if (map.elements[id] !== undefined) {
                        map.elements[id].x = Game.children[id].body.position.x + middle;
                        map.elements[id].y = Game.children[id].body.position.z + middle;
                    }
                }
            }

            map.draw();
            time = performance.now();
        }

    };

    map.update = loop;

    return map;
};

export default MinimapFactory;
