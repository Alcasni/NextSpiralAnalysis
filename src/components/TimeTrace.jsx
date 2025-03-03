"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Spiral3D = ({ drawData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!drawData || drawData.length === 0) return;

    // Set up dimensions (unchanged)
    const width = 600;
    const height = 400; // Reduced height to move upwards more
    const originX = 100; // Shifted left
    const originY = height-200; // Moved further up
    const focalLength = 300;

    // Normalize Data (No scaling changes)
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(drawData, d => d.x)])
      .range([0, 150]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(drawData, d => d.y)])
      .range([0, 150]);

    const tScale = d3.scaleLinear()
      .domain([0, d3.max(drawData, d => d.t)])
      .range([0, 180]);

    // Perspective projection function
    const project3D = (x, y, t) => {
      const scale = focalLength / (focalLength + tScale(t));
      return {
        x: originX + xScale(x),
        y: originY - yScale(y),
        t: originY - tScale(t),
        scale: scale,
      };
    };

    // Select SVG and clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Apply transformation & filter invalid points
    const projectedData = drawData
      .map((d) => project3D(d.x, d.y, d.t))
      .filter(d => d !== null);

    if (projectedData.length === 0) return;

    // Sort points by T-axis (depth sorting)
    projectedData.sort((a, b) => b.t - a.t);

    // Draw Axes (No scaling, just shifting left and up)
    const axisGroup = svg.append("g");

    // X-Axis (Left-aligned)
    axisGroup.append("line")
      .attr("x1", originX).attr("y1", originY)
      .attr("x2", originX + 160).attr("y2", originY)
      .attr("stroke", "black").attr("stroke-width", 1);

    // Y-Axis (Left-aligned)
    axisGroup.append("line")
      .attr("x1", originX).attr("y1", originY)
      .attr("x2", originX - 80).attr("y2", originY - 40)
      .attr("stroke", "black").attr("stroke-width", 1);

    // T-Axis (Left-aligned)
    axisGroup.append("line")
      .attr("x1", originX - 80).attr("y1", originY - 40)
      .attr("x2", originX - 80).attr("y2", originY - 180)
      .attr("stroke", "black").attr("stroke-width", 1).attr("stroke-dasharray", "3,3");

    // Draw Spiral Path
    const line = d3.line()
      .x(d => d.x)
      .y(d => d.t)
      .curve(d3.curveCardinal);

    svg.append("path")
      .datum(projectedData)
      .attr("fill", "none")
      .attr("stroke", "cyan")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Draw Points (No scaling changes)
    svg.selectAll("circle")
      .data(projectedData)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.t)
      .attr("r", d => 3 * d.scale)
      .attr("fill", d => d3.interpolateCool(d.scale));

  }, [drawData]);

  return (
    <div className="flex justify-start items-start mt-[-170px]">
      <svg ref={svgRef} width={600} height={400} style={{ background: "transparent", display: "block" }}></svg>
    </div>
  );
};

export default Spiral3D;
