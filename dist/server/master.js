"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import 'jquery';
var di = require("akala-corere");
var debug = require("debug");
var events_1 = require("events");
var $ = require("underscore");
var fs = require("fs");
var log = debug('domojs:settings');
// log('settings');
var doNotWrite = false;
var SettingsFactory = (function (_super) {
    __extends(SettingsFactory, _super);
    function SettingsFactory() {
        var _this = this;
        log('factory constructor');
        _this = _super.call(this) || this;
        var config = {};
        if (fs.existsSync('./settings.json')) {
            doNotWrite = true;
            var data = fs.readFileSync('./settings.json', 'utf8');
            _this.all = JSON.parse(data);
            if (config)
                $.each(config, _this.set.bind(_this));
            doNotWrite = false;
        }
        return _this;
    }
    SettingsFactory.prototype.set = function (name, value) {
        if (name.indexOf('.') > 0) {
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
    };
    SettingsFactory.prototype.get = function (name) {
        if (name.indexOf('.') > 0) {
            var firstName = name.substring(0, name.indexOf('.'));
            if (typeof (this.all[firstName]) == 'undefined')
                this.all[firstName] = {};
            return this.all[firstName][name.substring(firstName.length + 1)];
        }
        else
            return this.all[name];
    };
    SettingsFactory.prototype.build = function () {
        log('building instance');
        var self = this;
        return function (name, value) {
            if (arguments.length == 1)
                return self.get(name);
            else
                self.set(name, value);
        };
    };
    return SettingsFactory;
}(events_1.EventEmitter));
SettingsFactory = __decorate([
    di.factory("settings")
], SettingsFactory);

//# sourceMappingURL=master.js.map
