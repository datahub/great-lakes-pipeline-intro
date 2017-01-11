// If it is, there is one logical spot for even more oil to flow.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { mackinacViewBox, wiscViewBox } from './view-box';

const flowSpeed = 1 / 40;

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
        triggerElement: '#trigger-13',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateViewBox = d3.scaleLinear()
        .domain([0, 0.6])
        .range([mackinacViewBox, wiscViewBox])
        .interpolate(d3.interpolateString)
        .clamp(true);

    const interpolateOilInPipelines = d3.scaleLinear()
        .domain([0.9, 1])
        .range([1, 0])
        .clamp(true);

    const timer = app.datum().timer;

    function flow(elapsed) {
        const offset = elapsed * flowSpeed;
        oilInPipelines.style('stroke-dashoffset', -offset);
    }

    function enter() {
        timer.restart(flow);
    }

    function progress(event) {
        const t = event.progress;
        svg.attr('viewBox', interpolateViewBox(t));
        oilInPipelines.style('opacity', interpolateOilInPipelines(t));
    }

    function leave() {
        timer.stop();
    }

    scene
        .on('enter', enter)
        .on('progress', progress)
        .on('leave', leave);

    return scene;
}
