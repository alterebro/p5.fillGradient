/*! p5.fillgradient v0.1.1 (c) 2022 Jorge Moreno, @alterebro */
"use strict";

(function() {
    "use strict";
    p5.prototype.fillGradient = function() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "linear";
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _defaults = {
            linear: {
                from: [ 0, 0 ],
                to: [ width, height ],
                steps: [ color(255), color(0, 96, 164), color(0) ]
            },
            radial: {
                from: [ width / 2, height / 2, 0 ],
                to: [ width / 2, height / 2, max(width / 2, height / 2) ],
                steps: [ color(255), color(0, 96, 164), color(0) ]
            },
            conic: {
                from: [ width / 2, height / 2, 90 ],
                steps: [ color(255), color(0, 96, 164), color(0) ]
            }
        };
        var _type = type.toLowerCase();
        _type = !!_defaults[_type] ? _type : "linear";
        var _props = Object.assign(_defaults[_type], props);
        var _ctx = !context ? canvas.getContext("2d") : context.canvas.getContext("2d");
        var _gradients = {
            linear: function linear() {
                return _ctx.createLinearGradient(_props.from[0], _props.from[1], _props.to[0], _props.to[1]);
            },
            radial: function radial() {
                return _ctx.createRadialGradient(_props.from[0], _props.from[1], _props.from[2], _props.to[0], _props.to[1], _props.to[2]);
            },
            conic: function conic() {
                return _ctx.createConicGradient(radians(_props.from[2]), _props.from[0], _props.from[1]);
            }
        };
        var _gradient = _gradients[_type]();
        _props.steps.forEach(function(step, i) {
            var _step = !Array.isArray(step) ? [ step ] : step;
            var _stop = !!_step[1] ? _step[1] : i / (_props.steps.length - 1);
            _gradient.addColorStop(_stop, _step[0]);
        });
        _ctx.fillStyle = _gradient;
    };
})();