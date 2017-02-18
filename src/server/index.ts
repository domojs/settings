export { Settings } from './settings';

import * as di from 'akala-core';
import { resolve, dirname } from 'path';
import { EventEmitter } from 'events';

di.injectWithName(['$master'], function (master)
{
    master(module.filename, './master', './master');
})();
