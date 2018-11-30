import {Panel, Icon} from '../components';
import Game from '../../client';
import {PROPS, RESOURCES, INVENTORY} from '../../entities/config';

let Page = {
    onupdate() {
        if (!Game.player) {
            v.routes.go('/');
        }
    },
    itemColors: {
        0: 'black',
        1: 'stone',
        2: 'iron',
        3: 'silver',
        4: 'gold'
    },
    buy(event) {
        Game.player.runScript('buy', event.target.dataset.id);
    },
    getBuyButton(id, item, level) {
        let label;
        switch (level) {
            case 0:
                label = [
                    `Stone ${item.name} (`,
                    <span title="Wood"><Icon icon='wood' color='wood' size="xs" /> {item.wood}</span>,
                    ' | ',
                    <span title="Stone"><Icon icon='stone' color='stone' size="xs" /> {item.stone}</span>,
                    ')'
                ];
                break;
            case 1:
                label = [
                    `Iron ${item.name} (`,
                    <span title="Wood"><Icon icon='wood' color='wood' size="xs" /> {item.wood}</span>,
                    ' | ',
                    <span title="Stone"><Icon icon='stone' color='stone' size="xs" /> {item.stone}</span>,
                    ' | ',
                    <span title="Iron"><Icon icon='stone' color='iron' size="xs" /> {item.stone}</span>,
                    ')'
                ];
                break;
            case 2:
                label = [
                    `Silver ${item.name} (`,
                    <span title="Wood"><Icon icon='wood' color='wood' size="xs" /> {item.wood}</span>,
                    ' | ',
                    <span title="Stone"><Icon icon='stone' color='stone' size="xs" /> {item.stone}</span>,
                    ' | ',
                    <span title="Silver"><Icon icon='stone' color='silver' size="xs" /> {item.stone}</span>,
                    ')'
                ];
                break;
            case 3:
                label = [
                    `Golden ${item.name} (`,
                    <span title="Wood"><Icon icon='wood' color='wood' size="xs" /> {item.wood}</span>,
                    ' | ',
                    <span title="Stone"><Icon icon='stone' color='stone' size="xs" /> {item.stone}</span>,
                    ' | ',
                    <span title="Gold"><Icon icon='stone' color='gold' size="xs" /> {item.stone}</span>,
                    ')'
                ];
                break;
        }

        return <div><button onclick={Page.buy} data-id={id} data-background="success">{label}</button></div>;
    },
    getStore() {
        let items = Object.keys(INVENTORY).map(id => {
            let item = INVENTORY[id];
            if (item.buyable) {
                let resources = Game.player[PROPS.Resources];
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
            }
        });

        items = items.filter(item => item !== undefined);

        if (items.length > 0) {
            return <Panel title="Store" position="inline" color="black">{items}</Panel>;
        }
    },
    getItems() {
        let equipedId = Object.keys(INVENTORY)[Game.player[PROPS.Equiped]];

        return Object.keys(INVENTORY).map(id => {
            let item = INVENTORY[id];
            let level = Game.player[PROPS.Inventory][id];
            let selected = equipedId === id;
            return <Panel position="inline" color="black" border={selected ? "success" : ""}>
                <div title={item.name !== 'Apple' ? item.name : 'Food'}>
                    <Icon icon={item.name.toLowerCase()} color={item.color || Page.itemColors[level]} size="md"/>
                    {item.name !== 'Apple' ? `(${level})` : ''}
                </div>
            </Panel>;
        });
    },
    getResources() {
        return [
            <div title="Wood"><Icon icon='wood' color='wood' size="md" /> {Game.player[PROPS.Resources][RESOURCES.Wood]}</div>,
            <div title="Stone"><Icon icon='stone' color='stone' size="md" /> {Game.player[PROPS.Resources][RESOURCES.Stone]}</div>,
            <div title="Iron"><Icon icon='stone' color='iron' size="md" /> {Game.player[PROPS.Resources][RESOURCES.Iron]}</div>,
            <div title="Silver"><Icon icon='stone' color='silver' size="md" /> {Game.player[PROPS.Resources][RESOURCES.Silver]}</div>,
            <div title="Gold"><Icon icon='stone' color='gold' size="md" /> {Game.player[PROPS.Resources][RESOURCES.Gold]}</div>,
            <div title="Food"><Icon icon='apple' color='apple' size="md" /> {Game.player[PROPS.Resources][RESOURCES.Food]}</div>
        ];
    },
    getLeaderboard() {
        return Game.leaderboard.map((item, index) => {
            return <div style={item.id === Game.player.id ? 'color: #7ac31b' : ''}>{index} - {item.name} ({item.score})</div>;
        });
    },
    view() {
        if (Game.player) {
            if (Game.player[PROPS.HasDied]) {
                return <article oninit={Page.onupdate} onupdate={Page.onupdate}>
                    <Panel position="center middle" color="black">You died!</Panel>
                </article>;
            }

            return <article oninit={Page.onupdate} onupdate={Page.onupdate}>
                <Panel position="left top">{Page.getStore()}</Panel>
                <Panel title="Leaderboard" position="top right" color="black">{Page.getLeaderboard()}</Panel>
                <Panel position="bottom center">{Page.getItems()}</Panel>
                <Panel position="bottom right">{Page.getResources()}</Panel>
            </article>;
        }
        return <article oninit={Page.onupdate} onupdate={Page.onupdate}></article>;
    }
};

export default Page;
