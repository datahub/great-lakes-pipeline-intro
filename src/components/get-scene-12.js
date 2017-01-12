// Activists in Michigan are demanding that pipeline be shut down

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { mackinacViewBox } from './view-box';

const flowSpeed = 1 / 75;

export default function getScene12(app) {
    const svg = app.select('#pipe-background');
    const detailedMap = svg.select('#detailed-map');
    const pipelineLine5 = detailedMap.select('#line-5');
    const oilInPipelineLine5 = detailedMap.select('.oil-in-line-5');
    const oilSpill = detailedMap.select('.oil-spill');
    const oilInPipelines = detailedMap.select('.oil-in-pipelines')
        .selectAll('path');

    const scene = new ScrollMagic.Scene({
        triggerElement: '#slide-12',
        duration: '100%',
        triggerHook: 1,
    });

    const timer = app.datum().timer;

    function flow(elapsed) {
        const offset = elapsed * flowSpeed;
        oilInPipelines.style('stroke-dashoffset', -offset);
    }


    function enter(event) {
        const forward = event.scrollDirection === 'FORWARD';

        // timer.restart(flow);

        const transition0 = d3.transition()
            .duration(2000);

        svg.transition(transition0).attr('viewBox', mackinacViewBox);

        if (forward) {
            oilSpill.transition(transition0)
                .style('opacity', 0)
                .on('end', () => {
                    const transition1 = d3.transition()
                        .duration(2000);
                    pipelineLine5.transition(transition1).style('opacity', 0);
                    oilInPipelineLine5.transition(transition1).style('opacity', 0);
                });
        } else {
            pipelineLine5.transition(transition0).style('opacity', 1);
            oilInPipelineLine5.transition(transition0).style('opacity', 1);
        }
    }

    scene
        .on('enter', enter);

    return scene;
}
