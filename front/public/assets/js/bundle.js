(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Datafeeds = {})));
}(this, (function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    var arguments$1 = arguments;

    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments$1[i];
        for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) { t[p] = s[p]; } }
    }
    return t;
};

var UDFCompatibleDatafeed = /** @class */ (function () {
    function UDFCompatibleDatafeed() {
    }
    UDFCompatibleDatafeed.prototype.onReady = function (callback) {
        setTimeout(function () {
            callback({
                supports_search: true,
                supported_resolutions: ['1', '5', '10', '15', '30', '60', '120', '240', 'D', 'W', 'M'],
            });
        });
    };
    UDFCompatibleDatafeed.prototype.resolveSymbol = function (symbolName, onResolve, onError) {
        window.socket.emit('symbol', symbolName, function (res) {
            var msg = pako.inflate(res, {
                to: 'string',
            });
            var symbolInfo = JSON.parse(msg);
            if (!symbolInfo || !symbolInfo.symbol) {
                return;
            }
            onResolve({
                full_name: symbolName,
                name: symbolName,
                ticker: symbolName,
                description: symbolInfo.description,
                type: 'bitcoin',
                session: '24x7',
                exchange: '',
                listed_exchange: '',
                timezone: 'Asia/Shanghai',
                format: 'price',
                minmov: 1,
                pricescale: Math.pow(10, symbolInfo.pricePrecision),
                has_intraday: true,
                supported_resolutions: ['1', '5', '10', '15', '30', '60', '120', '240', 'D', 'W', 'M'],
                intraday_multipliers: ['1', '5', '10', '15', '30', '60', '120', '240'],
                has_seconds: false,
                has_daily: true,
                has_weekly_and_monthly: false,
                has_empty_bars: false,
                force_session_rebuild: true,
                has_no_volume: false,
                volume_precision: symbolInfo.volumePrecision
            });
        });
    };
    UDFCompatibleDatafeed.prototype.searchSymbols = function (userInput, exchange, symbolType, onResult) {
    };
    UDFCompatibleDatafeed.prototype.getBars = function (symbolInfo, resolution, from, to, onResult, onError) {
        if (window.socket && window.socket.connected) {
            window.socket.emit('bars', {
                symbol: symbolInfo.name,
                resolution: resolution,
                from: from,
                to: to,
            }, function (data) {
                var res = JSON.parse(pako.inflate(data, {
                    to: 'string'
                }));
                var bars = [];
                if (res && res.length > 0) {
                    bars = res.map(function (o) { return (__assign({}, o, { time: o.time * 1000 })); });
                }
                onResult(bars, { noData: bars.length === 0 });
            });
        }
    };
    UDFCompatibleDatafeed.prototype.subscribeBars = function (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
        window.onTick = onTick;
        if (window.socket && window.socket.connected) {
            window.socket.emit('subscribe', {
                symbol: symbolInfo.name,
                resolution: resolution,
            });
        }
    };
    UDFCompatibleDatafeed.prototype.unsubscribeBars = function (listenerGuid) {
        var _a = listenerGuid.split('_'), symbol = _a[0], resolution = _a[1];
        if (window.socket && window.socket.connected) {
            window.socket.emit('unsubscribe', { symbol: symbol, resolution: resolution });
        }
    };
    return UDFCompatibleDatafeed;
}());

exports.UDFCompatibleDatafeed = UDFCompatibleDatafeed;

Object.defineProperty(exports, '__esModule', { value: true });

})));
