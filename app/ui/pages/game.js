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
        Game.player.runScript('buy', event.target.dataset.id);
    },
    getBuyButton(id, item, level) {
        let label = '';
        switch (level) {
            case 0:
                label = `Wooden ${item.name} (wood: ${item.wood} | stone: ${item.stone})`;
                break;
            case 1:
                label = `Iron ${item.name} (wood: ${item.wood} | stone: ${item.stone} | iron: ${item.stone})`;
                break;
            case 2:
                label = `Silver ${item.name} (wood: ${item.wood} | stone: ${item.stone} | silver: ${item.stone})`;
                break;
            case 3:
                label = `Golden ${item.name} (wood: ${item.wood} | stone: ${item.stone} | gold: ${item.stone})`;
                break;
        }

        return <button onclick={Page.buy} data-id={id}>{label}</button>;
    },
    getStore() {
        return Object.keys(INVENTORY).map(id => {
            let resources = Game.player[PROPS.Resources];
            let item = INVENTORY[id];
            let level = Game.player[PROPS.Inventory][id];
            if (
                level === 0
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
            ) {
                return Page.getBuyButton(id, item, level);
            }

            if (
                level === 1
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Iron]
            ) {
                return Page.getBuyButton(id, item, level);
            }

            if (
                level === 2
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Silver]
            ) {
                return Page.getBuyButton(id, item, level);
            }

            if (
                level === 3
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Gold]
            ) {
                return Page.getBuyButton(id, item, level);
            }
        });
    },
    getItems() {
        let equipedId = Object.keys(INVENTORY)[Game.player[PROPS.Equiped]];
        return Object.keys(INVENTORY).map(id => {
            let item = INVENTORY[id];
            let level = Game.player[PROPS.Inventory][id];
            let selected = equipedId === id;
            return <Panel position="inline" color="black">{item.name} {level} {selected}</Panel>;
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
