import {Panel} from '../components';
import Game from '../../client';
import {PROPS, RESOURCES, INVENTORY} from '../../entities/config';

let Page = {
    onupdate() {
        if (!Game.player) {
            v.routes.go('/');
        }
    },
    colors: {
        white: '#ffffff',
        black: '#555555',
        success: '#00e676',
        warning: '#ff3d00',
        info: '#2979ff',
        danger: '#ff1744'
    },
    buy(event) {
        Game.player.runScript('buy', event.target.dataset.item);
    },
    getBuyButton(name) {
        let item = INVENTORY[name];
        return <button onclick={Page.buy} data-item={name}>
            Wooden {name} (wood: {item.wood} | stone: {item.stone})
        </button>;
    },
    getStore() {
        return Object.keys(INVENTORY).map(name => {
            let resources = Game.player[PROPS.Resources];
            let item = INVENTORY[name];
            let level = Game.player[PROPS.Inventory][item.id];
            if (
                level === 0
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
            ) {
                return Page.getBuyButton(name);
            }
        });
    },
    getItems() {
        return Object.keys(INVENTORY).map(name => {
            let item = INVENTORY[name];
            return <Panel position="inline" color="black">{name} {Game.player[PROPS.Inventory][item.id]}</Panel>;
        });
    },
    getResources() {
        return Object.keys(RESOURCES).map(item => {
            return <div>{item}: {Game.player[PROPS.Resources][RESOURCES[item]]}</div>;
        });
    },
    view() {
        if (Game.player) {
            return <article oninit={Page.onupdate} onupdate={Page.onupdate}>
                <Panel position="left top">
                    <Panel title="Resources" position="inline" color="black">{Page.getResources()}</Panel>
                    <Panel position="inline">{Page.getStore()}</Panel>
                </Panel>

                <Panel position="bottom center">{Page.getItems()}</Panel>


                <Panel position="center">
                    Welcome, this is the game ui.
                    <br/>
                    {Game.player[PROPS.Position].x}/{Game.player[PROPS.Position].z}
                </Panel>
                <Panel position="top right">
                    {Object.keys(Page.colors).map(color => <div data-background={color}>{color} {Page.colors[color]}</div>)}
                </Panel>
            </article>;
        }
        return <article oninit={Page.onupdate} onupdate={Page.onupdate}></article>;
    }
};

export default Page;
