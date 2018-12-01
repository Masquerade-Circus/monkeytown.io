import 'valyrian.js';
import Request from 'valyrian.js/plugins/request';
import Router from 'valyrian.js/plugins/router';
import Sw from 'valyrian.js/plugins/sw';

v
    .use(Router)
    .use(Request)
    .use(Sw)
;
