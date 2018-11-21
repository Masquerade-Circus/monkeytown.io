import {Panel} from '../components';
import Game from '../../client';
import {PROPS, INVENTORY} from '../../entities/config';

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
    view() {
        if (Game.player) {
            return <article oninit={Page.onupdate} onupdate={Page.onupdate}>
                <Panel title="Inventory" position="left top" color="black">
                    <ul>
                        {Object.keys(INVENTORY).map(item => {
                            return <li>{item}: {Game.player[PROPS.Inventory][INVENTORY[item]]}</li>;
                        })}
                    </ul>
                </Panel>
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
