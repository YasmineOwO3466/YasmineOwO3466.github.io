
        var fullwidth5 = 400;
        var fullheight5 = 400;
        var margin5 = {top: 20, right: 50, bottom: 40, left:50};

        var width5 = fullwidth5 - margin5.left - margin5.right;
        var height5 = fullheight5 - margin5.top - margin5.bottom;

        var svg5 = d3.select("#area1")
                    .append("svg")
                    .attr("width", fullwidth5)
                    .attr("height", fullheight5)
                    .append("g")
                    .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");

        var dateFormat = d3.timeFormat("%Y"),
            dateParse = d3.timeParse("%Y");

        var xScale5 = d3.scaleTime()
                            .range([ 0, width5 ]);

        var yScale5 = d3.scaleLinear()
                            .range([ 0, height5 ]);

        var xAxis5 = d3.axisBottom(xScale5)
                        .ticks(4)
		                .tickSize(0)
                        .tickFormat(function(d) {
                            return dateFormat(d);
                        });

        var yAxis5 = d3.axisLeft(yScale5)
		              .tickFormat(function(d) {
        							return d + "%";
        						});


        //Configure area generator
        var area = d3.area()
            .x(function(d) {
                return xScale5(dateParse(d.year));
            })
            .y0(height5) //补齐area下面贴近x轴的那一段
            .y1(function(d) {
                return yScale5(+d.percent);
            });


        d3.csv("data/5.csv", function(data) {


            var years = ["2015", "2016", "2017", "2018"];

            var dataset = [];

            data.forEach(function (d, i) {

                var myPercent = [];

                years.forEach(function (y) {

                    if (d[y]) {
                        myPercent.push({
                            school: d.school,
                            year: y,
                            percent: d[y]  
                        });
                    }

                });

                dataset.push( {
                    school: d.school,
                    number: myPercent  
                    } );

            });


            xScale5.domain(d3.extent(years, function (d) {
                    return dateParse(d);
                })
            );

            yScale5.domain([100, 0]);



            //Make a group for each country
            var groups = svg5.selectAll("g")
                .data(dataset)
                .enter()
                .append("g");

            //Append a title with the country name (so we get easy tooltips)
            groups.append("title")
                .text(function(d) {
                    return d.school;
                });

            //Within each group, create a new path,
            //binding just the emissions data to each one
            groups.selectAll("path")
                .data(function(d) {
                    return [ d.number ];
                })
                .enter()
                .append("path")
                .attr("class", "area")
                .attr("d", area);
			
//			groups.append("text")
//					.attr("x", function(d) {
//						if (d.number.length != 0) {
//					  	var lastYear = d.number[d.number.length-1].year;
//					  	return xScale5(dateParse(lastYear));
//					  }
//					})
//					.attr("y", function(d) {
//						if (d.number.length != 0) {
//					  	var lastAmount = d.number[d.number.length-1].percent;
//					  	return yScale5(lastAmount);
//						}
//					})
//					.attr("dx", "3px")
//					.attr("dy", "3px")
//			        .text(function(d) {
//						if (d.number.length != 0) {
//							var lastAmount = d.number[d.number.length-1].percent;
//							if (year = 2018) {
//								return d.percent;
//							}
//						}
//				        
//					})
//					.attr("class", "linelabel");

            //Axes
            svg5.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height5 + ")")
                .call(xAxis5)
//			    .selectAll("text")
//			    .attr("transform", "translate(0, 6)")
//			    .attr("fill", "white");

            svg5.append("g")
                .attr("class", "y axis")
                .call(yAxis5)
//			    .selectAll("text")
//			    .attr("fill", "white");

        });

