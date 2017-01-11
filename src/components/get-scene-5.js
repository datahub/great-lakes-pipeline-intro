// As new pipelines have been proposed, opponents have fought back citing
// concerns about global warming, spills and safety.
// - Keystone XL ...
// - ...

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';
import { forEach } from 'lodash';

function getDistance(p0, p1) {
    return Math.sqrt(Math.pow(p1[0] - p0[0], 2) + Math.pow(p1[1] - p0[1], 2));
}

function getPolylineLength(polyline) {
    const points = polyline.points;
    let length = 0;
    for (let i = 1, n = points.length; i < n; i += 1) {
        const p0 = points[i - 1];
        const p1 = points[i];
        length += getDistance([p0.x, p0.y], [p1.x, p1.y]);
    }
    return length;
}

function getLineLength(line) {
    const p0 = [line.x1.baseVal.value, line.y1.baseVal.value];
    const p1 = [line.x2.baseVal.value, line.y2.baseVal.value];
    return getDistance(p0, p1);
}

function getLength(node) {
    let length;
    switch (node.nodeName) {
        case 'polyline':
            length = getPolylineLength(node);
            break;
        case 'line':
            length = getLineLength(node);
            break;
        case 'path':
            length = node.getTotalLength();
            break;
        default:
            length = null;
    }
    return length;
}

function bindPipelineLengths(selection) {
    function bind() {
        const nodes = d3.select(this).selectAll('polyline, line, path').nodes();
        const lengths = nodes
            .filter(node => node)
            .map(node => getLength(node));
        const maxLength = d3.max(lengths);
        return maxLength;
    }
    return selection.datum(bind);
}

export default function getScene5(app) {
    const svg = app.select('#pipe-background');
    const rivers = svg.select('#Major_Rivers');
    const cityNames = svg.select('#PIPELINE_CITY_NAMES');
    const cityMarkers = svg.select('#Cities');
    const networkPipelines = svg.select('#NETWORK_PIPES');
    const allRefineries = svg.selectAll('.refineries');
    const regionNames = svg.selectAll('#Province_Names, #State_Names');

    const pipelines = svg.selectAll('.pipeline')
        .style('opacity', 0)
        .call(bindPipelineLengths)
        .attr('stroke-dasharray', length => `${length} ${length}`);

    const scene = new ScrollMagic.Scene({
        triggerElement: '#trigger-5',
        duration: '800%',
        triggerHook: 0.5,
        offset: 200,
    });

    // const pipelineKeystone = svg.select('#Keystone');  // Red
    // const pipelineEnbridge = svg.select('#existing_enbridge_lines'); // Purple
    // const pipelineLine13 = svg.select('#line_13');  // Yellow-green
    // const pipelineAlbertaClipper = svg.select('#Alberta_clipper');  // Pale green
    // const pipelineLsr = svg.select('#LSr');  // Light blue
    // const pipelineSouthernLights = svg.select('#southern_lights');  // Dark blue
    // const pipelineCushing = svg.select('#cushing_extension');  // Bright green
    // const pipelineGulfCoast = svg.select('#gulf_coast_project');  // Spicy mustard
    // const pipelineHouston = svg.select('#houston_lateral');  // Yellow mustard
    const pipelineProposedKeystone = svg.select('#proposed_keystone');
    const pipelineDakotaAccess = svg.select('#North_Dakota_Access');
    const pipelineNorthernGateway = svg.select('#Northern_Gateway');
    const pipelineTransmountain = svg.select('#TRANS_MOUNTAIN');
    const pipelineEnergyEast = svg.select('#ENERGY_EAST');

    pipelineProposedKeystone.selectAll('path').style('stroke', '#333');
    pipelineDakotaAccess.selectAll('path').style('stroke', '#333');
    pipelineNorthernGateway.selectAll('path').style('stroke', '#333');
    pipelineTransmountain.selectAll('path').style('stroke', '#333');
    pipelineEnergyEast.selectAll('path').style('stroke', '#333');

    const slideText = app.select('#slide-5');

    const proposedPipelineText = slideText.selectAll('.proposed-pipeline');

    proposedPipelineText.selectAll('.text').style('color', '#eee');
    proposedPipelineText.selectAll('.status').style('color', '#eee');
    proposedPipelineText.style('border-left-color', '#eee');

    // const colorKeystone = '#377eb8';
    // const colorDakotaAccess = '#d95f02';
    // const colorNorthernGateway = '#7570b3';
    // const colorTransmountain = '#a6761d';
    // const colorEnergyEast = '#e6ab02';

    const colorKeystone = d3.color('#8dd3c7').darker(0.25).toString();
    const colorDakotaAccess = d3.color('#bebada').darker(0.25).toString();
    const colorNorthernGateway = d3.color('#fb8072').darker(0.25).toString();
    const colorTransmountain = d3.color('#80b1d3').darker(0.25).toString();
    const colorEnergyEast = d3.color('#b3de69').darker(0.25).toString();

    const stoppedColor = '#B9585F';
    const stalledColor = '#dabc20';

    function tScaleGenerator(d) {
        return d3.scaleLinear()
            .domain([d.start, d.end])
            .range([0, 1])
            .clamp(true);
    }

    const interpolateTextColor = d3.scaleLinear()
        .domain([0, 0.1])
        .range(['#eee', '#424242'])
        .clamp(true);

    const interpolateDashOffset = d3.scaleLinear()
        .domain([0, 1])
        .range([1, 0])
        .clamp(true);

    function interpolateStatusGenerator(d) {
        return d3.scaleLinear()
            .domain([0, 0.1])
            .range(['#eee', d.statusColor])
            .clamp(true);
    }

    function interpolateBorderColorGenerator(d) {
        return d3.scaleLinear()
            .domain([0, 0.1])
            .range(['#eee', d.pipeColor])
            .clamp(true);
    }

    function interpolateTextGenerator(d) {
        const tScale = tScaleGenerator(d);
        const interpolateStatus = interpolateStatusGenerator(d);
        const interpolateBorderColor = interpolateBorderColorGenerator(d);
        return (t0) => {
            const t = tScale(t0);
            d.text.select('.text').style('color', interpolateTextColor(t));
            d.text.select('.status').style('color', interpolateStatus(t));
            d.text.style('border-left-color', interpolateBorderColor(t));
        };
    }

    function interpolatePipelineGenerator(d) {
        const tScale = tScaleGenerator(d);
        return (t0) => {
            const t = tScale(t0);
            d.pipeline
                    .style('opacity', 1)
                    .style('stroke-dashoffset', length => `${interpolateDashOffset(t) * length}`)
                .selectAll('path')
                    .style('stroke', d.pipeColor);
        };
    }

    const proposedPipelineData = {
        'keystone-xl': {
            pipeColor: colorKeystone,
            statusColor: stoppedColor,
            start: 0.15,
            end: 0.25,
            pipeline: pipelineProposedKeystone,
        },
        'dakota-access': {
            pipeColor: colorDakotaAccess,
            statusColor: stalledColor,
            start: 0.3,
            end: 0.45,
            pipeline: pipelineDakotaAccess,
        },
        'northern-gateway': {
            pipeColor: colorNorthernGateway,
            statusColor: stoppedColor,
            start: 0.5,
            end: 0.65,
            pipeline: pipelineNorthernGateway,
        },
        transmountain: {
            pipeColor: colorTransmountain,
            statusColor: stalledColor,
            start: 0.7,
            end: 0.85,
            pipeline: pipelineTransmountain,
        },
        'energy-east': {
            pipeColor: colorEnergyEast,
            statusColor: stalledColor,
            start: 0.9,
            end: 1,
            pipeline: pipelineEnergyEast,
        },
    };

    forEach(proposedPipelineData, (d, key) => {
        d.text = slideText.select(`.${key}`);
        const interpolateText = interpolateTextGenerator(d);
        const interpolatePipeline = interpolatePipelineGenerator(d);
        d.interpolate = (t) => {
            interpolateText(t);
            interpolatePipeline(t);
        };
    });

    const interpolateRivers = d3.scaleLinear()
        .domain([0, 0.15])
        .range([0, 1])
        .clamp(true);

    const interpolateRegionNames = d3.scaleLinear()
        .domain([0, 0.15])
        .range([0, 1])
        .clamp(true);

    const interpolateCities = d3.scaleLinear()
        .domain([0.05, 0.15])
        .range([0, 1])
        .clamp(true);

    const interpolatePipelines = d3.scaleLinear()
        .domain([0.05, 0.15])
        .range([0, 1])
        .clamp(true);

    const interpolateNetworkPipelines = d3.scaleLinear()
        .domain([0, 0.05])
        .range([0.4, 0])
        .clamp(true);

    const interpolateAllRefineries = d3.scaleLinear()
        .domain([0, 0.05])
        .range([0.6, 0])
        .clamp(true);

    function enter() {
        pipelines.style('opacity', 1)
                .style('opacity', 1)
            .selectAll('path')
                .style('stroke', '#eee');
    }

    function progress(event) {
        const t = event.progress;

        forEach(proposedPipelineData, (d) => { d.interpolate(t); });

        rivers.style('opacity', interpolateRivers(t));
        regionNames.style('opacity', interpolateRegionNames(t));
        cityMarkers.style('opacity', interpolateCities(t));
        cityNames.style('opacity', interpolateCities(t));
        pipelines.style('opacity', interpolatePipelines(t));
        networkPipelines.style('opacity', interpolateNetworkPipelines(t));
        allRefineries.style('opacity', interpolateAllRefineries(t));
    }

    scene
        .on('enter', enter)
        .on('progress', progress)
        .setPin('#slide-5');

    return scene;
}
