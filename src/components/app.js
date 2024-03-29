
import ScrollMagic from 'scrollmagic';
import * as d3 from 'd3';
import '../styles.scss';
import '../media/pipelines-converted.svg';
import '../media/pipeline-network.png';
import '../media/wisc-mich-detail.png';
import '../media/detail.svg';

import '../media/wisconsin.png';
import '../media/michigan.png';

import '../media/oil-imports-small.png';
import '../media/oil-imports-medium.png';
import '../media/oil-imports-large.png';

import '../media/prompt-arrow.png';

import getScene1 from './get-scene-1';
import getScene2 from './get-scene-2';
import getScene3 from './get-scene-3';
import getScene4 from './get-scene-4';
import getScene5 from './get-scene-5';
import getScene6 from './get-scene-6';
import getScene7 from './get-scene-7';
// import getScene8 from './get-scene-8';
import getScene9 from './get-scene-9';
import getScene10 from './get-scene-10';
import getScene11 from './get-scene-11';
import getScene12 from './get-scene-12';
import getScene13 from './get-scene-13';

import { defaultViewBox } from './view-box';

export default function () {
    window.onbeforeunload = () => {
        window.scrollTo(0, 0);
    };

    const app = d3.select('#intro-interactive');

    // _____________________________________________________________________________________________

    // app.insert('div', '#bottom-links').attr('id', 'oil-imports-chart-container')
    //     .html(oilImportsChart)
    //     .style('opacity', 0);

    app.select('#bottom-links')
        .style('pointer-events', 'none')
        .style('opacity', 0);

    function ready(error, xml, detailedXml) {
        if (error) throw error;

        app.node().appendChild(xml.documentElement);

        const svg = d3.select('#pipe-background')
            .attr('viewBox', defaultViewBox)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        const whiteOverlay = svg.append('rect')
            .attr('id', 'white-overlay')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 2000)
            .attr('height', 2000)
            .style('fill', '#fff');

        const defs = svg.append('defs');

        defs.append('filter').attr('id', 'spill-blur')
            .append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', 5);

        const detailedMap = svg.append('g').attr('id', 'detailed-map')
            .attr('transform', 'scale(0.19)translate(4836,5078)')
            .style('opacity', 0);

        const detailedMapNodes = d3.select(detailedXml).selectAll('svg > g').nodes();
        detailedMap.node().appendChild(detailedMapNodes[0]);
        detailedMap.node().appendChild(detailedMapNodes[1]);

        detailedMap.selectAll('text, text tspan').attr('font-family', null);
        svg.selectAll('text, text tspan').attr('font-family', null);

        // Manipulate the refineries
        const refineries = svg.selectAll('.refineries');

        refineries.selectAll('.st47')
            .remove();

        // Convert paths to circle
        function pathToCircle() {
            const path = this;
            const g = this.parentNode;
            const pathString = d3.select(path).attr('d');
            const coords = pathString.split('c')[0]
                .replace('M', '')
                .split(',')
                .map(d => +d);
            const cx = coords[0];
            const cy = coords[1] - 3;
            d3.select(g).append('circle')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', 3)
                .style('fill', '#000');
            d3.select(path).remove();
        }
        refineries.selectAll('path')
            .each(pathToCircle);

        refineries.selectAll('circle')
            .attr('r', 2);

        const controller = new ScrollMagic.Controller();

        const scene1 = getScene1(app);
        const scene2 = getScene2(app);
        const scene3 = getScene3(app);
        const scene4 = getScene4(app);
        const scene5 = getScene5(app);
        const scene6 = getScene6(app);
        const scene7 = getScene7(app);
        // const scene8 = getScene8(app);
        const scene9 = getScene9(app);
        const scene10 = getScene10(app);
        const scene11 = getScene11(app);
        const scene12 = getScene12(app);
        const scene13 = getScene13(app);

        controller.addScene([
            scene1,
            scene2,
            scene3,
            scene4,
            scene6,
            scene7,
            scene9,
            scene10,
            scene11,
            scene12,
            scene13,
        ]);

        // Scene 5 is composed of 5 separate scenes
        controller.addScene(scene5);

        svg.select('#TAR_SANDS')
            .style('opacity', 0);

        svg.selectAll('.pipeline')
            .style('opacity', 0);

        svg.select('#PIPELINE_CITIES')
            .style('opacity', 0);

        svg.select('#PIPELINE_CITY_NAMES')
            .style('opacity', 0);

        svg.select('#Cities')
            .style('opacity', 0)
            .selectAll('circle')
            .attr('r', 2.5);

        app.select('#oil-production-chart')
            .style('opacity', 0);

        svg.select('#NETWORK_PIPES')
            .style('opacity', 0);

        svg.select('#OIL_SPILLS')
            .style('opacity', 0);

        svg.select('#OIL_SPILL_NAMES')
            .style('opacity', 0);

        svg.select('#State_Names')
            .style('opacity', 1);

        svg.select('#Province_Names')
            .style('opacity', 1);

        refineries.style('opacity', 0);

        const usColor = '#EDF7EF';

        const highlightedStates = d3.select('#HIGHLIGHTED_STATES');

        function filterUnhighlighted() {
            return !d3.select(this).classed('st22');
        }

        highlightedStates.selectAll('path')
            .filter(filterUnhighlighted)
            .remove();

        highlightedStates.selectAll('path')
            .style('fill', usColor);

        whiteOverlay
            .raise()
            .style('opacity', 0);

        function click() {
            const mouse = d3.mouse(svg.node());
            console.log(mouse);
        }
        d3.select('body').on('click', click);
    }

    function requestSvg(path, callback) {
        d3.xml(path).mimeType('image/svg+xml').get(callback);
    }

    d3.queue()
        .defer(requestSvg, 'media/pipelines-converted.svg')
        .defer(requestSvg, 'media/detail.svg')
        .await(ready);
}
