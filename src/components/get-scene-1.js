// The Alberta Tar sands hold 170 billion barrels of recoverable oil, one of the
// largest reserves in the world.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { defaultViewBox, tarSandsViewBox } from './view-box';

export default function getScene1(app) {
    const svg = app.select('#pipe-background');
    const oilProductionChart = app.select('#oil-production-chart');

    const tarSands = svg.select('#TAR_SANDS')
        .style('opacity', 0);

    const tarSandsLabel = svg.select('#tar-sands-label')
        .style('opacity', 0);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-1',
        duration: '100%',
        triggerHook: 1,
    });

    function enter() {
        const transition = d3.transition()
            .duration(2000);

        tarSands.transition(transition)
            .style('opacity', 1);

        tarSandsLabel.transition(transition)
            .style('opacity', 1);

        svg.transition(transition)
            .attr('viewBox', tarSandsViewBox)
            .style('opacity', 1);

        oilProductionChart.transition(transition)
            .style('opacity', 0);
    }

    function leave(event) {
        const forward = event.scrollDirection === 'FORWARD';

        if (!forward) {
            const transition = d3.transition()
                .duration(2000);

            tarSands.transition(transition)
                .style('opacity', 0);

            tarSandsLabel.transition(transition)
                .style('opacity', 0);

            svg.transition(transition)
                .attr('viewBox', defaultViewBox);
        }
    }

    scene
        .on('enter', enter)
        .on('leave', leave);

    return scene;
}
