// Thanks to technological advances, that ultra thick oil, called bitumen, is
// easier &mdash; and potentially much more profitable &mdash; to recover than in
// the past.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';
import { chartScene1 } from './render-oil-chart';

export default function getScene2(app) {
    const svg = app.select('#pipe-background');
    const oilProductionChart = app.select('#oil-production-chart')
        .style('opacity', 0);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-2',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateOpacity = d3.scaleLinear()
        .domain([0, 0.33])
        .range([0, 1])
        .clamp(true);

    const interpolateBackground = d3.scaleLinear()
        .domain([0, 0.33])
        .range([1, 0.5])
        .clamp(true);

    function enter() {
        chartScene1();
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
