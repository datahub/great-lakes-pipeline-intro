// The pipelines cross rivers and wetlands go through cities and towns
// And the pathways are prone to accidents.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';
import { wiscMichViewBox } from './view-box';

const lakeMichiganSpillData = [
    { r: 20, t0: 0.1, endOpacity: 0.30, blur: true },
    { r: 40, t0: 0.2, endOpacity: 0.25, blur: true },
    { r: 60, t0: 0.3, endOpacity: 0.20, blur: true },
    { r: 80, t0: 0.4, endOpacity: 0.15, blur: true },
    { r: 90, t0: 0.5, endOpacity: 0.10, blur: true },
    { r: 100, t0: 0.6, endOpacity: 0.05, blur: true },
    { r: 5, t0: 0.0, endOpacity: 1.00, blur: false, className: 'spill-epicenter' },
];

export default function getScene10(app) {
    const svg = app.select('#pipe-background');
    const mapContainer = svg.select('.map-container');
    const detailedMap = svg.select('#detailed-map');
    const spillLegend = detailedMap.select('#spill-legend');
    const oilSpills = detailedMap.select('#oil-spills');
    const oilSpill = oilSpills.selectAll('circle');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path');

    const lakeMichiganSpill = detailedMap.select('#background').insert('g', '#nations')
        .attr('id', 'lake-michigan-spill')
        .attr('class', 'oil-spill')
        .attr('transform', 'translate(1604, 561)')
        .style('opacity', 0);

    lakeMichiganSpill.selectAll('.spill-layer').data(lakeMichiganSpillData)
        .enter().append('circle')
            .attr('class', d => `spill-layer ${d.className || ''}`)
            .attr('r', d => d.r)
            // .attr('filter', d => (d.blur ? 'url(#spill-blur)' : null))
            .style('opacity', d => d.endOpacity);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-10',
        duration: '100%',
        triggerHook: 1,
    });

    function enter() {
        mapContainer.style('opacity', 0).style('display', 'none');
        detailedMap.style('opacity', 1).style('display', null);

        const transition = d3.transition()
            .duration(2000);

        svg.transition(transition).attr('viewBox', wiscMichViewBox);

        oilInPipelines.transition(transition).style('opacity', 1);

        oilSpills.transition(transition).style('opacity', 1);

        oilSpill
                .attr('r', 0)
            .transition(transition)
                .attr('r', d => d.r);

        spillLegend.transition(transition)
            .style('opacity', 1);

        lakeMichiganSpill.transition(transition)
            .style('opacity', 0);
    }

    scene
        .on('enter', enter);

    return scene;
}
