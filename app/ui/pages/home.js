import logo from '../../../public/imgs/icon.svg';
import {Panel} from '../components';

export default v(() =>
    <article>
        <Panel position="center middle">
            {/* {v.trust(logo)} */}
            <div data-flex="">
                <Panel position="inline" color="white">
                    <input placeholder="Player name"/>
                    <select>
                        <option>Server name</option>
                    </select>
                    <button data-background="success" class="w100">Play</button>
                </Panel>
                <Panel position="inline" color="white">
                    How to play
                </Panel>
                <Panel position="inline" color="white">
                    Best scores
                </Panel>
            </div>
        </Panel>
    </article>
);
