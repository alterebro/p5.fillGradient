/*! p5.fillgradient v0.1.2 (c) 2024 Jorge Moreno, @alterebro */
"use strict";

(function() {
    "use strict";
    p5.prototype.fillGradient = function() {
        let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "linear";
        let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        let context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        let _defaults = {
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
        let _type = type.toLowerCase();
        _type = !!_defaults[_type] ? _type : "linear";
        let _props = Object.assign(_defaults[_type], props);
        let _ctx = !context ? canvas.getContext("2d") : context.canvas.getContext("2d");
        let _gradients = {
            linear: () => _ctx.createLinearGradient(_props.from[0], _props.from[1], _props.to[0], _props.to[1]),
            radial: () => _ctx.createRadialGradient(_props.from[0], _props.from[1], _props.from[2], _props.to[0], _props.to[1], _props.to[2]),
            conic: () => _ctx.createConicGradient(radians(_props.from[2]), _props.from[0], _props.from[1])
        };
        let _gradient = _gradients[_type]();
        _props.steps.forEach((step, i) => {
            let _step = !Array.isArray(step) ? [ step ] : step;
            let _stop = !!_step[1] ? _step[1] : i / (_props.steps.length - 1);
            _stop = Math.min(1, Math.max(0, _stop));
            _gradient.addColorStop(_stop, _step[0]);
        });
        _ctx.fillStyle = _gradient;
    };
})();