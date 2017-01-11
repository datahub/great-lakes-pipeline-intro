// In Michigan, one pipeline carries oil under the Great Lakes. Critics say those 50-year-old pipes
// carry the risk of a catastrophic spill.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { wiscMichViewBox, mackinacViewBox } from './view-box';

export default function getScene11(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');
    const historicOilSpills = detailedMap.select('#oil-spills');

    const spillLayerData = [
        { r: 20, t0: 0.1, endOpacity: 0.30, blur: true },
        { r: 40, t0: 0.2, endOpacity: 0.25, blur: true },
        { r: 60, t0: 0.3, endOpacity: 0.20, blur: true },
        { r: 80, t0: 0.4, endOpacity: 0.15, blur: true },
        { r: 90, t0: 0.5, endOpacity: 0.10, blur: true },
        { r: 100, t0: 0.6, endOpacity: 0.05, blur: true },
        { r: 5, t0: 0.0, endOpacity: 1.00, blur: false, className: 'spill-epicenter' },
    ];

    const oilSpill = detailedMap.select('#background').insert('g', '#nations')
        .attr('class', 'oil-spill')
        .attr('transform', 'translate(1604, 561)')
        .style('opacity', 0);

    oilSpill.selectAll('.spill-layer').data(spillLayerData)
        .enter().append('circle')
            .attr('class', d => `spill-layer ${d.className || ''}`)
            .attr('r', d => d.r)
            .attr('filter', d => (d.blur ? 'url(#spill-blur)' : null))
            .style('opacity', d => d.endOpacity);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-11',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateHistoricOilSpills = d3.scaleLinear()
        .domain([0, 0.10])
        .range([1, 0])
        .clamp(true);

    const interpolateOilSpill = d3.scalePow().exponent(2)
        .domain([0.1, 0.4, 0.9, 1])
        .range([0, 1, 1, 0])
        .clamp(true);

    const interpolateViewBox = d3.scaleLinear()
        .domain([0, 0.5])
        .range([wiscMichViewBox, mackinacViewBox])
        .interpolate(d3.interpolateString)
        .clamp(true);

    function progress(event) {
        const t = event.progress;
        svg.attr('viewBox', interpolateViewBox(t));
        historicOilSpills.style('opacity', interpolateHistoricOilSpills(t));
        oilSpill.style('opacity', interpolateOilSpill(t));
    }

    scene
        .on('progress', progress);

    return scene;
}
