

		var fullwidth9 = 600;
		var fullheight9 = 500;

		var margin9 = { top: 50, right: 80, bottom: 50, left: 50 };

		var width9 = fullwidth9 - margin9.right - margin9.left;
		var height9 = fullheight9 - margin9.top - margin9.bottom;

		var svg9 = d3.select("#scatter2")
				.append("svg")
				.attr("width", fullwidth9)
				.attr("height", fullheight9)
				.append("g")
				.attr("transform", "translate(" + margin9.left + "," + margin9.right + ")");

		var dotRadius9 = 3; 

		var xScale9 = d3.scaleLinear()
							.range([ 0, width9])
							// .domain([-1, 100]);

		var yScale9 = d3.scaleLinear()
							.range([ height9, 0 ])
							// .domain([-1, 100]);

		var xAxis9 = d3.axisBottom(xScale9)
						.ticks(10); 

		var yAxis9 = d3.axisLeft(yScale9);


		// utility for label placement jitter
		/*function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}*/


		d3.csv("data/9.csv", function(data) {

			var menu9 = d3.select("#menu select")
    			.on("change", filter);

			// 初始下拉菜单
  			menu9.property("value", "all");

  			svg9.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height9 + ")")
				.call(xAxis9);

			svg9.append("g")
				.attr("class", "y axis")
				.call(yAxis9);

			svg9.append("text")
				.attr("class", "xlabel")
				.attr("transform", "translate(" + (width9 / 2) + " ," +
							(height9 + 25) + ")")
				.style("text-anchor", "middle")
				.attr("dy", 12)
				.text("报名人数");

			svg9.append("text")
				.attr("class", "ylabel")
				.attr("transform", "rotate(-90) translate(" + (-height9/2)
							 + ",0)")
				.style("text-anchor", "middle")
				.attr("dy", -30)
				.text("录取人数");
			
			function noZero(d){ return d.applicants !=0;}
			data = data.filter(noZero);

			//初始化
			var curSelection9 = menu9.property("value");
  			render(data);  // do the full dataset render first.


  			// Functions for handling updates and drawing with data
			function filter() {
				//get下拉菜单的当前value
				curSelection9 = menu9.property("value");

				if (curSelection9 === "all") {
				  	var newData9 = data; 
				} else if (curSelection9 === "high") { //poorest 10
				  	var newData9 = data.sort(function(a,b) {
					  	return b.rate - a.rate;
				  	}).slice(0, 10);
				} else if (curSelection9 === "low") {  // descending
					var newData9 = data.sort(function(a,b) { // richest 10
						return a.rate - b.rate;
					}).slice(0, 10);
				}

			    console.log(newData9);
				render(newData9);
			}


			function render(data) {//所有要变的东西都写在function里

	  			xScale9.domain(d3.extent(data,function(d){ return +d.applicants; })).nice();
				yScale9.domain(d3.extent(data,function(d){ return +d.admitted_studests; })).nice();

				// data join
				var circles9 = svg9.selectAll("circle")
					.data(data, function(d) {return d.profession;}); // key function!

				circles9.enter()
					.append("circle")
					.merge(circles9)
					.transition()
					.duration(2000)
					.attr("cx", function(d) {
						return xScale9(+d.applicants);
					})
					.attr("cy", function(d) {
						return yScale9(+d.admitted_studests);
					})
					.attr("r", function() {
						if (curSelection9 !== "all") {
							return dotRadius9 * 2;
						}
						else {
							return dotRadius9;
						}
					})
				    .attr("fill", function(d){
					    if (curSelection9 !== "all"){
							if (curSelection9 === "high"){
								return "rgb(140,192,232)";
								} else
								if (curSelection9 === "low"){
								return "rgb(241,158,194)";
								} 
						}else {
									return "rgba(56,87,146,0.7)";
								}
				})

				circles9
					.exit()
					.transition()
					.duration(1000)
					.style("opacity", 0)
					.remove();

				// Update the axes
				svg9.select(".x.axis")
					.transition()
					.duration(1000)
					.call(xAxis9);

	            svg9.select(".y.axis")
	                .transition()
	                .duration(1000)
	                .call(yAxis9);

            	// label the dots if you're only showing 10.
      			if (curSelection9 !== "all") {

          			// data join with a key
					var labels9 = svg9.selectAll("text.dotlabels")
						.data(data, function(d) {
							return d.profession;
						});

					// enter and create any new ones we need. Put minimal stuff here.
					labels9
						.enter()
						.append("text")
						.attr("class", "dotlabels")
						.style("opacity", 0)
						.merge(labels9)
						.attr("transform", function(d) {
						 	return "translate(" + xScale9(+d.applicants) + "," + yScale9(+d.admitted_studests) + ")";
						})
						.attr("dx", function(d){
						if(d.applicants == "165"){
							return -30
						}else{return 5}
					} )
						.attr("dy", function(d) {
							// adding some space for the overlapping ones
							if ( d.applicants == "71"|| d.applicants == "14"||d.applicants == "5") {
								return -20;
							}else if(d.applicants == "1" ){
								return -8;
							} else if(d.applicants == "21"){
								return 8;
							}else{
								return -4;
							}
						})
						.text(function(d) {return d.profession})
						.transition()
						.duration(1000)
						.delay(2000)
						.style("opacity", 1)
					    


					// transition them.
					// labels.transition()
					// 	.duration(2000)
					// 	.style("opacity", 1);

					// remove ones that we don't have now
					labels9.exit()
						.remove(); 

				} else {
					// if we're showing "all countries" - fade out any labels.
					svg9.selectAll("text.dotlabels")
						.transition()
						.duration(1000)
						.style("opacity", 0)
						.remove();
				}

			} // end of render

		});
