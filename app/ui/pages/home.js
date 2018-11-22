import logo from '../../../public/imgs/icon.svg';
import {Panel} from '../components';
import Game from '../../client';

let Page = {
    autologin: true,
    getOptions() {
        let options = [];
        for (let name in Game.worlds) {
            let world = Game.worlds[name];
            options.push(
                <option value={name} disabled={world.disabled} selected={world.selected}>
                    World {name} - ({world.playerCount}/{world.maxPlayers})
                </option>
            );
        }
        return options;
    },
    selectWorld(e) {
        Game.selectWorld(e.target.value);
    },
    play() {
        Game.connectServer();
        // v.routes.go('/game');
    },
    onupdate() {
        if (Game.player) {
            v.routes.go('/game');
            return;
        }

        if (Page.autologin && Game.is.ready && !Game.is.connecting && !Game.is.connected) {
            Page.play();
        }
    },
    view() {
        return <article onupdate={Page.onupdate}>
            <Panel position="center middle">
                {/* {v.trust(logo)} */}
                <div data-flex="">
                    <Panel position="inline" color="white">
                        <input placeholder="Player name"/>
                        <select onchange={Page.selectWorld}>
                            {Page.getOptions()}
                        </select>
                        <button
                            onclick={Page.play}
                            data-background="success"
                            disabled={!Game.is.ready || Game.is.connecting}
                            class="w100">
                            {Game.is.connecting ? 'Connecting...' : Game.is.ready ? 'Play' : 'Loading...'}
                        </button>
                    </Panel>
                    <Panel position="inline" color="white">
                        How to play
                    </Panel>
                    <Panel position="inline" color="white">
                        Best scores
                    </Panel>
                </div>
            </Panel>
        </article>;
    }
};

export default Page;
