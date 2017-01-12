// That puts the region at the center of a massive North American oil economy. The
// problem is getting bitumen safely to oil refineries across the continent.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { defaultViewBox } from './view-box';

export default function getScene4(app) {
    const svg = app.select('#pipe-background');
    const tarSands = svg.select('#TAR_SANDS');
    const tarSandsLabel = svg.select('#tar-sands-label');
    const rivers = svg.select('#Major_Rivers');
    const pipelines = svg.selectAll('.pipeline');
    const networkPipelines = svg.select('#NETWORK_PIPES');
    const allRefineries = svg.selectAll('.refineries');
    const regionNames = svg.selectAll('#Province_Names, #State_Names');
    const legend = app.select('#network-legend');
    const oilProductionChart = app.select('#oil-production-chart');
    const cityNames = svg.select('#PIPELINE_CITY_NAMES');
    const cityMarkers = svg.select('#Cities');
    const slide5 = app.select('#slide-5');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-4',
        duration: '100%',
        triggerHook: 1,
    });

    function enter() {
        pipelines.style('opacity', 0);

        const transition = d3.transition()
            .duration(2000);

        tarSands.transition(transition).style('opacity', 0.3);
        tarSandsLabel.transition(transition).style('opacity', 0.3);
        rivers.transition(transition).style('opacity', 0);
        regionNames.transition(transition).style('opacity', 0);
        networkPipelines.transition(transition).style('opacity', 0.4);
        allRefineries.transition(transition).style('opacity', 0.6);
        svg.transition(transition)
            .attr('viewBox', defaultViewBox)
            .style('opacity', 1);
        legend.transition(transition).style('opacity', 1);
        oilProductionChart.transition(transition).style('opacity', 0);
        cityMarkers.transition(transition).style('opacity', 0);
        cityNames.transition(transition).style('opacity', 0);
        slide5.style('opacity', 0);
    }

    scene.on('enter', enter);

    return scene;
}
