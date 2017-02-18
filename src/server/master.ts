// import 'jquery';
import * as di from 'akala-core';
import * as debug from 'debug';
import { EventEmitter } from 'events';
import * as $ from 'underscore';
import * as fs from 'fs';
import { Settings } from './settings';
var log = debug('domojs:settings');
// log('settings');
var doNotWrite = false;

@di.factory("settings")
class SettingsFactory extends EventEmitter implements di.IFactory<Settings> {
    constructor()
    {
        log('factory constructor');
        super();

        var config = {};
        if (fs.existsSync('./settings.json'))
        {
            doNotWrite = true;
            var data = fs.readFileSync('./settings.json', 'utf8');
            this.all = JSON.parse(data);
            if (config)
                $.each(config, this.set.bind(this));
            doNotWrite = false;
        }
    }

    public all: any;

    set(name: string, value: any)
    {
        if (name.indexOf('.') > 0)
        {
            var firstName = name.substring(0, name.indexOf('.'));
            if (typeof (this.all[firstName]) == 'undefined')
                this.all[firstName] = {};
            this.all[firstName][name.substring(firstName.length + 1)] = value;
            this.emit(firstName, this.all[firstName]);
        }
        else
            this.all[name] = value;
        console.log('updated settings');
        console.log(this.all);
        this.emit(name, value);
        if (!doNotWrite)
            fs.writeFileSync('./settings.json', JSON.stringify(this.all));
    }

    get(name: string)
    {
        if (name.indexOf('.') > 0)
        {
            var firstName = name.substring(0, name.indexOf('.'));
            if (typeof (this.all[firstName]) == 'undefined')
                this.all[firstName] = {};
            return this.all[firstName][name.substring(firstName.length + 1)];
        }
        else
            return this.all[name];
    }

    build()
    {
        log('building instance');
        var self = this;
        return function (name: string, value?: any)
        {
            if (arguments.length == 1)
                return self.get(name);
            else
                self.set(name, value);
        }
    }
}


