// If it is, there is one logical spot for even more oil to flow.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { wiscViewBox } from './view-box';

function filterOutline5() {
    const className = d3.select(this).attr('class');
    return className !== 'oil-in-line-5';
}

export default function getScene13(app) {
    const svg = app.select('#pipe-background');
    const mapContainer = svg.select('.map-container');
    const detailedMap = svg.select('#detailed-map');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines');
    const oilInPipelinesPaths = oilInPipelines
        .selectAll('path')
        .filter(filterOutline5);
    const bottomLinks = app.select('#bottom-links');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-13',
        duration: '100%',
        triggerHook: 1,
    });

    function enter() {
        mapContainer.style('opacity', 0).style('display', 'none');
        detailedMap.style('opacity', 1).style('display', null);
        bottomLinks.style('pointer-events', 'none');

        function tEnd() {
            oilInPipelines.classed('fast', true);
        }

        const transition = d3.transition()
            .duration(2000)
            .on('end', tEnd)
            .on('interrupt', () => {
                svg.attr('viewBox', wiscViewBox);
                oilInPipelinesPaths.style('opacity', 1);
                oilInPipelines.classed('fast', true);
                bottomLinks.style('opacity', 0);
            });

        svg.transition(transition).attr('viewBox', wiscViewBox);
        oilInPipelinesPaths.transition(transition).style('opacity', 1);
        bottomLinks.transition(transition).style('opacity', 0);
    }

    function leave(event) {
        const forward = event.scrollDirection === 'FORWARD';
        oilInPipelines.classed('fast', false);
        if (forward) {
            const transition = d3.transition()
                .duration(2000);
            bottomLinks
                    .style('pointer-events', null)
                .transition(transition)
                    .style('opacity', 1);
        } else {
            bottomLinks
                .style('opacity', 0)
                .style('pointer-events', 'none');
        }
    }

    scene
        .on('enter', enter)
        .on('leave', leave);

    return scene;
}
