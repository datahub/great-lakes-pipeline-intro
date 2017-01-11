// Activists in Michigan are demanding that pipeline be shut down

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

export default function getScene12(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');
    const pipelineLine5 = detailedMap.select('#line-5');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-12',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateLineOpacity = d3.scaleLinear()
        .domain([0.1, 0.4])
        .range([1, 0])
        .clamp(true);

    function enter() {
        oilInPipelines.style('opacity', 0);
    }

    function progress(event) {
        const t = event.progress;
        pipelineLine5.style('opacity', interpolateLineOpacity(t));
        // oilInPipelineLine5.style('opacity', interpolateLine5(t));
    }

    scene
        .on('enter', enter)
        .on('progress', progress);

    return scene;
}
