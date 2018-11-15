import 'valyrian.js';
import Router from 'valyrian.js/plugins/router.js';
import Request from 'valyrian.js/plugins/request';
import Entities from '../entities';

v
    .use(Router)
    .use(Request)
;

(v.is.browser ? window : global).Entities = Entities;
