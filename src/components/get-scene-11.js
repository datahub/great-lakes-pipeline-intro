// In Michigan, one pipeline carries oil under the Great Lakes. Critics say those 50-year-old pipes
// carry the risk of a catastrophic spill.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { mackinacViewBox } from './view-box';

export default function getScene11(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');
    const mapContainer = svg.select('.map-container');
    const historicOilSpills = detailedMap.select('#oil-spills');
    const spillLegend = detailedMap.select('#spill-legend');
    const lakeMichiganSpill = detailedMap.select('#lake-michigan-spill');
    const pipelineLine5 = detailedMap.select('#line-5');
    const oilInPipelines = detailedMap.selectAll('.oil-in-pipelines, .oil-in-pipelines path');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-11',
        duration: '100%',
        triggerHook: 1,
    });

    function enter() {
        mapContainer.style('opacity', 0).style('display', 'none');
        detailedMap.style('opacity', 1).style('display', null);

        const transition = d3.transition()
            .duration(2000);

        svg.transition(transition).attr('viewBox', mackinacViewBox);
        lakeMichiganSpill.transition(transition).style('opacity', 1);
        historicOilSpills.transition(transition).style('opacity', 0);
        spillLegend.transition(transition).style('opacity', 0);
        oilInPipelines.transition(transition).style('opacity', 1);
        pipelineLine5.transition(transition).style('opacity', 1);
    }

    scene
        .on('enter', enter);

    return scene;
}
