// An old pipeline route that has been in existence for more than 60 years.
// Capacity has been increased by adding lines.
// Increasing the flow.
// And sidestepping regulations.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { wiscMichViewBox } from './view-box';

const flowSpeed = 1 / 75;

function bindPipelineData() {
    return {
        pathString: d3.select(this).attr('d'),
        id: d3.select(this).attr('id'),
    };
}

export default function getScene7(app) {
    const svg = app.select('#pipe-background');
    const mapContainer = svg.select('.map-container');
    const detailedMap = svg.select('#detailed-map');
    const oilImportsChart = app.select('#oil-imports-chart-container');

    const oilInPipelinesPathStrings = detailedMap.selectAll('#wisc-and-mich path, #into-superior path')
            .datum(bindPipelineData).data();

    const oilInPipelines = detailedMap.append('g')
            .attr('class', 'oil-in-pipelines')
        .selectAll('path').data(oilInPipelinesPathStrings)
            .enter().append('path')
            .attr('class', d => `oil-in-${d.id}`)
            .attr('d', d => d.pathString)
            .style('opacity', 0);

    const fourthLine = detailedMap.selectAll('#line-61-twin, #line-61-twin-illinois, .oil-in-line-61-twin');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-7',
        duration: '100%',
        triggerHook: 1,
    });

    function flow(elapsed) {
        const offset = elapsed * flowSpeed;
        oilInPipelines.style('stroke-dashoffset', -offset);
    }

    const timer = d3.interval(flow, 66);
    timer.stop();

    // Bind the timer to the app node
    app.datum({ timer });

    function enter() {
        // timer.restart(flow);
        detailedMap.style('display', null);

        const transition = d3.transition()
            .duration(2000);

        svg.transition(transition)
            .attr('viewBox', wiscMichViewBox)
            .style('opacity', 1);

        mapContainer.transition(transition)
            .style('opacity', 0);

        detailedMap.transition(transition)
            .style('opacity', 1);

        oilInPipelines.transition(transition)
            .style('opacity', 1);

        fourthLine.transition(transition)
            .style('opacity', 0);

        oilImportsChart.transition(transition)
            .style('opacity', 0);
    }

    scene.on('enter', enter);

    return scene;
}
