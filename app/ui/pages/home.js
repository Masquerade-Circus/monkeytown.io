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
                            <div class="text-center">
                                <button
                                    onclick={Page.play}
                                    data-background="success"
                                    disabled={!Game.is.ready || Game.is.connecting}
                                    class="w75">
                                    {Game.is.connecting ? 'Connecting...' : Game.is.ready ? 'Play' : 'Loading...'}
                                </button>
                            </div>

                        </form>
                        <br/>
                        <div class="text-justify" style="height: 250px; overflow: auto">
                            <b>How to play</b>
                            <br/>Collect resources to buy better equipment and gold to be the number one.
                            <br/>
                            <br/><b>Controls</b>
                            <br/><code>WASD</code> To move
                            <br/><code>Mouse</code> To look
                            <br/><code>Left button</code> To gather resources / fight other players
                            <br/><code>Mousewheel/1-4</code> To equip item
                            <br/>
                            <br/><b>Strategies</b>
                            <br/>If you have enough resources you can buy weapons and you can increase its effectivity by upgrading from stone to iron, silver and gold levels.  With the correct resources the store will automatically appear and show the items you can buy.
                            <br/><br/>Sheeps will give you food and gold.
                            <br/><br/>Knife is fast to buy and upgrade, it gives you a little more range and probability to gather resources and ​a little more fight power.
                            <br/><br/>Axe will give you medium range and more probability to gather resources and medium fight power.
                            <br/><br/>Spear will give you the largest range but no probability increase to gather resources and high fight power.
                            <br/>
                            <br/><b>Roadmap</b>
                            <br/>[ ] - ​Add more animals (birds, lion, wild boar)
                            <br/>[ ] - Add more items (bow, sword)
                            <br/>[ ] - Add items to build your house (walls, door, traps)
                        </div>
                    </Panel>
                </div>
            </Panel>
            <Panel position="bottom right" color="black">
                Icon for logo by <a href="https://thenounproject.com/cinnamonstick91" title="cinnamonstick91" data-color="info" target="_blank" rel="no-follow">cinnamonstick91</a>
            </Panel>
        </article>;
    }
};

export default Page;
