import {Panel} from '../components';
import Game from '../../client';

let Page = {
    onupdate() {
        if (!Game.player) {
            v.routes.go('/');
        }
    },
    view() {
        return <article onupdate={Page.onupdate}>
            <Panel position="center">
                Welcome, this is the game ui.
            </Panel>
        </article>;
    }
};

export default Page;
