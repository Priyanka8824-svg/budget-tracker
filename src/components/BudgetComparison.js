import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BudgetComparison = ({ transactions, budget }) => {
  useEffect(() => {
    const totalExpenses = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const data = [
      { category: 'Budget', value: budget },
      { category: 'Expenses', value: totalExpenses }
    ];

    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select('#budget-chart')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => y(0) - y(d.value))
      .attr('fill', d => d.category === 'Budget' ? 'green' : 'red');

    svg.append('g')
      .selectAll('.tick')
      .data(x.domain())
      .enter().append('text')
      .attr('x', d => x(d) + x.bandwidth() / 2)
      .attr('y', height - margin.bottom)
      .attr('dy', '1em')
      .attr('text')
