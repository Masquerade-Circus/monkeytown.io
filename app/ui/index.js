import './init';
import Pages from './pages';
import Game from '../client';

let router = v.Router();
router
    .get('/', () => Pages.Home)
    .get('/game', () => Pages.Game)
;

v.routes('#ui', router);

if (v.is.browser) {
    Game.initGame();
    setInterval(() => v.update(), 100);
    v.sw('/sw.js');
}

// Export what is needed for the backend
export default {Pages};
