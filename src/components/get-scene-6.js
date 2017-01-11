// All that opposition has forced the oil to flow down the path of least
// resistance:

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import { defaultViewBox, midwestViewBox } from './view-box';

export default function getScene6(app) {
    const svg = app.select('#pipe-background');
    const mapContainer = svg.select('.map-container');
    const pipelines = svg.selectAll('.pipeline');
    const offPipelineCity = svg.selectAll('.off-pipeline-city');
    const detailedMap = svg.select('#detailed-map');

    // const pipelineKeystone = svg.select('#Keystone');  // Red
    // const pipelineProposedKeystone = svg.select('#proposed_keystone');  // Orange
    // // const pipelineDakotaAccess = not on map
    // // const pipelineNorthernGateway = not on map
    // // const pipelineTransmountain = not on map
    // // const pipelineEastPipeline = not on map
    // const pipelineCushing = svg.select('#cushing_extension');  // Bright green
    // const pipelineGulfCoast = svg.select('#gulf_coast_project');  // Spicy mustard
    // const pipelineHouston = svg.select('#houston_lateral');  // Yellow mustard
    // const pipelineLine13 = svg.select('#line_13');  // Yellow-green
    // const pipelineLsr = svg.select('#LSr');  // Light blue

    const pipelineEnbridge = svg.select('#existing_enbridge_lines'); // Purple
    const pipelineAlbertaClipper = svg.select('#Alberta_clipper');  // Pale green
    const pipelineSouthernLights = svg.select('#southern_lights');  // Dark blue

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-6',
        duration: '100%',
        triggerHook: 1,
    });

    // const interpolateViewBox = d3.scaleLinear()
    //     .domain([0, 0.4])
    //     .range([defaultViewBox, midwestViewBox])
    //     .interpolate(d3.interpolateString)
    //     .clamp(true);

    // const interpolateOpacity = d3.scaleLinear()
    //     .domain([0, 0.33])
    //     .range([1, 0])
    //     .clamp(true);

    // const t0 = 0;
    // const t1 = 0.6;

    // const interpolateExistingEnbridge = d3.scaleLinear()
    //     .domain([t0, t1])
    //     .range(['#eee', '#AB88BF'])
    //     .clamp(true);

    // const interpolateAlbertaClipper = d3.scaleLinear()
    //     .domain([t0, t1])
    //     .range(['#eee', '#77BB72'])
    //     .clamp(true);

    // const interpolateSouthernLights = d3.scaleLinear()
    //     .domain([t0, t1])
    //     .range(['#eee', '#6D90B5'])
    //     .clamp(true);

    function enter() {
        pipelineEnbridge.selectAll('path').style('stroke-width', 2);
        pipelineAlbertaClipper.selectAll('path').style('stroke-width', 2);
        pipelineSouthernLights.selectAll('path').style('stroke-width', 2);

        // const forward = event.scrollDirection === 'FORWARD';

        const transition = d3.transition()
            .duration(2000);

        svg.transition(transition).attr('viewBox', midwestViewBox);

        mapContainer.transition(transition).style('opacity', 1);
        detailedMap.transition(transition).style('opacity', 0);

        pipelines.transition(transition).style('opacity', 0);
        offPipelineCity.transition(transition).style('opacity', 0);

        pipelineEnbridge.transition(transition)
                .style('opacity', 1)
            .selectAll('path')
                .style('stroke', '#AB88BF');

        pipelineAlbertaClipper.transition(transition)
                .style('opacity', 1)
            .selectAll('path')
                .style('stroke', '#77BB72');

        pipelineSouthernLights.transition(transition)
                .style('opacity', 1)
            .selectAll('path')
                .style('stroke', '#6D90B5');
    }

    function leave(event) {
        const forward = event.scrollDirection === 'FORWARD';
        if (!forward) {
            const transition = d3.transition()
            .duration(2000);

            svg.transition(transition).attr('viewBox', defaultViewBox);

            pipelines.transition(transition).style('opacity', 1);
            offPipelineCity.transition(transition).style('opacity', 1);

            pipelineEnbridge.transition(transition)
                    .style('opacity', 1)
                .selectAll('path')
                    .style('stroke', '#eee');

            pipelineAlbertaClipper.transition(transition)
                    .style('opacity', 1)
                .selectAll('path')
                    .style('stroke', '#eee');

            pipelineSouthernLights.transition(transition)
                    .style('opacity', 1)
                .selectAll('path')
                    .style('stroke', '#eee');
        }
    }

    scene
        .on('enter', enter)
        .on('leave', leave);

    return scene;
}
