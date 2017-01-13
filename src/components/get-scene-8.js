// So much oil can be routed through Wisconsin that can top the oil brought in from
// Saudi Arabia, Venezuela and Mexico &mdash; combined.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { wiscMichViewBox } from './view-box';

export default function getScene8(app) {
    const svg = app.select('#pipe-background');
    const oilImportsChart = app.select('#oil-imports-chart-container');
    const detailedMap = svg.select('#detailed-map');
    const mapContainer = svg.select('.map-container');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path');
    const fourthLine = detailedMap.selectAll('#line-61-twin, #line-61-twin-illinois');
    const fourthLineOil = detailedMap.select('.oil-in-line-61-twin');
    const whiteOverlay = svg.select('#white-overlay');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-8',
        duration: '100%',
        triggerHook: 1,
    });

    function enter() {
        svg.attr('viewBox', wiscMichViewBox);

        mapContainer.style('opacity', 0).style('display', 'none');
        detailedMap.style('opacity', 1).style('display', null);

        fourthLine.style('opacity', 0);
        fourthLineOil.style('opacity', 0);

        const transition = d3.transition()
            .duration(2000);

        whiteOverlay.transition(transition).style('opacity', 0.8);
        oilImportsChart.transition(transition).style('opacity', 1);
        oilInPipelines.transition(transition).style('opacity', 0);
    }

    scene
        .on('enter', enter);

    return scene;
}
