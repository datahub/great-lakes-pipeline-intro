// And the company that owns the pipeline is considering adding a fourth line
// -- one that would dwarf the rejected Keystone XL.
//
// But Wisconsin is not the destination. In the oil economy, the state is
// mostly just the highway.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';
import { wiscMichViewBox } from './view-box';
import renderSpillLegend from './render-spill-legend';
import oilSpillsData from '../data/oil-spills';

const oilSpillByKey = d3.map(oilSpillsData, d => d.key);

function bindOilSpillData() {
    const key = d3.select(this).attr('id');
    return oilSpillByKey.get(key);
}

export default function getScene9(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');
    const mapContainer = svg.select('.map-container');
    const oilImportsChart = app.select('#oil-imports-chart-container');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path');
    const whiteOverlay = svg.select('#white-overlay');

    const fourthLine = detailedMap.selectAll('#line-61-twin, #line-61-twin-illinois')
        .style('opacity', 0);

    const focusedLine = detailedMap.selectAll('#line-61-twin');

    const otherPipelines = detailedMap.selectAll('#line-6a, #line-5, #line-61_2_, #line-14');

    const oilSpills = detailedMap.select('#oil-spills')
        .style('opacity', 0);

    const oilSpill = oilSpills.selectAll('circle')
        .datum(bindOilSpillData)
        .attr('fill', null)
        .attr('r', 0)
        .style('fill', '#000')
        .style('fill-opacity', 0.5)
        .style('stroke', '#000');

    const areaScale = d3.scaleLinear()
        .domain([0, d3.max(oilSpillsData, d => d.spilled)])
        .range([250, 4000]);

    oilSpill.data().forEach((d) => {
        const area = areaScale(d.spilled);
        d.r = Math.sqrt(area / Math.PI);
    });

    const spillLegend = renderSpillLegend(app)
        .style('opacity', 0);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-9',
        duration: '100%',
        triggerHook: 1,
    });

    function enter() {
        mapContainer.style('opacity', 0).style('display', 'none');
        detailedMap.style('opacity', 1).style('display', null);

        svg.attr('viewBox', wiscMichViewBox);
        otherPipelines.classed('unfocused-pipeline', true);
        focusedLine.classed('focused-pipeline', true);
        oilInPipelines.style('opacity', 0);

        const transition = d3.transition()
            .duration(500);

        whiteOverlay.transition(transition).style('opacity', 0);
        svg.transition(transition).style('opacity', 1);
        oilSpills.transition(transition).style('opacity', 0);
        spillLegend.transition(transition).style('opacity', 0);
        oilImportsChart.transition(transition).style('opacity', 0);
        oilInPipelines.transition(transition).style('opacity', 0);
        fourthLine.transition(transition).style('opacity', 1);
    }

    function leave() {
        otherPipelines.classed('unfocused-pipeline', false);
        focusedLine.classed('focused-pipeline', false);
    }

    scene
        .on('enter', enter)
        .on('leave', leave);

    return scene;
}
