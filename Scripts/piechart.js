function pieChart(wholeData, regionId)
{
	
	var jsonArr = [];
	var colorrange = [];
	
	var colors = _.values(getNoiseDescriptorsColors());
	var descriptors = _.keys(getNoiseDescriptorsColors());
	var complaints_type = 18;
	var time_slots = 24;
	for (j = 0; j < complaints_type; j++)
	{	
		var count = 0;
		for (k = 0; k < time_slots; k++)
		{
			count += wholeData[regionId][j][k];
		}
		if (count > 0)
		{
			jsonArr.push({
					"name": descriptors[j],
					"label": Math.round(count).toString(),
					"value": count,
			});
			colorrange.push(colors[j]);
		}
	}
	
	data = jsonArr;
	var width = 300,
   		height = 550,
    	radius = Math.min(width, height) / 2;
	
	var color = d3.scale.ordinal()
		.range(colorrange);

	var arc = d3.svg.arc()
		.outerRadius(radius - 10)
		.innerRadius(radius - 70);

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.value; });
	
	var svg = d3.select(".info").attr("align","center").append("svg")
		.attr("class", "piechart")
		.attr("width", width)
		.attr("height", height)
	    .append("g")
		.attr("transform", "translate(" + width / 2 + "," + (height / 2 - 100) + ")");
	  
	var g = svg.selectAll(".arc")
		.data(pie(data))
		.enter().append("g")
		.attr("class", "arc");
// 		.on("mouseover", function (d) {
// 			d3.select(this)
// 				.classed("hover", true)
// 		  		.attr("stroke", strokecolor)
// 		  		.attr("stroke-width", "0.5px"), 
// 		  		tooltip.html( "<p>" + d.value + "</p>" ).style("visibility", "visible");
// 			})
// 		.on("mouseout", function(d, i) {
// 		 	svg.selectAll(".layer")
// 		  		.transition()
// 		 		.duration(250)
// 		  		.attr("opacity", "1");
// 		  		d3.select(this)
// 		  		  .classed("hover", false)
// 		  		  .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
// 	  	});

	   g.append("path")
		  .attr("d", arc)
		  .attr("data-legend", function(d){ return d.data.name; })
		  .style("fill", function(d, i) { return color(i); });

	   g.append("text")
		  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		  .attr("dy", ".35em")
		  .text(function(d) { return d.data.label; });
		  
	legend = svg.append("g")
            .attr("class", "piechart-legend")
            .attr("transform", "translate(-80,150)")
            .style("font-size", "12px")
            .call(d3.legend)

}
