
		var fullWidth1 = 650;
		var fullHeight1 = 500;
		var margin1 = {top:10, right:50, bottom:50, left:80};
		
		var width1 = fullWidth1 - margin1.left - margin1.right;
		var height1 = fullHeight1 - margin1.bottom - margin1.top;
		
		var svg1 = d3.select("#scatter")
		            .append("svg")
		            .attr("width", fullWidth1)
		            .attr("height", fullHeight1)
		            .append("g")
		            .attr("transform", "translate(" + margin1.left + "," + margin1.top +")")
		            .attr("width", width1)
		            .attr("height", height1);
		
		var xScale1 = d3.scaleLinear().range([0, width1]);
		var yScale1 = d3.scaleLinear().range([height1, 0]);
		
		var xAxis1 = d3.axisBottom(xScale1).ticks(10).tickFormat(d3.format(".3s"));
		var yAxis1 = d3.axisLeft(yScale1);
		
		var tooltip1 = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip");
		
		d3.csv("data/1.csv", function(error, data){
			if (error) throw error;
			
			xScale1.domain(
			  [1300000, 2000000]);
			
			yScale1.domain(
			   [500000, 700000]);
			
		var circles = svg1.selectAll("circle")
		                 .data(data)
		                 .enter()
		                 .append("circle");
//		            .sort(function(a,b){
//					return d3.descending(+a.apply, +b.apply)
//				    })
//				    .transition()
//					.delay(function(d, i) { 
//					return i * 2;
//				    })
//					.duration(7000);
			
			circles.attr("cx", function(d){
				   return xScale1(+d.apply);
			     })
			       .attr("cy", function(d){
				   return yScale1(+d.receive);
			     })
			
			       .attr("r", 5)
			       .attr("class", "circle")
			       .attr("fill", "rgb(140,192,232)");
//			       .text(function(d){
//				        return d.Country_name + "'s GDP growth is " + d.GDP_growth + ", and its unemployment  is " + d.Unemployment;}
//			);
			
			circles
				.attr("fill", function(d){
				  if(d.year === "2016"){
					  return "rgb(241,158,194)";}
					  else{
						  return "rgb(140,192,232)";
					  }	  
			})
				  ;
	
			svg1.append("g")
			   .attr("class", "x axis")
			   .attr("transform", "translate(0," + height1 + ")")
			   .call(xAxis1);
//			   .selectAll("text")
//			   .attr("fill", "white");
			
			svg1.append("g")
			   .attr("class", "y axis")
			   .call(yAxis1);
//			   .selectAll("text")
//			   .attr("fill", "white");
			
			svg1.append("text")
				.attr("class", "xlabel")
				.attr("transform", "translate(" + (width1 / 2) + " ," + (height1 + 25) + ")")
				.style("text-anchor", "middle")
				.attr("dy", 15)
				.text("报名人数（人）");
//			    .attr("fill", "white");

			svg1.append("text")
				.attr("class", "ylabel")
				.attr("transform", "rotate(-90) translate(" + (-height1/2)+ ",0)")
				.style("text-anchor", "middle")
				.attr("dy", -55)
				.text("计划招生人数（人）");
//			    .attr("fill", "white");
			
			circles
                .on("mouseover", mouseoverFunc1) 
                .on("mousemove", mousemoveFunc1) 
                .on("mouseout", mouseoutFunc1); 
		});
		 function mouseoverFunc1(d) {
            tooltip1
                .style("display", null) 
                .html(	"年份：" + d.year + "年" +
						"<br>报名人数：" + d.apply + "人" +
						"<br>招生人数：" + d.receive + "人" +
				        "<br>录取率：" + d.rate);

            d3.select(this)
                .attr("r", 7);

        }

        function mousemoveFunc1(d) {
            tooltip1
                .style("top", (d3.event.pageY - 15) + "px" )
                .style("left", (d3.event.pageX + 15) + "px");
        }

        function mouseoutFunc1(d) {
            tooltip1.style("display", "none"); 

            d3.selectAll(".circle")
                .attr("r", 5);
        }



        
