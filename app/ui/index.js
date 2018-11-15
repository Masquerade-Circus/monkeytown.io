import './init';
import Pages from './pages';

let router = v.Router();
router
    .get('/', () => Pages.Home)
;

v.routes('body', router);

// Export what is needed for the backend
export default {Pages};
