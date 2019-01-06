
var width6 = 400,
    height6 = 400,
    margin6 = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius6 = Math.min(width6, height6) / 2 - margin6

// append the svg object to the div called 'my_dataviz'
var svg6 = d3.select("#pie1")
  .append("svg")
    .attr("width", width6)
    .attr("height", height6)
  .append("g")
    .attr("transform", "translate(" + width6 / 2 + "," + height6 / 2 + ")");

// Create dummy data
var data6 = {不会: 13.88, 会: 86.12}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["会", "不会"])
  .range(["#8cc0e8","#385792"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .sort(null) // Do not sort group by size
  .value(function(d) {return d.value; })
var data6_ready = pie(d3.entries(data6))

// The arc generator
var arc6 = d3.arc()
  .innerRadius(radius6 * 0.5)         // This is the size of the donut hole
  .outerRadius(radius6 * 0.8)

// Another arc that won't be drawn. Just for labels positionning
var outerArc6 = d3.arc()
  .innerRadius(radius6 * 0.9)
  .outerRadius(radius6 * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg6
  .selectAll('allSlices')
  .data(data6_ready)
  .enter()
  .append('path')
  .attr('d', arc6)
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

// Add the polylines between chart and labels:
svg6
  .selectAll('allPolylines')
  .data(data6_ready)
  .enter()
  .append('polyline')
    .attr("stroke", "white")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      var posA = arc6.centroid(d) // line insertion in the slice
      var posB = outerArc6.centroid(d) // line break: we use the other arc generator that has been built only for that
      var posC = outerArc6.centroid(d); // Label position = almost the same as posB
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius6 * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })

// Add the polylines between chart and labels:
svg6
  .selectAll('allLabels')
  .data(data6_ready)
  .enter()
  .append('text')
    .text( function(d) { console.log(d.data.key) ; return d.data.key } )
    .attr('transform', function(d) {
        var pos = outerArc6.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius6 * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
