
        var fullwidth3 = 500;
        var fullheight3 = 400;

        var margin3 = { top: 50, right: 70, bottom: 50, left: 70};

        var width3 = fullwidth3 - margin3.right - margin3.left;
        var height3 = fullheight3 - margin3.top - margin3.bottom;

        var svg3 = d3.select("#multiple")
		            .append("svg")
		            .attr("height", fullheight3)
		            .attr("width", fullwidth3)
		            .append("g")
		            .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

        var parseTime = d3.timeParse("%Y"),
            formatTime = d3.timeFormat("%Y年");
            // 呈现出人能看的懂的time

        var xScale3 = d3.scaleTime()
		               .range([0, width3]);

        var yScale3 = d3.scaleLinear()
		               .range([height3, 0]);


        var xAxis3 = d3.axisBottom(xScale3)
		              .tickFormat(function(d){
						  return formatTime(d);
					  })
		              .ticks(4);

                        
        var yAxis3 = d3.axisLeft(yScale3);


        var line3 = d3.line()
		             .x(function(d){
						 return xScale3(parseTime(d.year));
					 })
		             .y(function(d){
						 return yScale3(d.number);
					 });//d3的line生成器
		var radius3 = 3;
		
		var tooltip3 = d3.select("body")
		                .append("div")
		                .attr("class", "tooltip");

        d3.csv("data/30.csv", function(error, data) {
            if (error) throw error; 
			
			var years = d3.keys(data[0]).slice(0, 5-1);
			
			var dataset = [];

            data.forEach(function(d){
				var totalnumber = [];
				
				years.forEach(function(y){
					if (d[y]){
						totalnumber.push({
							myprovince: d.province,
							year: y,
							number: +d[y]
						})
					}
				})
				
				dataset.push({
						province: d.province,
						num: totalnumber
					})

			});

            xScale3.domain(d3.extent(years, function(d){
				return parseTime(d);
			}));
            yScale3.domain([0, d3.max(dataset, function(d){
				return d3.max(d.num, function(d) {
							return +d.number;
						});
			})
						 ])
			.nice();
			
			var groups3 = svg3.selectAll("g")
					.data(dataset)
					.enter()
					.append("g");
			
			groups3.selectAll("path")
					.data(function(d) { 
						return [ d.num ]; 
					})
					.enter()
					.append("path")
					.attr("class", "line3")
					.attr("d", line3)
			        .attr("stroke", "rgb(140,192,232)")
			        .attr("stroke-width", 10);
			
            groups3.append("text")
					.attr("x", function(d) {
						if (d.num.length != 0) {
					  	var lastYear = d.num[d.num.length-1].year;
					  	return xScale3(parseTime(lastYear));
					  }
					})
					.attr("y", function(d) {
						if (d.num.length != 0) {
					  	var lastNumber = d.num[d.num.length-1].number;
					  	return yScale3(lastNumber);
						}
					})
					.attr("dx", "3px")
					.attr("dy", "3px")
					.text(function(d) {
						if (d.num.length != 0) {
						
								return d.province;

						}
					})
					.attr("class", "linelabel");
           
			groups3.on("mouseover", mouseoverGroup3)
				  .on("mouseout", mouseoutGroup3)
			

            // draw xAxis
            svg3.append("g")
                .attr("class", "x axis")
			    .attr("transform", "translate(0," + height3 + ")")
			    .call(xAxis3);
            // draw yAxis
            svg3.append("g")
			    .attr("class", "y axis")
			    .call(yAxis3);
			
			d3.select("g.x.axis")
			  .append("text")
			  .attr("id", "xaxislabel")
			  .attr("text-anchor", "start")
			  .attr("x", width3 + 20)
			  .attr("y", 5)
			  .text("年份");

			d3.select("g.y.axis")
			  .append("text")
			  .attr("id", "yaxislabel")
			  .attr("text-anchor", "middle")
			  .attr("x", 0)
			  .attr("y", -20)
			  .text("人数");
		
			var circles3 = groups3.selectAll("circle")
			                  .data(function(d) { 
								return d.num; 
					})
			                  .enter()
			                  .append("circle");
			
			circles3.attr("cx", function(d){
				return xScale3(parseTime(d.year));
			})
			       .attr("cy", function(d){
				return yScale3(+d.number);
			})
			       .attr("r", radius3)
			       .attr("class", "circle")
			       .attr("opacity", 0)
			       .attr("fill", "rgb(241,158,194)");
		
			circles3.on("mouseover", onmouseover3)
			       .on("mouseout", onmouseout3)
			       .on("mousemove", onmousemove3);

		});
			var voronoi = d3.voronoi()
						.x(function(d) { return x(parseTime(d.year)); })
    					.y(function(d) { return y(d.number); })
    					.extent([[-margin3.left, -margin3.top], [width3 + margin3.right, height3 + margin3.bottom]]);
		
//			var voronoi = d3.geom.voronoi()
//                        .x(function(d) { return xScale(parseTime(d.year)); })
//    					.y(function(d) { return yScale(+d.number); })
//						.clipExtent([[0, 0], [width, height]]);
		
			function mouseoverGroup3(d){
				d3.select(this).select("path").attr("id", "focused"); // overrides the class
				d3.select(this).select("text").classed("hidden", false);  // show it if "hidden"
				d3.select(this).select("text").classed("bolder", true);
			}
			function mouseoutGroup3(d){
				d3.select(this).select("path").attr("id", null); // remove the focus style
				d3.select(this).select("text").classed("bolder", false); // remove the bolding on label
			}
           function onmouseover3(d){
			   d3.select(this)
					.transition()//渐渐变大
					.style("opacity", 1)
					.attr("r", radius3 * 1.5);
			   tooltip3
			       .style("display", null)
			       .html(
						"省份: " + d.myprovince +
						"<br>年份: " + d.year + "年" +
						"<br>考研人数 : " + d.number + "人"
						);
		   }
           function onmousemove3(d){
			   tooltip3
			       .style("top", (d3.event.pageY - 8) + "px")
			       .style("left", (d3.event.pageX + 8) + "px");
		   }
		   function onmouseout3(d){
			   d3.select(this)
					.transition()
					.style("opacity", 0)
					.attr("r", 3);
			   
			   d3.selectAll("path.line").classed("unfocused", true).classed("focused", false);
			   
			   tooltip3
			       .style("display", "none");
		 
		   }
