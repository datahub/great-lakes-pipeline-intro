// An old pipeline route that has been in existence for more than 60 years.
// Capacity has been increased by adding lines.
// Increasing the flow.
// And sidestepping regulations.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { midwestViewBox, wiscMichViewBox } from './view-box';

const strokeDasharray = '4, 8';
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

    const oilInPipelinesPathStrings = detailedMap.selectAll('#wisc-and-mich path, #into-superior path')
            .datum(bindPipelineData).data();

    const oilInPipelines = detailedMap.append('g')
            .attr('class', 'oil-in-pipelines')
        .selectAll('path').data(oilInPipelinesPathStrings)
            .enter().append('path')
            .attr('class', d => `oil-in-${d.id}`)
            .attr('d', d => d.pathString)
            .style('stroke-dasharray', strokeDasharray)
            .style('opacity', 0);

    const fourthLine = detailedMap.selectAll('#line-61-twin, #line-61-twin-illinois, .oil-in-line-61-twin');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-7',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateViewBox = d3.scaleLinear()
        .domain([0, 0.5])
        .range([midwestViewBox, wiscMichViewBox])
        .interpolate(d3.interpolateString)
        .clamp(true);

    const interpolateOpacity = d3.scaleLinear()
        .domain([0.2, 0.4])
        .range([0, 1])
        .clamp(true);

    const interpolateOverviewMap = d3.scaleLinear()
        .domain([0.2, 0.4])
        .range([1, 0])
        .clamp(true);

    const interpolateDetailMap = d3.scaleLinear()
        .domain([0.2, 0.4])
        .range([0, 1])
        .clamp(true);

    function flow(elapsed) {
        const offset = elapsed * flowSpeed;
        oilInPipelines.style('stroke-dashoffset', -offset);
    }

    const timer = d3.interval(flow, 66);
    timer.stop();

    // Bind the timer to the app node
    app.datum({ timer, ticking: false });

    function enterForward() {
        const transition = d3.transition()
            .duration(2000);

        svg.transition(transition)
            .attr('viewBox', wiscMichViewBox);
        
        mapContainer.transition(transition)
            .style('opacity', 0);

        detailedMap.transition(transition)
            .style('opacity', 1);

        oilInPipelines.transition(transition)
            .style('opacity', 1);

        fourthLine.style('opacity', 0);
    }

    function enterReverse() {
        
    }

    function enter(event) {
        timer.restart(flow);
        detailedMap.style('display', null);
        if (event.scrollDirection === 'FORWARD') enterForward();
        if (event.scrollDirection === 'REVERSE') enterReverse();
    }

    function progress(event) {
        const t = event.progress;
        // mapContainer.style('opacity', interpolateOverviewMap(t));
        // detailedMap.style('opacity', interpolateDetailMap(t));
        // oilInPipelines.style('opacity', interpolateOpacity(t));
        // fourthLine.style('opacity', 0);
        // svg.attr('viewBox', interpolateViewBox(t));
    }

    function leave(event) {
        timer.stop(flow);
        if (event.scrollDirection === 'FORWARD') leaveForward();
        if (event.scrollDirection === 'REVERSE') leaveReverse();
    }

    function leaveForward() {

    }

    function leaveReverse() {
        const transition = d3.transition()
            .duration(2000);

        svg.transition(transition)
            .attr('viewBox', midwestViewBox);
        
        mapContainer.transition(transition)
            .style('opacity', 1);

        detailedMap.transition(transition)
            .style('opacity', 0);

        oilInPipelines.transition(transition)
            .style('opacity', 0);

        fourthLine.style('opacity', 0);
    }

    scene
        .on('enter', enter)
        .on('progress', progress)
        .on('leave', leave);

    return scene;
}
