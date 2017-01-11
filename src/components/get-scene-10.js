// The pipelines cross rivers and wetlands go through cities and towns
// And the pathways are prone to accidents.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';
import oilSpillsData from '../data/oil-spills';
import renderSpillLegend from './render-spill-legend';

const oilSpillByKey = d3.map(oilSpillsData, d => d.key);

function bindOilSpillData() {
    const key = d3.select(this).attr('id');
    return oilSpillByKey.get(key);
}

export default function getScene10(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');
    const legend = renderSpillLegend(app)
        .style('opacity', 0);

    const oilSpills = detailedMap.select('#oil-spills');

    const oilSpill = oilSpills.selectAll('circle')
        .datum(bindOilSpillData)
        .attr('fill', null)
        .attr('r', 0)
        .style('fill', '#000')
        .style('fill-opacity', 0.5)
        .style('stroke', '#000');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-10',
        duration: '100%',
        triggerHook: 0,
    });

    const areaScale = d3.scaleLinear()
        .domain([0, d3.max(oilSpillsData, d => d.spilled)])
        .range([250, 4000]);

    const interpolateOilSpill = d3.scaleLinear()
        .domain([0, 0.33])
        .range([0, 1])
        .clamp(true);

    const interpolateLegend = d3.scaleLinear()
        .domain([0, 0.33, 0.95, 1])
        .range([0, 1, 1, 0])
        .clamp(true);

    oilSpill.data().forEach((d) => {
        const area = areaScale(d.spilled);
        d.r = Math.sqrt(area / Math.PI);
    });

    function progress(event) {
        const t = event.progress;
        oilSpill.attr('r', d => interpolateOilSpill(t) * d.r);
        legend.style('opacity', interpolateLegend(t));
    }

    scene
        .on('progress', progress);

    return scene;
}
