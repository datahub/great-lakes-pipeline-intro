export default function renderNetworkLegend(app) {
    const width = 200;
    const height = 100;

    const legend = app.insert('div', '#bottom-links')
        .attr('id', 'network-legend');

    const svg = legend.append('svg')
            .attr('width', width)
            .attr('height', height)
        .append('g')
            .attr('transform', 'translate(20, 20)');

    svg.append('text')
        .attr('x', 20)
        .attr('y', 15)
        .style('font-size', '20px')
        .text('Key');

    const refinery = svg.append('g').attr('class', 'legend--refinery')
        .attr('transform', 'translate(23,35)');

    refinery.append('circle')
        .attr('cx', 10)
        .attr('r', 2)
        .style('opacity', 0.6);

    refinery.append('text')
        .attr('x', 20)
        .attr('dx', '0.33em')
        .attr('dy', '0.33em')
        .text('Oil Refinery');

    const pipeline = svg.append('g').attr('class', 'legend--pipeline')
        .attr('transform', 'translate(23, 55)');

    pipeline.append('line')
        .attr('x1', 20)
        .style('stroke', '#000')
        .style('stroke-width', '1px')
        .style('opacity', 0.4);

    pipeline.append('text')
        .attr('x', 20)
        .attr('dx', '0.33em')
        .attr('dy', '0.33em')
        .text('Pipeline');

    return legend;
}
