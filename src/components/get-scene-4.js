// That puts the region at the center of a massive North American oil economy. The
// problem is getting bitumen safely to oil refineries across the continent.

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

import renderNetworkLegend from './render-network-legend';

import { defaultViewBox, tarSandsViewBox } from './view-box';

export default function getScene4(app) {
    const svg = app.select('#pipe-background');
    const tarSands = svg.select('#TAR_SANDS');
    const tarSandsLabel = svg.select('#tar-sands-label');
    const rivers = svg.select('#Major_Rivers');
    const pipelines = svg.selectAll('.pipeline');
    const networkPipelines = svg.select('#NETWORK_PIPES');
    const allRefineries = svg.selectAll('.refineries');
    const regionNames = svg.selectAll('#Province_Names, #State_Names');
    const legend = renderNetworkLegend(app)
        .style('opacity', 0);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-4',
        duration: '100%',
        triggerHook: 0,
    });

    const interpolateTarSands = d3.scaleLinear()
        .domain([0, 0.33])
        .range([1, 0.3])
        .clamp(true);

    const interpolateRivers = d3.scaleLinear()
        .domain([0, 0.33])
        .range([1, 0])
        .clamp(true);

    const interpolateRegionNames = d3.scaleLinear()
        .domain([0, 0.33])
        .range([1, 0])
        .clamp(true);

    const interpolateNetworkPipelines = d3.scaleLinear()
        .domain([0, 0.33])
        .range([0, 0.4])
        .clamp(true);

    const interpolateAllRefineries = d3.scaleLinear()
        .domain([0, 0.33])
        .range([0, 0.6])
        .clamp(true);

    const interpolateLegend = d3.scaleLinear()
        .domain([0.4, 0.5, 0.9, 1])
        .range([0, 1, 1, 0])
        .clamp(true);

    const interpolateViewBox = d3.scaleLinear()
        .domain([0, 0.4])
        .range([tarSandsViewBox, defaultViewBox])
        .interpolate(d3.interpolateString)
        .clamp(true);

    function enter() {
        pipelines.style('opacity', 0);
    }

    function progress(event) {
        const t = event.progress;
        tarSands.style('opacity', interpolateTarSands(t));
        tarSandsLabel.style('opacity', interpolateTarSands(t));
        rivers.style('opacity', interpolateRivers(t));
        regionNames.style('opacity', interpolateRegionNames(t));
        networkPipelines.style('opacity', interpolateNetworkPipelines(t));
        allRefineries.style('opacity', interpolateAllRefineries(t));
        svg.attr('viewBox', interpolateViewBox(t));
        legend.style('opacity', interpolateLegend(t));
    }

    scene
        .on('enter', enter)
        .on('progress', progress);

    return scene;
}
