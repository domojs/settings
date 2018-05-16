export { Settings } from './settings';

import * as akala from '@akala/server';
import { resolve, dirname } from 'path';
import { EventEmitter } from 'events';

akala.injectWithName(['$master', '$isModule'], function (master: akala.worker.MasterRegistration, isModule: akala.worker.IsModule)
{
    if (isModule('@domojs/settings'))
        master(module.filename, './master', './master');
})();
