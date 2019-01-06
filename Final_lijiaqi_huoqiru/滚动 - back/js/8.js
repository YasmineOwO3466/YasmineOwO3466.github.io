
		 
		var fullWidth8 = 600;
		var fullHeight8 = 600;
		var margin8 = {top:80, right:10, bottom:150, left:120};  //Top, right, bottom, left

		var width8 = fullWidth8 - margin8.left - margin8.right;
		var height8 = fullHeight8 - margin8.top - margin8.bottom;
		
        var svg8 = d3.select("#bar2")
                    .append("svg")
                    .attr("width", fullWidth8)
                    .attr("height", fullHeight8);

        var g8 = svg8.append("g")
                    .attr("transform", "translate(" + margin8.left + "," + margin8.top + ")");

        var xScale8 = d3.scaleBand()
                       .range([0, width8])
                       .padding(0.5); // 太挤了，所以把padding调大了！

        var yScale8 = d3.scaleLinear()
                       .range([height8, 0]);

        // 定义坐标轴
        var xAxis8 = d3.axisBottom(xScale8).tickSize(0); //ticks too busy...
        var yAxis8 = d3.axisLeft(yScale8)
        			.tickFormat(function(d) {
        							return d + "%";
        						});
         var tooltip8 = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip"); 
        d3.csv("data/8.csv", function(error,data) {//如果该顺序后面也要加顺序

            if (error) throw error; //don't forget this.

            console.log("original", data)

            // 数字格式化
            data.forEach(function(d){
                d.percentage = + d.percentage;
                // console.log("number", d.percentage)
            })

            // 过滤掉0的数据
            function noZero(d){ return d.percentage != 0; }
            data = data.filter(noZero)
            // data = data.filter(function(d){ return d.percentage != 0; })和上面一行一样


            // console.log("filtered",data)
            
            //good job here for using array.map()
            xScale8.domain(data.map(function(d) {return d.reasons;}));
            yScale8.domain([0, d3.max(data, function(d) {return d.percentage;})]);

            var rects8 = g8.append("g")
                .attr("class", "bars")
                .selectAll("rect.bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar");
			
			rects8.attr("fill", function(d){
				if(d.percentage===72.41){
					return "rgba(56,87,146,0.7)"
				}else{
					return "rgba(140,192,232,0.7)"
				}
			})

            rects8
                .attr("x", function(d) { return xScale8(d.reasons);})
                .attr("y", function(d) { return yScale8(d.percentage);})
                .attr("width", xScale8.bandwidth())
                .attr("height", function(d) {
                    return height8 - yScale8(d.percentage);
                })

            g8.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height8 + ")")
                .call(xAxis8)

                // I don't remember how to change tick titles. What can I do? Let's see how to google...
                .selectAll("text")
                .attr("dy", ".85em")  //dy???
                .attr("transform", "rotate(-30)")
                .style("text-anchor", "end")
                .style("font-size","11px") //但仍然很密集且看不清，所以真的实际应用中，这么多bar，不建议把名称都显示出来，除非纵向排，或者就用交互的方式折中。45度排列                     

            g8.append("g")
                .attr("class", "y-axis")
                .call(yAxis8)
                // .append("text")
                // .attr("transform", "rotate(-90)")
                // .attr("y", 6)
                // .attr("dy", "0.71em")
                // .attr("text-anchor", "end").text("比率"); I draw the title below

            

            // add label (axis title) to svg, not the big g
            svg8.append("text")
                .attr("class", "yTitle")
                .attr("transform", "translate(" + margin8.left + " ," + margin8.top + ")")
                .style("text-anchor", "middle")
                .attr("dy", "-10")
                .text("百分比")
			
			rects8
			    .on("mouseover", mouseoverFunc8) 
                .on("mousemove", mousemoveFunc8) 
                .on("mouseout", mouseoutFunc8);
         });
        function mouseoverFunc8(d) {
            tooltip8
                .style("display", null) 
                .text("有" + d.percentage + "%的考生选择考研是因为" + d.reasons);
//
//            d3.select(this)
//                .attr("stroke", "white")
//			    .attr("stroke-width", 2);
        }

        function mousemoveFunc8(d) {
            tooltip8
                .style("top", (d3.event.pageY - 15) + "px" )
                .style("left", (d3.event.pageX + 15) + "px");
        }

        function mouseoutFunc8(d) {
            tooltip8.style("display", "none"); 

//            d3.selectAll(".rects")
//			    .attr("stroke", "steelblue")
//                .attr("stroke-width", "none");
        }


