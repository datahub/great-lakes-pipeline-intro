// So much oil can be routed through Wisconsin that can top the oil brought in from
// Saudi Arabia, Venezuela and Mexico &mdash; combined.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

const flowSpeed = 1 / 75;

export default function getScene8(app) {
    const svg = app.select('#pipe-background');
    const oilImportsChart = app.select('#oil-imports-chart-container');
    const detailedMap = svg.select('#detailed-map');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path');
    const fourthLineOil = detailedMap.select('.oil-in-line-61-twin');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-8',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateOilImports = d3.scaleLinear()
        .domain([0, 0.3, 0.9, 1])
        .range([0, 1, 1, 0])
        .clamp(true);

    const interpolateBackground = d3.scaleLinear()
        .domain([0, 0.3, 0.8, 1])
        .range([1, 0.4, 0.4, 1])
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
        svg.style('opacity', interpolateBackground(t));
        oilImportsChart.style('opacity', interpolateOilImports(t));
        oilInPipelines.style('opacity', interpolateOilInPipelines(t));
        fourthLineOil.style('opacity', 0);
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
