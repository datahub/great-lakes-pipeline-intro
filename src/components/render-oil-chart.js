import * as d3 from 'd3';
import oilProduction from '../data/oil-production';

const margin = { top: 20, left: 20, bottom: 40, right: 120 };
const width = 600 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const app = d3.select('#intro-interactive');

const container = app.insert('div', '#bottom-links')
    .attr('id', 'oil-production-chart-container');

const svg = container.append('svg')
    .attr('id', 'oil-production-chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('opacity', 0);

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const productionFormat = d3.format('.1f');
const yearFormat = d3.format('.0f');

const keyYears = [1997, 2015, 2025];

const xAccessor = d => d.year;

const xScale0 = d3.scaleLinear();

const xValue0 = d => xScale0(xAccessor(d));

const xAxis0 = d3.axisBottom(xScale0)
    .tickFormat(yearFormat)
    .tickValues([1997, 2015]);

const xScale1 = d3.scaleLinear();

const xValue1 = d => xScale1(xAccessor(d));

const xAxis1 = d3.axisBottom(xScale1)
    .tickFormat(yearFormat)
    .tickValues([1997, 2015, 2025]);

const yAccessor = d => d.oil_production;

const yScale = d3.scaleLinear()
    .range([height, 0]);

const yValue = d => yScale(yAccessor(d));

const area0 = d3.area()
    .x(xValue0)
    .y0(yScale(0))
    .y1(yValue)
    .defined(d => d.year <= 2015);

const line0 = d3.line()
    .x(xValue0)
    .y(yValue)
    .defined(d => d.year <= 2015);

const area1 = d3.area()
    .x(xValue1)
    .y0(yScale(0))
    .y1(yValue)
    .defined(d => d.year >= 2015);

const line1 = d3.line()
    .x(xValue1)
    .y(yValue)
    .defined(d => d.year >= 2015);

const datumByYear = d3.map(oilProduction, xAccessor);

yScale.domain([0, d3.max(oilProduction, yAccessor)]);

xScale1
    .domain([1997, 2025])
    .range([0, width]);

xScale0
    .domain([1997, 2015])
    .range([0, xScale1(2015)]);

const defs = svg.append('defs');

const clipPath = defs.append('clipPath').attr('id', 'clip')
    .append('rect')
    .attr('x', xScale1(2014))
    .attr('width', 0)
    .attr('height', height);

const keyDataPoints = oilProduction.filter(d => keyYears.indexOf(d.year) !== -1);

const areaPath0 = g.append('g').attr('class', 'area area--0')
    .append('path').datum(oilProduction)
    .attr('d', area0);

const linePath0 = g.append('g').attr('class', 'line line--0')
    .append('path').datum(oilProduction)
    .attr('d', line0);

g.append('g').attr('class', 'area area--1')
    .append('path').datum(oilProduction)
    .attr('d', area1)
    .attr('clip-path', 'url(#clip)');

g.append('g').attr('class', 'line line--1')
    .append('path').datum(oilProduction)
    .attr('d', line1)
    .attr('clip-path', 'url(#clip)');

const dataLabel = g.append('g').attr('class', 'data-labels')
        .selectAll('data-label').data(keyDataPoints)
    .enter().append('text')
        .attr('class', 'data-label')
        .attr('x', xValue0)
        .attr('y', yValue)
        .attr('dy', '-0.66em')
        .style('text-anchor', 'middle')
        .text(d => productionFormat(d.oil_production));

const dataMarker = g.append('g').attr('class', 'data-markers')
        .selectAll('.data-marker').data(keyDataPoints)
    .enter().append('g')
        .attr('class', 'data-marker')
        .attr('transform', d => `translate(${xValue0(d)},0)`);

dataMarker.append('line')
    .attr('x1', 0.5)
    .attr('x2', 0.5)
    .attr('y1', yValue)
    .attr('y2', yScale(0));

const dataLabel2025 = dataLabel.filter(d => d.year === 2025)
    .style('opacity', 0);

const dataMarker2025 = dataMarker.filter(d => d.year === 2025)
    .style('opacity', 0);

const oilProduction2015 = datumByYear.get(2015).oil_production;

const tx0 = xScale1(2015) + 35;
const ty0 = yScale(oilProduction2015) + 10;

const oilProduction2025 = datumByYear.get(2025).oil_production;

const tx1 = xScale1(2025) + 35;
const ty1 = yScale(oilProduction2025) + 11;

const unitsLabel = svg.append('text').attr('class', 'units-label')
    .attr('transform', `translate(${tx0},${ty0})`);

unitsLabel.append('tspan')
    .attr('x', 0)
    .attr('y', 0)
    .text('million barrels');

unitsLabel.append('tspan')
    .attr('x', 0)
    .attr('y', '1.2em')
    .text('of oil per day');

const projectedUnitLabel = unitsLabel.append('tspan')
    .attr('class', 'projected-label')
    .attr('x', 0)
    .attr('y', '2.4em')
    .text('(projected)')
    .style('opacity', 0);

const xAxisG = g.append('g').attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis0);

const chartTitle = g.append('text').attr('class', 'chart-title');

chartTitle.append('tspan')
    .attr('x', 0)
    .attr('dy', '3em')
    .text('Oil Production');

chartTitle.append('tspan')
    .attr('x', 3)
    .attr('dy', '1.2em')
    .text('in Tar Sands');

export function chartScene1() {
    areaPath0.style('fill-opacity', null);
    linePath0.style('stroke-opacity', null);
    clipPath.attr('width', 0);
    xAxisG.call(xAxis0);
    dataLabel2025.style('opacity', 0);
    dataMarker2025.style('opacity', 0);
    unitsLabel.attr('transform', `translate(${tx0},${ty0})`);
    projectedUnitLabel.style('opacity', 0);
}


export function chartScene2(transitionDuration) {
    const t = d3.transition()
        .duration(transitionDuration);

    areaPath0
        .transition(t)
        .style('fill-opacity', 0.1);

    linePath0
        .transition(t)
        .style('stroke-opacity', 0.2);

    clipPath
        .transition(t)
        .attr('width', xScale1(2025) - xScale1(2014));

    xAxisG
        .transition(t)
        .call(xAxis1);

    dataLabel2025
        .transition(t)
        .style('opacity', 1);

    dataMarker2025
        .transition(t)
        .style('opacity', 1);

    const interpolateOpacity = d3.scaleLinear()
        .domain([0, 0.1, 0.9, 1])
        .range([1, 0, 0, 1]);

    function tweenOpacity() {
        return x => interpolateOpacity(x);
    }

    function tweenTransform() {
        return (x) => {
            let tx = tx0;
            let ty = ty0;
            if (x > 0.1) {
                tx = tx1;
                ty = ty1;
            }
            return `translate(${tx},${ty})`;
        };
    }

    unitsLabel
            .transition(t)
            .styleTween('opacity', tweenOpacity)
            .attrTween('transform', tweenTransform);

    projectedUnitLabel
        .transition(t)
        .style('opacity', 1);
}
