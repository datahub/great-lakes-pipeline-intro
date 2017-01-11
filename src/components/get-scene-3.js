// Production is expected to nearly double within the next decade to as much as 4
// million barrels per day.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';
import { chartScene2 } from './render-oil-chart';

export default function getScene3(app) {
    const svg = app.select('#pipe-background');
    const oilProductionChart = app.select('#oil-production-chart')
        .style('opacity', 0);
    const pipelines = svg.selectAll('.pipeline');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-3',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateOpacity = d3.scaleLinear()
        .domain([0.95, 1])
        .range([1, 0])
        .clamp(true);

    const interpolateBackground = d3.scaleLinear()
        .domain([0.8, 1])
        .range([0.5, 1])
        .clamp(true);

    function enter(event) {
        pipelines.style('opacity', 0);
        const transitionDuration = event.scrollDirection === 'FORWARD' ? 2000 : 0;
        chartScene2(transitionDuration);
    }

    function progress(event) {
        const t = event.progress;
        svg.style('opacity', interpolateBackground(t));
        oilProductionChart.style('opacity', interpolateOpacity(t));
    }

    function exit() {
        oilProductionChart.style('opacity', 0);
    }

    scene
        .on('enter', enter)
        .on('progress', progress)
        .on('exit', exit);

    return scene;
}
