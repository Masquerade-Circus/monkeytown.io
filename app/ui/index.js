import './init';
import Pages from './pages';
import Game from '../client';

let router = v.Router();
router
    .get('/', () => Pages.Home)
;

v.routes('#ui', router);

if (v.is.browser) {
    window.Game = Game;
    Game.initGame();
}

// Export what is needed for the backend
export default {Pages};
