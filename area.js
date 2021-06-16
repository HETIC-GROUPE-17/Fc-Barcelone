// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg;

var update = function(url, color){
  d3.select("#trophe svg").remove();
  d3.select("#trophe div").remove();

  svg = d3.select("#trophe " , "#but")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
  d3.csv(url,

    // When reading the csv, I must format variables:
    function(d){
      return { date : d3.timeParse("%Y")(d.date), value : d.value }
    },

    // Now I can use this dataset:
    function(data) {
        console.log(data)

      // Keep only the 90 first rows
      data = data.filter(function(d,i){ return i<90})

      // Add X axis --> it is a date format
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + (height+10) + ")")
        .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

      // Add Y axis
      var y = d3.scaleLinear()
        // .domain([0,6] )
        .domain( d3.extent(data, function(d) { return +d.value; }) )
        .range([ height, 0 ]);
      svg.append("g")
        .attr("transform", "translate(-8)")
        .call(d3.axisLeft(y).tickSizeOuter(0));

      // Add the area
      svg.append("path")
        .datum(data)
        .attr("fill", "#69b3a2")
        .attr("fill-opacity", .3)
        .attr("stroke", "none")
        .attr("d", d3.area()
          .x(function(d) { return x(d.date) })
          .y0( height )
          .y1(function(d) { return y(d.value) })
          )

      // Add the line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 4)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.value) })
          )

      // Add the line
      svg.selectAll("myCircles")
        .data(data)
        .enter()
        .append("circle")
          .attr("fill", "red")
          .attr("stroke", "none")
          .attr("cx", function(d) { return x(d.date) })
          .attr("cy", function(d) { return y(d.value) })
          .attr("r", 6)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)

        // tolltip

          var Tooltip = d3.select("#trophe")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("background-color", "white")
          .style("border", "solid")
          .style("border-width", "2px")
          .style("border-radius", "5px")
          .style("padding", "5px")
      

      
      var mouseover = function(d) {
          Tooltip
          .style("opacity", 1)
      }

      var mousemove = function(d) {
        Tooltip
          .html("Trophe " + d.value)
          .style("left", (d3.mouse(this)[0]+70) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }

      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
      }
  });
};

update('./trophe.csv', 'red');