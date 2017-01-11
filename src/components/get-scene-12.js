// Activists in Michigan are demanding that pipeline be shut down

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

export default function getScene12(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');
    const pipelineLine5 = detailedMap.select('#line-5');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path');
    const oilSpill = detailedMap.select('.oil-spill');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-12',
        duration: '100%',
        triggerHook: 0,
    });

    // const interpolateLineOpacity = d3.scaleLinear()
    //     .domain([0.1, 0.4])
    //     .range([1, 0])
    //     .clamp(true);

    function enter(event) {
        const forward = event.scrollDirection === 'FORWARD';

        oilInPipelines.style('opacity', 0);

        if (forward) {
            const transition0 = d3.transition()
                .duration(1000);

            oilSpill.transition(transition0)
                .style('opacity', 0)
                .on('end', () => {
                    const transition1 = d3.transition()
                        .duration(2000);
                    pipelineLine5.transition(transition1).style('opacity', 0);
                });
        } else {
            const transition = d3.transition()
                .duration(1000);
            pipelineLine5.transition(transition).style('opacity', 1);
        }
    }

    scene
        .on('enter', enter);

    return scene;
}
