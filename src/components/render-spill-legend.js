import * as d3 from 'd3';

export default function renderSpillLegend(app) {
    const detailedMap = app.select('#detailed-map');
    const detail = detailedMap.select('#detail');

    const legend = detail.append('g')
            .attr('id', 'spill-legend')
            .attr('transform', 'translate(600, 1024)')
        .append('g')
            .attr('transform', 'translate(20, 20)');

    legend.append('rect')
        .attr('x', -19)
        .attr('y', -15)
        .attr('width', 230)
        .attr('height', 180)
        .style('fill', '#fff')
        .style('fill-opacity', 0.8);

    legend.append('rect')
        .attr('x', -15)
        .attr('y', -15)
        .attr('width', 4)
        .attr('height', 180)
        .style('fill', '#636363');

    legend.append('text')
        .attr('class', 'legend-title')
        .attr('x', 25)
        .attr('y', 30)
        .style('font-size', '30px')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .text('Oil spills');

    const areaScale = d3.scaleLinear()
        .domain([0, 20082])
        .range([250, 4000]);

    const data = [
        { value: 500, x: 30, text: '500' },
        { value: 5000, x: 70, text: '5,000' },
        { value: 20000, x: 135, text: '20,000 barrels' },
    ];

    function appendRadius(d) {
        return {
            value: d.value,
            x: d.x,
            text: d.text,
            r: Math.sqrt(areaScale(d.value) / Math.PI),
        };
    }

    const itemData = data.map(appendRadius);

    const item = legend.selectAll('.legend-item').data(itemData)
        .enter().append('g')
            .attr('class', 'legend-item')
            .attr('transform', d => `translate(${d.x}, ${45})`);

    item.append('circle')
        .attr('cy', d => d.r)
        .attr('r', d => d.r);

    item.append('text')
        .attr('y', d => 2 * d.r)
        .attr('dy', '1.2em')
        .style('text-anchor', 'middle')
        .style('fill', '#333')
        .text(d => d.text);

    return legend;
}
