// Production is expected to nearly double within the next decade to as much as 4
// million barrels per day.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';
import renderNetworkLegend from './render-network-legend';
import { tarSandsViewBox } from './view-box';
import { chartScene2 } from './render-oil-chart';

export default function getScene3(app) {
    const svg = app.select('#pipe-background');
    const oilProductionChart = app.select('#oil-production-chart')
        .style('opacity', 0);
    const pipelines = svg.selectAll('.pipeline');
    const tarSands = svg.select('#TAR_SANDS');
    const tarSandsLabel = svg.select('#tar-sands-label');
    const rivers = svg.select('#Major_Rivers');
    const networkPipelines = svg.select('#NETWORK_PIPES');
    const allRefineries = svg.selectAll('.refineries');
    const regionNames = svg.selectAll('#Province_Names, #State_Names');
    const legend = renderNetworkLegend(app)
        .style('opacity', 0);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-3',
        duration: '100%',
        triggerHook: 1,
    });

    function enter(event) {
        const forward = event.scrollDirection === 'FORWARD';
        pipelines.style('opacity', 0);

        const transition = d3.transition()
            .duration(2000);

        chartScene2(forward ? 2000 : 0);

        oilProductionChart.transition(transition).style('opacity', 1);

        svg.transition(transition)
                .attr('viewBox', tarSandsViewBox)
                .style('opacity', 0.4);

        if (!forward) {
            tarSands.transition(transition).style('opacity', 1);
            tarSandsLabel.transition(transition).style('opacity', 1);
            rivers.transition(transition).style('opacity', 1);
            regionNames.transition(transition).style('opacity', 1);
            networkPipelines.transition(transition).style('opacity', 0);
            allRefineries.transition(transition).style('opacity', 0);
            legend.transition(transition).style('opacity', 0);
        }
    }

    scene
        .on('enter', enter);

    return scene;
}
