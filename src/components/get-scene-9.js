// And the company that owns the pipeline is considering adding a fourth line
// -- one that would dwarf the rejected Keystone XL.
//
// But Wisconsin is not the destination. In the oil economy, the state is
// mostly just the highway.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

export default function getScene9(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path');

    const fourthLine = detailedMap.selectAll('#line-61-twin, #line-61-twin-illinois')
        .style('opacity', 0);

    const focusedLine = detailedMap.selectAll('#line-61-twin');

    const otherPipelines = detailedMap.selectAll('#line-6a, #line-5, #line-61_2_, #line-14');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-9',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateFourthLine = d3.scaleLinear()
        .domain([0.2, 0.55])
        .range([0, 1])
        .clamp(true);

    function enter() {
        otherPipelines.classed('unfocused-pipeline', true);
        focusedLine.classed('focused-pipeline', true);
        oilInPipelines.style('opacity', 0);
    }

    function progress(event) {
        const t = event.progress;
        fourthLine.style('opacity', interpolateFourthLine(t));
    }

    function leave() {
        otherPipelines.classed('unfocused-pipeline', false);
        focusedLine.classed('focused-pipeline', false);
    }

    scene
        .on('enter', enter)
        .on('progress', progress)
        .on('leave', leave);

    return scene;
}
