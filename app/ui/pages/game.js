import {Panel} from '../components';
import Game from '../../client';

let Page = {
    onupdate() {
        if (!Game.player) {
            v.routes.go('/');
        }
    },
    view() {
        return <article oninit={Page.onupdate} onupdate={Page.onupdate}>
            <Panel position="center">
                Welcome, this is the game ui.
                <br/>
                {Game.player ? `${Game.player.p.x}/${Game.player.p.z}` : ''}
            </Panel>
        </article>;
    }
};

export default Page;
