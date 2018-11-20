import {Panel} from '../components';
import Game from '../../client';
import {PROPS, INVENTORY} from '../../entities/config';

let Page = {
    onupdate() {
        if (!Game.player) {
            v.routes.go('/');
        }
    },
    view() {
        if (Game.player) {
            return <article oninit={Page.onupdate} onupdate={Page.onupdate}>
                <Panel title="Inventory" position="left top">
                Wood: {Game.player[PROPS.Inventory][INVENTORY.Wood]}
                </Panel>
                <Panel position="center">
                    Welcome, this is the game ui.
                    <br/>
                    {Game.player[PROPS.Position].x}/{Game.player[PROPS.Position].z}
                </Panel>
            </article>;
        }
        return <article oninit={Page.onupdate} onupdate={Page.onupdate}></article>;
    }
};

export default Page;
