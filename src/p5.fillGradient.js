/*!
    p5.fillGradient - MIT License
    Copyright (c) 2022 Jorge Moreno, @alterebro
 */

(function() {

    'use strict';

    p5.prototype.fillGradient = function( type = 'linear', props = {}, context = false ) {

        let _defaults = {

            'linear' : {
                from: [0, 0], // x, y
                to: [width, height], // x, y
                steps : [ color(255), color(0, 96, 164), color(0) ] // color || [color, float]
            },
            'radial' : {
                from: [width/2, height/2, 0], // x, y, radius
                to: [width/2, height/2, max(width/2, height/2)], // x, y, radius
                steps : [ color(255), color(0, 96, 164), color(0) ]
            },
            'conic' : {
                from: [width/2, height/2, 90], // x, y, angle(degrees)
                steps : [ color(255), color(0, 96, 164), color(0) ]
            }
        }

        let _type = type.toLowerCase();
            _type = (!!_defaults[_type]) ? _type : 'linear'

        let _props = Object.assign(_defaults[_type], props);
        let _ctx = (!context) ? canvas.getContext("2d") : context.canvas.getContext('2d');

        let _gradients = {

            'linear' : () => _ctx.createLinearGradient(
                _props.from[0], _props.from[1],
                _props.to[0], _props.to[1]
            ),
            'radial' : () => _ctx.createRadialGradient(
                _props.from[0], _props.from[1], _props.from[2],
                _props.to[0], _props.to[1], _props.to[2]
            ),
            'conic' : () => _ctx.createConicGradient(
                radians(_props.from[2]), _props.from[0], _props.from[1],
            )
        }

        let _gradient = (_gradients[_type])();

            _props.steps.forEach( (step, i) => {

                let _step = !Array.isArray( step ) ? [step] : step
                let _stop = !!_step[1] ? _step[1] : ( i / (_props.steps.length-1) );
                    _stop = Math.min(1, Math.max(0, _stop));

                _gradient.addColorStop( _stop, _step[0] )

            });

        _ctx.fillStyle = _gradient;
    }

})();
