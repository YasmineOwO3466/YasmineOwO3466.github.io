
		var fullWidth10 = 800;
		var fullHeight10 = 500;
		var margin10 = {top:30, right:10, bottom:80, left:50};  //Top, right, bottom, left

		var width10 = fullWidth10 - margin10.left - margin10.right;
		var height10 = fullHeight10 - margin10.top - margin10.bottom;
		
        var svg10 = d3.select("#bar3")
                    .append("svg")
                    .attr("width", fullWidth10)
                    .attr("height", fullHeight10);

        var g10 = svg10.append("g")
                    .attr("transform", "translate(" + margin10.left + "," + margin10.top + ")");

        var xScale10 = d3.scaleBand()
                       .range([0, width10])
                       .padding(0.5); // 太挤了，所以把padding调大了！

        var yScale10 = d3.scaleLinear()
                       .range([height10, 0]);

        // 定义坐标轴
        var xAxis10 = d3.axisBottom(xScale10).tickSize(0); //ticks too busy...
        var yAxis10 = d3.axisLeft(yScale10)
        			.tickFormat(function(d) {
        							return d;
        						});
        var tooltip10 = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip");
        d3.csv("data/10.csv", function(error,data) {//如果该顺序后面也要加顺序

            if (error) throw error; //don't forget this.

            console.log("original", data)

            // 数字格式化
            data.forEach(function(d){
                d.monthly_salary = + d.monthly_salary;
                // console.log("number", d.monthly_salary)
            })


            xScale10.domain(data.map(function(d) {return d.profession;}));
            yScale10.domain([0, d3.max(data, function(d) {return d.monthly_salary;})]);

            var rects10 = g10.append("g")
                .attr("class", "bars")
                .selectAll("rect.bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar");

            rects10
                .attr("x", function(d) { return xScale10(d.profession);})
                .attr("y", function(d) { return yScale10(d.monthly_salary);})
                .attr("width", xScale10.bandwidth())
                .attr("height", function(d) {
                    return height10 - yScale10(d.monthly_salary);
                })
//                .append("title")
//                .text(function(d) {
//                    return d.profession + "'s 2017 monthly_salary rate is " + d.monthly_salary;
//                });
			rects10.attr("fill", function(d){
				if(d.monthly_salary===10966||d.monthly_salary===10389||d.monthly_salary===10306||d.monthly_salary===10091||d.monthly_salary===10083){
					return "rgba(56,87,146,0.7)"
				}else{
					return "rgba(140,192,232,0.7)"
				}
			})

            g10.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height10 + ")")
                .call(xAxis10)

                // I don't remember how to change tick titles. What can I do? Let's see how to google...
                .selectAll("text")
                .attr("dy", ".85em")  //dy???
                .attr("transform", "rotate(-30)")
                .style("text-anchor", "end")
                .style("font-size","11px") //但仍然很密集且看不清，所以真的实际应用中，这么多bar，不建议把名称都显示出来，除非纵向排，或者就用交互的方式折中。45度排列                     

            g10.append("g")
                .attr("class", "y-axis")
                .call(yAxis10)
                // .append("text")
                // .attr("transform", "rotate(-90)")
                // .attr("y", 6)
                // .attr("dy", "0.71em")
                // .attr("text-anchor", "end").text("比率"); I draw the title below

            

            // add label (axis title) to svg, not the big g
            svg10.append("text")
                .attr("class", "yTitle")
                .attr("transform", "translate(" + margin10.left + " ," + margin10.top + ")")
                .style("text-anchor", "middle")
                .attr("dy", "-10")
                .text("月收入")
			
			rects10
			    .on("mouseover", mouseoverFunc10) 
                .on("mousemove", mousemoveFunc10) 
                .on("mouseout", mouseoutFunc10); 
         });
        function mouseoverFunc10(d) {
            tooltip10
                .style("display", null) 
                .text(d.profession + "行业的月均收入为" + d.monthly_salary + "元");
//
//            d3.select(this)
//                .attr("stroke", "white")
//			    .attr("stroke-width", 2);
        }

        function mousemoveFunc10(d) {
            tooltip10
                .style("top", (d3.event.pageY - 15) + "px" )
                .style("left", (d3.event.pageX + 15) + "px");
        }

        function mouseoutFunc10(d) {
            tooltip10.style("display", "none"); 

//            d3.selectAll(".rects")
//			    .attr("stroke", "steelblue")
//                .attr("stroke-width", "none");
        }

