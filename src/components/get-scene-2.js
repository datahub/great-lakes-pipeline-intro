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
        triggerElement: '#slide-2',
        duration: '100%',
        triggerHook: 1,
    });

    function enter() {
        chartScene1();

        const transition = d3.transition()
            .duration(2000);
        svg.transition(transition).style('opacity', 0.4);
        oilProductionChart.transition(transition).style('opacity', 1);
    }

    scene
        .on('enter', enter);

    return scene;
}
