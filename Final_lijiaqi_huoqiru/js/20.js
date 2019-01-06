		var width2 = 450;
		var height2 = 400;

		var svg2 = d3.select("#china")
					.append("svg") 
					.attr("width", width2)
					.attr("height", height2);
		
		var tooltip2 = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip");

		var china_g = svg2.append("g");

		var projection = d3.geoMercator()

		var geoGenerator = d3.geoPath()
			.projection(projection);

		var colorScale = d3.scaleOrdinal(d3.schemeCategory20b);
		var colorScale2 = d3.scaleQuantile().range(["#e9f3fd", "#c8d9ed", "#8cc0e8", "#385792"]);

		// we use queue because we have 2 data files to load.
		queue()
		    .defer(d3.json, "data/china_diaoyudao.json")
		    .defer(d3.csv, "data/2.csv", typeAndSet)
		    .await(loaded);

		var countryByName = d3.map();

		function typeAndSet(d){
			d.number = +d.number;
			countryByName.set(d.province, d)
			return d;
		}

		function getColor(d){
			var country = countryByName.get(d.properties.name);
			 console.log(country)

			if(country){
//				console.log(colorScale2(country.number))
				return colorScale2(country.number);
			}else if(d.properties.name!="Antarctica"){
				return "#ccc";
			}else{
				return "#fff";
			}
		}

		function loaded(error, china, gdp){
			if(error) throw error;
			
			console.log(gdp);

//			colorScale2.domain(d3.extent(gdp, function(g){
//				return g.number;
//			}))
			colorScale2.domain(d3.extent(gdp, function(g){
				return g.number;
			}))

			projection.fitSize([450, 400], china);

			var china = china_g.selectAll("path")
				.data(china.features);

			china.enter()
				.append("path")
				.attr("d", geoGenerator)
				// .attr("fill", function(d,i){ return colorScale(i); })
				.attr("fill", function(d){ return getColor(d); })
			    .on("mouseover", mouseoverFunc2) 
                .on("mousemove", mousemoveFunc2) 
                .on("mouseout", mouseoutFunc2); 

			// The d3-legend component is called here:

			var linear = colorScale2;

			svg2.append("g")
				.attr("class", "legendLinear")  
				.attr("transform", "translate(20,20)")


			var legendLinear = d3.legendColor()
				.shapeWidth(30)
				.orient("vertical")
				.labelFormat(d3.format(".0f"))
				.scale(linear);

			svg2.select(".legendLinear")
				.call(legendLinear);

		}

		    var rect01 = svg.append("rect")
            .attr("x",20) 
            .attr("y",30)                
            .attr("width",30)                 
            .attr("height",15)                 
            .attr("fill","#ccc")

            var text01 = svg.append("text")
            .text("1-6名")
            .attr("x",60) 
            .attr("y",40) 
            .attr("font-size",10) 
            .attr("fill","#000")   

            var rect01 = svg.append("rect")
            .attr("x",20) 
            .attr("y",50)                
            .attr("width",30)                 
            .attr("height",15)                 
            .attr("fill","#ccc")

            var text01 = svg.append("text")
            .text("7-11名")
            .attr("x",60) 
            .attr("y",60) 
            .attr("font-size",10) 
            .attr("fill","#000")    

            var rect01 = svg.append("rect")
            .attr("x",20) 
            .attr("y",70)                
            .attr("width",30)                 
            .attr("height",15)                 
            .attr("fill","#ccc")

            var text01 = svg.append("text")
            .text("12-16名")
            .attr("x",60) 
            .attr("y",80) 
            .attr("font-size",10) 
            .attr("fill","#000")    

            var rect01 = svg.append("rect")
            .attr("x",20) 
            .attr("y",90)                
            .attr("width",30)                 
            .attr("height",15)                 
            .attr("fill","#ccc")

            var text01 = svg.append("text")
            .text("17-21名")
            .attr("x",60) 
            .attr("y",100) 
            .attr("font-size",10) 
            .attr("fill","#000")    

            var rect01 = svg.append("rect")
            .attr("x",20) 
            .attr("y",110)                
            .attr("width",30)                 
            .attr("height",15)                 
            .attr("fill","#ccc")

            var text01 = svg.append("text")
            .text("数据缺失")
            .attr("x",60) 
            .attr("y",120) 
            .attr("font-size",10) 
            .attr("fill","#000")     

		function mouseoverFunc2(d) {
			
			if (d.properties.name!="Antarctica"){
				d3.select(this)
				.transition()
				.duration(100)
				.style("stroke-width", 1.5)
			    .style("stroke", "white"); 
				
				if (countryByName.get(d.properties.name)){
				tooltip2
                .style("display", null) 
                .text( d.properties.name + "2018年考研报名人数为" + countryByName.get(d.properties.name)["number"] + "万人");
				}else{
				tooltip2
				.style("display", null)
				.text( d.properties.name + "数据缺失");
				}
			}
           
				
        }

        	function mousemoveFunc2(d) {
            tooltip2
                .style("top", (d3.event.pageY + 10) + "px" )
                .style("left", (d3.event.pageX + 15) + "px");
        }

			function mouseoutFunc2(d) {
				d3.select(this)
				.transition()
				.duration(100)
				.style("stroke-width", 1)
			    .style("stroke", "white"); 
            tooltip2.style("display", "none");
			d3.select(this) 
        }

