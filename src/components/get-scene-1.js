// The Alberta Tar sands hold 170 billion barrels of recoverable oil, one of the
// largest reserves in the world.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { defaultViewBox, tarSandsViewBox } from './view-box';

export default function getScene1(app) {
    const svg = app.select('#pipe-background');
    // const scrollIndicator = app.select('.scroll-indicator');

    const tarSands = svg.select('#TAR_SANDS')
        .style('opacity', 0);

    const tarSandsLabel = svg.select('#tar-sands-label')
        .style('opacity', 0);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-1',
        duration: '100%',
        triggerHook: 1,
    });

    const interpolateTarSands = d3.scaleLinear()
        .domain([0, 0.33])
        .range([0, 1])
        .clamp(true);

    const interpolateViewBox = d3.scaleLinear()
        .domain([0, 0.33])
        .range([defaultViewBox, tarSandsViewBox])
        .interpolate(d3.interpolateString)
        .clamp(true);

    // const interpolateIndicator = d3.scaleLinear()
    //     .domain([0, 1])
    //     .range([100, -20])
    //     .clamp(true);

    function progress(event) {
        const t = event.progress;
        tarSands.style('opacity', interpolateTarSands(t));
        tarSandsLabel.style('opacity', interpolateTarSands(t));
        svg.attr('viewBox', interpolateViewBox(t));
        // scrollIndicator.style('top', `${interpolateIndicator(t)}%`);
    }

    scene
        .on('progress', progress);

    return scene;
}
