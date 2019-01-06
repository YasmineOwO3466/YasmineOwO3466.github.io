
		var fullWidth4 = 500;
		var fullHeight4 = 400;
		var margin4 = {top:40, right:10, bottom:60, left:50};  //Top, right, bottom, left

		var width4 = fullWidth4 - margin4.left - margin4.right;
		var height4 = fullHeight4 - margin4.top - margin4.bottom;
		
        var svg4 = d3.select("#bar1")
                    .append("svg")
                    .attr("width", fullWidth4)
                    .attr("height", fullHeight4);

        var g4 = svg4.append("g")
                    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

        var xScale4 = d3.scaleBand()
                       .range([0, width4])
                       .padding(0.5); // 太挤了，所以把padding调大了！

        var yScale4 = d3.scaleLinear()
                       .range([height4, 0]);

        // 定义坐标轴
        var xAxis4 = d3.axisBottom(xScale4).tickSize(0); //ticks too busy...
        var yAxis4 = d3.axisLeft(yScale4).tickSize(0)
        			.tickFormat(function(d) {
        							return d + "%";
        						});
		
		var tooltip4 = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip");
           
        d3.csv("data/4.csv", function(error,data) {

            if (error) throw error; //don't forget this.

            console.log("original", data)

            // 数字格式化
            data.forEach(function(d){
                d.percent = + d.percent;
                // console.log("number", d.Unemployment)
            })

            // 排序
            // 升序
            data.sort(function(a,b){ return b.percent - a.percent; })
            // data.sort(function(a,b){ return d3.ascending(a.Unemployment, b.Unemployment);})
            // 降序
            // data.sort(function(a,b){ return b.Unemployment - a.Unemployment; })
            // data.sort(function(a,b){ return d3.descending(a.Unemployment, b.Unemployment); })
            
            // console.log("sorted", data)

            // 过滤掉0的数据
//            function noZero(d){ return d.Unemployment != 0; }
//            data = data.filter(noZero)
            // data = data.filter(function(d){ return d.Unemployment != 0; })


            // console.log("filtered",data)
            
            //good job here for using array.map()
            xScale4.domain(data.map(function(d) {return d.college;}));
            yScale4.domain([0, d3.max(data, function(d) {return d.percent;})]);

            var rects4 = g4.append("g")
                .attr("class", "bars")
                .selectAll("rect.bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar");

            rects4
                .attr("x", function(d) { return xScale4(d.college);})
                .attr("y", function(d) { return yScale4(d.percent);})
                .attr("width", xScale4.bandwidth())
                .attr("height", function(d) {
                    return height4 - yScale4(d.percent);
                })
			    
			rects4.attr("fill", function(d){
				if(d.percent===100){
					return "rgba(56,87,146,0.7)"
				}else{
					return "rgba(140,192,232,0.7)"
				}
			})
//                .append("title")
//                .text(function(d) {
//                    return d.college + "招收推免生比例为" + d.percent;
//                });

            g4.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height4 + ")")
                .call(xAxis4)
			    .selectAll("text")
                .attr("dy", ".85em")  //dy???
                .attr("transform", "rotate(-30)")
                .style("text-anchor", "end")
//			    .selectAll("text")
//			    .attr("fill", "white")

                // I don't remember how to change tick titles. What can I do? Let's see how to google...
                .selectAll("text")
                .attr("dy", "1em")  //dy???
//                .attr("transform", "rotate(-45)")
                .style("text-anchor", "middle")
                .style("font-size","14px") //但仍然很密集且看不清，所以真的实际应用中，这么多bar，不建议把名称都显示出来，除非纵向排，或者就用交互的方式折中。                     

            g4.append("g")
                .attr("class", "y-axis")
                .call(yAxis4)
//			    .selectAll("text")
//			    .attr("fill", "white")
                // .append("text")
                // .attr("transform", "rotate(-90)")
                // .attr("y", 6)
                // .attr("dy", "0.71em")
                // .attr("text-anchor", "end").text("比率"); I draw the title below

            

            // add label (axis title) to svg, not the big g
            svg4.append("text")
                .attr("class", "yTitle")
                .attr("transform", "translate(" + margin4.left + " ," + margin4.top + ")")
                .style("text-anchor", "middle")
                .attr("dy", "-20")
                .text("百分比")
//			    .attr("fill", "white");
			
			rects4
			    .on("mouseover", mouseoverFunc4) 
                .on("mousemove", mousemoveFunc4) 
                .on("mouseout", mouseoutFunc4); 
         });
		
        function mouseoverFunc4(d) {
            tooltip4
                .style("display", null) 
                .text(d.college + "招收推免生比例为" + d.percent + "%");
//
//            d3.select(this)
//                .attr("stroke", "white")
//			    .attr("stroke-width", 2);
        }

        function mousemoveFunc4(d) {
            tooltip4
                .style("top", (d3.event.pageY - 15) + "px" )
                .style("left", (d3.event.pageX + 15) + "px");
        }

        function mouseoutFunc4(d) {
            tooltip4.style("display", "none"); 

//            d3.selectAll(".rects")
//			    .attr("stroke", "steelblue")
//                .attr("stroke-width", "none");
        }

		
		

		