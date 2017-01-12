// If it is, there is one logical spot for even more oil to flow.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { wiscViewBox } from './view-box';

// const finalFlowSpeed = 1 / 20;
// const startFlowSpeed = 1 / 75;
// const interpolateFlowSpeed = d3.interpolateNumber(startFlowSpeed, finalFlowSpeed);
const flowSpeed = 1 / 20;

function filterOutline5() {
    const className = d3.select(this).attr('class');
    return className !== 'oil-in-line-5';
}

export default function getScene12(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');

    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path')
        .filter(filterOutline5);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-13',
        duration: '100%',
        triggerHook: 1,
    });

    const timer = app.datum().timer;

    function flow(elapsed) {
        const offset = elapsed * flowSpeed;
        oilInPipelines.style('stroke-dashoffset', -offset);
    }

    function enter() {
        // const forward = event.scrollDirection === 'FORWARD';

        // timer.restart(flow);

        const transition = d3.transition()
            .duration(2500);

        svg.transition(transition).attr('viewBox', wiscViewBox);
        oilInPipelines.transition(transition).style('opacity', 1);
    }

    scene
        .on('enter', enter);

    return scene;
}
