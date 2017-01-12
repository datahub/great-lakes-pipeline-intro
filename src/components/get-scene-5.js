// As new pipelines have been proposed, opponents have fought back citing
// concerns about global warming, spills and safety.
// - Keystone XL ...
// - ...

import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';

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
    const networkLegend = app.select('#network-legend');

    const pipelines = svg.selectAll('.pipeline')
        .style('opacity', 0)
        .call(bindPipelineLengths)
        .attr('stroke-dasharray', length => `${length} ${length}`);

    const slide1 = new ScrollMagic.Scene({ triggerElement: '#slide-5-1', triggerHook: 1, duration: '100%' });
    const slide2 = new ScrollMagic.Scene({ triggerElement: '#slide-5-2', triggerHook: 1, duration: '100%' });
    const slide3 = new ScrollMagic.Scene({ triggerElement: '#slide-5-3', triggerHook: 1, duration: '100%' });
    const slide4 = new ScrollMagic.Scene({ triggerElement: '#slide-5-4', triggerHook: 1, duration: '100%' });
    const slide5 = new ScrollMagic.Scene({ triggerElement: '#slide-5-5', triggerHook: 1, duration: '100%' });

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

    const slideText = app.select('#slide-5').style('opacity', 0);

    const textProposedKeystone = slideText.select('.proposed-keystone');
    const textDakotaAccess = slideText.select('.dakota-access');
    const textNorthernGateway = slideText.select('.northern-gateway');
    const textTransmountain = slideText.select('.transmountain');
    const textEnergyEast = slideText.select('.energy-east');

    const colorProposedKeystone = d3.color('#8dd3c7').darker(0.25).toString();
    const colorDakotaAccess = d3.color('#bebada').darker(0.25).toString();
    const colorNorthernGateway = d3.color('#fb8072').darker(0.25).toString();
    const colorTransmountain = d3.color('#80b1d3').darker(0.25).toString();
    const colorEnergyEast = d3.color('#b3de69').darker(0.25).toString();

    function tweenStrokeDashoffset(length) {
        return d3.interpolateNumber(length, 0);
    }

    function styleBefore(selection) {
        selection
            .classed('hidden-text', false)
            .classed('unfocused-text', true);
    }

    function styleCurrent(selection) {
        selection
            .classed('hidden-text', false)
            .classed('unfocused-text', false);
    }

    function styleAfter(selection) {
        selection
            .classed('hidden-text', true)
            .classed('unfocused-text', false);
    }

    function enter1() {
        pipelines.style('opacity', 1)
                .style('opacity', 1)
            .selectAll('path')
                .style('stroke', '#eee');

        const transition0 = d3.transition()
            .duration(500);

        rivers.transition(transition0).style('opacity', 0);
        regionNames.transition(transition0).style('opacity', 1);
        cityMarkers.transition(transition0).style('opacity', 1);
        cityNames.transition(transition0).style('opacity', 1);
        pipelines.transition(transition0).style('opacity', 1);
        networkPipelines.transition(transition0).style('opacity', 0);
        allRefineries.transition(transition0).style('opacity', 0);
        networkLegend.transition(transition0).style('opacity', 0);
        slideText.transition(transition0).style('opacity', 1)
            .on('end', () => {
                const transition1 = d3.transition()
                    .duration(2000);

                pipelineProposedKeystone
                    .transition(transition1)
                        .style('opacity', 1)
                        .styleTween('stroke-dashoffset', tweenStrokeDashoffset)
                    .selectAll('path')
                        .style('stroke', colorProposedKeystone);
            });

        textProposedKeystone.call(styleCurrent);
        textDakotaAccess.call(styleAfter);
        textNorthernGateway.call(styleAfter);
        textTransmountain.call(styleAfter);
        textEnergyEast.call(styleAfter);
    }

    function enter2() {
        const transition = d3.transition()
            .duration(2000);

        pipelineDakotaAccess
            .transition(transition)
                .style('opacity', 1)
                .styleTween('stroke-dashoffset', tweenStrokeDashoffset)
            .selectAll('path')
                .style('stroke', colorDakotaAccess);

        textProposedKeystone.call(styleBefore);
        textDakotaAccess.call(styleCurrent);
        textNorthernGateway.call(styleAfter);
        textTransmountain.call(styleAfter);
        textEnergyEast.call(styleAfter);
    }

    function enter3() {
        const transition = d3.transition()
            .duration(2000);

        pipelineNorthernGateway
            .transition(transition)
                .style('opacity', 1)
                .styleTween('stroke-dashoffset', tweenStrokeDashoffset)
            .selectAll('path')
                .style('stroke', colorNorthernGateway);

        textProposedKeystone.call(styleBefore);
        textDakotaAccess.call(styleBefore);
        textNorthernGateway.call(styleCurrent);
        textTransmountain.call(styleAfter);
        textEnergyEast.call(styleAfter);
    }

    function enter4() {
        const transition = d3.transition()
            .duration(2000);

        pipelineTransmountain
            .transition(transition)
                .style('opacity', 1)
                .styleTween('stroke-dashoffset', tweenStrokeDashoffset)
            .selectAll('path')
                .style('stroke', colorTransmountain);

        textProposedKeystone.call(styleBefore);
        textDakotaAccess.call(styleBefore);
        textNorthernGateway.call(styleBefore);
        textTransmountain.call(styleCurrent);
        textEnergyEast.call(styleAfter);
    }

    function enter5() {
        const transition0 = d3.transition()
            .duration(2000);

        pipelineEnergyEast
            .transition(transition0)
                .style('opacity', 1)
                .styleTween('stroke-dashoffset', tweenStrokeDashoffset)
            .selectAll('path')
                .style('stroke', colorEnergyEast);

        textProposedKeystone.call(styleBefore);
        textDakotaAccess.call(styleBefore);
        textNorthernGateway.call(styleBefore);
        textTransmountain.call(styleBefore);
        textEnergyEast.call(styleCurrent);
    }

    slide1.on('enter', enter1);
    slide2.on('enter', enter2);
    slide3.on('enter', enter3);
    slide4.on('enter', enter4);
    slide5.on('enter', enter5);

    return [slide1, slide2, slide3, slide4, slide5];
}

        // textTransmountain.select('.text').transition(transition)
        //     .style('color', '#333');
        // textTransmountain.select('.status').transition(transition)
        //     .style('color', colorStalled);
        // textTransmountain.transition(transition)
        //     .style('border-left-color', colorTransmountain);
