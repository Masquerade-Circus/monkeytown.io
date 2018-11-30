import {Panel, Icon} from '../components';
import Game from '../../client';
import logo from '../../../public/imgs/icon.svg';

//monkey by cinnamon stick from the Noun Project by https://thenounproject.com/cinnamonstick91

let Page = {
    autologin: false,
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
    oninput(e) {
        Game.name = e.target.value.trim().slice(0, 23);
    },
    view() {
        return <article onupdate={Page.onupdate}>
            <Panel position="center middle">
                <div class="logo" data-color="black">
                    {v.trust(logo)}
                    MonkeyTown.io
                </div>
                <div data-flex="">
                    <Panel position="inline" color="black">
                        <form>
                            <input placeholder="Player name" oninput={Page.oninput} value={Game.name}/>
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
                        </form>
                    </Panel>
                    <Panel position="inline" color="black">
                        <div class="text-justify">
                            <h3>How to play</h3>
                            Collect resources to buy better equipement and gold to be the number one.
                            <br/><br/><h3>Controls</h3>
                            <code>WASD</code> To move
                            <br/><code>Mouse</code> To look
                            <br/><code>Left button</code> To gather resources / fight other players
                            <br/><code>Mousewheel/1-4</code> To equip item
                        </div>

                    </Panel>
                </div>
            </Panel>
        </article>;
    }
};

export default Page;
