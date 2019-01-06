
var width7 = 400
    height7 = 400
    margin7 = 40

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius7 = Math.min(width7, height7) / 2 - margin7

// append the svg object to the div called 'my_dataviz'
var svg7 = d3.select("#pie2")
  .append("svg")
    .attr("width", width7)
    .attr("height", height7)
  .append("g")
    .attr("transform", "translate(" + width7 / 2 + "," + height7 / 2 + ")");

// Create dummy data
var data7 = {不会: 67.07, 会: 23.93}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["会", "不会"])
  .range(["#8cc0e8","#385792"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .sort(null) // Do not sort group by size
  .value(function(d) {return d.value; })
var data7_ready = pie(d3.entries(data7))

// The arc generator
var arc7 = d3.arc()
  .innerRadius(radius7 * 0.5)         // This is the size of the donut hole
  .outerRadius(radius7 * 0.8)

// Another arc that won't be drawn. Just for labels positionning
var outerArc7 = d3.arc()
  .innerRadius(radius7 * 0.9)
  .outerRadius(radius7 * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg7
  .selectAll('allSlices')
  .data(data7_ready)
  .enter()
  .append('path')
  .attr('d', arc7)
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

// Add the polylines between chart and labels:
svg7
  .selectAll('allPolylines')
  .data(data7_ready)
  .enter()
  .append('polyline')
    .attr("stroke", "white")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      var posA = arc7.centroid(d) // line insertion in the slice
      var posB = outerArc7.centroid(d) // line break: we use the other arc generator that has been built only for that
      var posC = outerArc7.centroid(d); // Label position = almost the same as posB
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius7 * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })

// Add the polylines between chart and labels:
svg7
  .selectAll('allLabels')
  .data(data7_ready)
  .enter()
  .append('text')
    .text( function(d) { 
      //console.log(d.data.key) ; 
      return d.data.key 
    } )
    .attr('transform', function(d) {
        var pos = outerArc7.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius7 * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
