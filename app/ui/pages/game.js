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
    getBuyButton(name, level) {
        let item = INVENTORY[name];
        let label = '';
        switch (level) {
            case 0:
                label = `Wooden ${name} (wood: ${item.wood} | stone: ${item.stone})`;
                break;
            case 1:
                label = `Iron ${name} (wood: ${item.wood} | stone: ${item.stone} | iron: ${item.stone})`;
                break;
            case 2:
                label = `Silver ${name} (wood: ${item.wood} | stone: ${item.stone} | silver: ${item.stone})`;
                break;
            case 3:
                label = `Golden ${name} (wood: ${item.wood} | stone: ${item.stone} | gold: ${item.stone})`;
                break;
        }

        return <button onclick={Page.buy} data-item={name}>{label}</button>;
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
                return Page.getBuyButton(name, level);
            }

            if (
                level === 1
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Iron]
            ) {
                return Page.getBuyButton(name, level);
            }

            if (
                level === 2
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Silver]
            ) {
                return Page.getBuyButton(name, level);
            }

            if (
                level === 3
                && item.wood <= resources[RESOURCES.Wood]
                && item.stone <= resources[RESOURCES.Stone]
                && item.stone <= resources[RESOURCES.Gold]
            ) {
                return Page.getBuyButton(name, level);
            }
        });
    },
    getItems() {
        let equiped = Object.values(INVENTORY)[Game.player[PROPS.Equiped]];
        return Object.keys(INVENTORY).map(name => {
            let item = INVENTORY[name];
            let level = Game.player[PROPS.Inventory][item.id];
            let selected = equiped.id === item.id;
            return <Panel position="inline" color="black">{name} {level} {selected}</Panel>;
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
