var require = meteorInstall({"client":{"main.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.html                                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = require("./template.main.js");                                                                        // 1
                                                                                                                       // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.main.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/template.main.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.body.addContent((function() {                                                                                 // 2
  var view = this;                                                                                                     // 3
  return HTML.DIV({                                                                                                    // 4
    class: "container"                                                                                                 // 5
  }, HTML.Raw('\n    <div class="col-12">\n      <h1 class="text-center">Welcome to Resource Management</h1>\n    </div>\n    '), HTML.DIV({
    class: "container"                                                                                                 // 7
  }, "\n        ", HTML.DIV({                                                                                          // 8
    id: "top-left"                                                                                                     // 9
  }, "\n          ", Spacebars.include(view.lookupTemplate("resource_filter")), "\n        "), "\n\n        ", HTML.DIV({
    id: "top-middle",                                                                                                  // 11
    style: "overflow-y:auto;"                                                                                          // 12
  }, "\n          ", Spacebars.include(view.lookupTemplate("resource_list")), "\n        "), "\n\n        ", HTML.DIV({
    id: "top-right"                                                                                                    // 14
  }, "\n          ", Spacebars.include(view.lookupTemplate("resource_display")), "\n        "), "\n    "), "\n    ", HTML.DIV("\n      ", HTML.DIV({
    class: "container"                                                                                                 // 16
  }, "\n        ", Spacebars.include(view.lookupTemplate("resource_visualization")), "\n      "), "\n    "), "\n  ");  // 17
}));                                                                                                                   // 18
Meteor.startup(Template.body.renderToDocument);                                                                        // 19
                                                                                                                       // 20
Template.__checkName("resource_filter");                                                                               // 21
Template["resource_filter"] = new Template("Template.resource_filter", (function() {                                   // 22
  var view = this;                                                                                                     // 23
  return HTML.DIV({                                                                                                    // 24
    class: "container-fluid"                                                                                           // 25
  }, "\n    ", HTML.FORM({                                                                                             // 26
    class: "employee_filter"                                                                                           // 27
  }, "\n      ", Blaze.Each(function() {                                                                               // 28
    return Spacebars.call(view.lookup("getSkills"));                                                                   // 29
  }, function() {                                                                                                      // 30
    return [ "\n        ", HTML.LABEL(HTML.INPUT({                                                                     // 31
      type: "checkbox",                                                                                                // 32
      class: "skill_filter",                                                                                           // 33
      name: "skill_box",                                                                                               // 34
      value: function() {                                                                                              // 35
        return Spacebars.mustache(view.lookup("skill"));                                                               // 36
      }                                                                                                                // 37
    }), Blaze.View("lookup:skill", function() {                                                                        // 38
      return Spacebars.mustache(view.lookup("skill"));                                                                 // 39
    })), "\n      " ];                                                                                                 // 40
  }), "\n      ", HTML.Raw('<input type="submit" value="Submit">'), "\n    "), "\n  ");                                // 41
}));                                                                                                                   // 42
                                                                                                                       // 43
Template.__checkName("resource_display");                                                                              // 44
Template["resource_display"] = new Template("Template.resource_display", (function() {                                 // 45
  var view = this;                                                                                                     // 46
  return [ HTML.H3("Name: ", Blaze.View("lookup:display_employee_details.name", function() {                           // 47
    return Spacebars.mustache(Spacebars.dot(view.lookup("display_employee_details"), "name"));                         // 48
  })), "\n  ", HTML.P("Location: ", Blaze.View("lookup:display_employee_details.location", function() {                // 49
    return Spacebars.mustache(Spacebars.dot(view.lookup("display_employee_details"), "location"));                     // 50
  })), "\n  ", HTML.P("Role: ", Blaze.View("lookup:display_employee_details.role", function() {                        // 51
    return Spacebars.mustache(Spacebars.dot(view.lookup("display_employee_details"), "role"));                         // 52
  })), "\n  ", Spacebars.include(view.lookupTemplate("radarChart")) ];                                                 // 53
}));                                                                                                                   // 54
                                                                                                                       // 55
Template.__checkName("resource_visualization");                                                                        // 56
Template["resource_visualization"] = new Template("Template.resource_visualization", (function() {                     // 57
  var view = this;                                                                                                     // 58
  return "";                                                                                                           // 59
}));                                                                                                                   // 60
                                                                                                                       // 61
Template.__checkName("resource_list");                                                                                 // 62
Template["resource_list"] = new Template("Template.resource_list", (function() {                                       // 63
  var view = this;                                                                                                     // 64
  return HTML.TABLE({                                                                                                  // 65
    class: "hoverTable"                                                                                                // 66
  }, "\n      ", HTML.THEAD("\n        ", HTML.TH("\n          Name:\n        "), "\n        ", HTML.TH("\n          Team:\n        "), "\n        ", HTML.TH("\n          Role:\n        "), "\n        ", HTML.TH("\n          Office:\n        "), "\n        ", HTML.TH("\n          Location:\n        "), "\n      "), "\n      ", HTML.TBODY("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getEmployees"));                                                                // 68
  }, function() {                                                                                                      // 69
    return [ "\n          ", Spacebars.include(view.lookupTemplate("employee_row")), "\n        " ];                   // 70
  }), "\n      "), "\n  ");                                                                                            // 71
}));                                                                                                                   // 72
                                                                                                                       // 73
Template.__checkName("employee_row");                                                                                  // 74
Template["employee_row"] = new Template("Template.employee_row", (function() {                                         // 75
  var view = this;                                                                                                     // 76
  return HTML.TR({                                                                                                     // 77
    class: "employee_row"                                                                                              // 78
  }, "\n      ", HTML.TD("\n        ", Blaze.View("lookup:name", function() {                                          // 79
    return Spacebars.mustache(view.lookup("name"));                                                                    // 80
  }), "\n      "), "\n      ", HTML.TD("\n        ", Blaze.View("lookup:team", function() {                            // 81
    return Spacebars.mustache(view.lookup("team"));                                                                    // 82
  }), "\n      "), "\n      ", HTML.TD("\n        ", Blaze.View("lookup:role", function() {                            // 83
    return Spacebars.mustache(view.lookup("role"));                                                                    // 84
  }), "\n      "), "\n      ", HTML.TD("\n        ", Blaze.View("lookup:office", function() {                          // 85
    return Spacebars.mustache(view.lookup("office"));                                                                  // 86
  }), "\n      "), "\n      ", HTML.TD("\n       ", Blaze.View("lookup:location", function() {                         // 87
    return Spacebars.mustache(view.lookup("location"));                                                                // 88
  }), "\n      "), "\n    ");                                                                                          // 89
}));                                                                                                                   // 90
                                                                                                                       // 91
Template.__checkName("radarChart");                                                                                    // 92
Template["radarChart"] = new Template("Template.radarChart", (function() {                                             // 93
  var view = this;                                                                                                     // 94
  return [ HTML.Raw('<div class="radarChart"></div>\n  '), HTML.SCRIPT('\n    function RadarChart(id, data, options) {\n      var cfg = {\n       w: 600,\t\t\t\t//Width of the circle\n       h: 600,\t\t\t\t//Height of the circle\n       margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG\n       levels: 3,\t\t\t\t//How many levels or inner circles should there be drawn\n       maxValue: 0, \t\t\t//What is the value that the biggest circle will represent\n       labelFactor: 1.25, \t//How much farther than the radius of the outer circle should the labels be placed\n       wrapWidth: 60, \t\t//The number of pixels after which a label needs to be given a new line\n       opacityArea: 0.35, \t//The opacity of the area of the blob\n       dotRadius: 4, \t\t\t//The size of the colored circles of each blog\n       opacityCircles: 0.1, \t//The opacity of the circles of each blob\n       strokeWidth: 2, \t\t//The width of the stroke around each blob\n       roundStrokes: false,\t//If true the area and stroke will follow a round path (cardinal-closed)\n       color: d3.scale.category10()\n      };\n\n      //Put all of the options into a variable called cfg\n      if(\'undefined\' !== typeof options){\n        for(var i in options){\n        if(\'undefined\' !== typeof options[i]){ cfg[i] = options[i]; }\n        }//for i\n      }//if\n\n      //If the supplied maxValue is smaller than the actual one, replace by the max in the data\n      var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));\n\n      var allAxis = (data[0].map(function(i, j){return i.axis})),\t//Names of each axis\n        total = allAxis.length,\t\t\t\t\t//The number of different axes\n        radius = Math.min(cfg.w/2, cfg.h/2), \t//Radius of the outermost circle\n        Format = d3.format(\'\'),\t\t\t \t//Percentage formatting\n        angleSlice = Math.PI * 2 / total;\t\t//The width in radians of each "slice"\n\n      //Scale for the radius\n      var rScale = d3.scale.linear()\n        .range([0, radius])\n        .domain([0, maxValue]);\n\n      /////////////////////////////////////////////////////////\n      //////////// Create the container SVG and g /////////////\n      /////////////////////////////////////////////////////////\n\n      //Remove whatever chart with the same id/class was present before\n      d3.select(id).select("svg").remove();\n\n      //Initiate the radar chart SVG\n      var svg = d3.select(id).append("svg")\n          .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)\n          .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)\n          .attr("class", "radar"+id);\n      //Append a g element\n      var g = svg.append("g")\n          .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");\n\n      /////////////////////////////////////////////////////////\n      ////////// Glow filter for some extra pizzazz ///////////\n      /////////////////////////////////////////////////////////\n\n      //Filter for the outside glow\n      var filter = g.append(\'defs\').append(\'filter\').attr(\'id\',\'glow\'),\n        feGaussianBlur = filter.append(\'feGaussianBlur\').attr(\'stdDeviation\',\'2.5\').attr(\'result\',\'coloredBlur\'),\n        feMerge = filter.append(\'feMerge\'),\n        feMergeNode_1 = feMerge.append(\'feMergeNode\').attr(\'in\',\'coloredBlur\'),\n        feMergeNode_2 = feMerge.append(\'feMergeNode\').attr(\'in\',\'SourceGraphic\');\n\n      /////////////////////////////////////////////////////////\n      /////////////// Draw the Circular grid //////////////////\n      /////////////////////////////////////////////////////////\n\n      //Wrapper for the grid & axes\n      var axisGrid = g.append("g").attr("class", "axisWrapper");\n\n      //Draw the background circles\n      axisGrid.selectAll(".levels")\n         .data(d3.range(1,(cfg.levels+1)).reverse())\n         .enter()\n        .append("circle")\n        .attr("class", "gridCircle")\n        .attr("r", function(d, i){return radius/cfg.levels*d;})\n        .style("fill", "#CDCDCD")\n        .style("stroke", "#CDCDCD")\n        .style("fill-opacity", cfg.opacityCircles)\n        .style("filter" , "url(#glow)");\n\n      //Text indicating at what % each level is\n      axisGrid.selectAll(".axisLabel")\n         .data(d3.range(1,(cfg.levels+1)).reverse())\n         .enter().append("text")\n         .attr("class", "axisLabel")\n         .attr("x", 4)\n         .attr("y", function(d){return -d*radius/cfg.levels;})\n         .attr("dy", "0.4em")\n         .style("font-size", "10px")\n         .attr("fill", "#737373")\n         .text(function(d,i) { return Format(maxValue * d/cfg.levels); });\n\n      /////////////////////////////////////////////////////////\n      //////////////////// Draw the axes //////////////////////\n      /////////////////////////////////////////////////////////\n\n      //Create the straight lines radiating outward from the center\n      var axis = axisGrid.selectAll(".axis")\n        .data(allAxis)\n        .enter()\n        .append("g")\n        .attr("class", "axis");\n      //Append the lines\n      axis.append("line")\n        .attr("x1", 0)\n        .attr("y1", 0)\n        .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })\n        .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })\n        .attr("class", "line")\n        .style("stroke", "white")\n        .style("stroke-width", "2px");\n\n      //Append the labels at each axis\n      axis.append("text")\n        .attr("class", "legend")\n        .style("font-size", "11px")\n        .attr("text-anchor", "middle")\n        .attr("dy", "0.35em")\n        .attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })\n        .attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })\n        .text(function(d){return d})\n        .call(wrap, cfg.wrapWidth);\n\n      /////////////////////////////////////////////////////////\n      ///////////// Draw the radar chart blobs ////////////////\n      /////////////////////////////////////////////////////////\n\n      //The radial line function\n      var radarLine = d3.svg.line.radial().interpolate("linear-closed")\n        .radius(function(d) { return rScale(d.value); })\n        .angle(function(d,i) {\treturn i*angleSlice; });\n\n      if(cfg.roundStrokes) {\n        radarLine.interpolate("cardinal-closed");\n      }\n\n      //Create a wrapper for the blobs\n      var blobWrapper = g.selectAll(".radarWrapper")\n        .data(data)\n        .enter().append("g")\n        .attr("class", "radarWrapper");\n\n      //Append the backgrounds\n      blobWrapper\n        .append("path")\n        .attr("class", "radarArea")\n        .attr("d", function(d,i) { return radarLine(d); })\n        .style("fill", function(d,i) { return cfg.color(i); })\n        .style("fill-opacity", cfg.opacityArea)\n        .on(\'mouseover\', function (d,i){\n          //Dim all blobs\n          d3.selectAll(".radarArea")\n            .transition().duration(200)\n            .style("fill-opacity", 0.1);\n          //Bring back the hovered over blob\n          d3.select(this)\n            .transition().duration(200)\n            .style("fill-opacity", 0.7);\n        })\n        .on(\'mouseout\', function(){\n          //Bring back all blobs\n          d3.selectAll(".radarArea")\n            .transition().duration(200)\n            .style("fill-opacity", cfg.opacityArea);\n        });\n\n      //Create the outlines\n      blobWrapper.append("path")\n        .attr("class", "radarStroke")\n        .attr("d", function(d,i) { return radarLine(d); })\n        .style("stroke-width", cfg.strokeWidth + "px")\n        .style("stroke", function(d,i) { return cfg.color(i); })\n        .style("fill", "none")\n        .style("filter" , "url(#glow)");\n\n      //Append the circles\n      blobWrapper.selectAll(".radarCircle")\n        .data(function(d,i) { return d; })\n        .enter().append("circle")\n        .attr("class", "radarCircle")\n        .attr("r", cfg.dotRadius)\n        .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })\n        .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })\n        .style("fill", function(d,i,j) { return cfg.color(j); })\n        .style("fill-opacity", 0.8);\n\n      /////////////////////////////////////////////////////////\n      //////// Append invisible circles for tooltip ///////////\n      /////////////////////////////////////////////////////////\n\n      //Wrapper for the invisible circles on top\n      var blobCircleWrapper = g.selectAll(".radarCircleWrapper")\n        .data(data)\n        .enter().append("g")\n        .attr("class", "radarCircleWrapper");\n\n      //Append a set of invisible circles on top for the mouseover pop-up\n      blobCircleWrapper.selectAll(".radarInvisibleCircle")\n        .data(function(d,i) { return d; })\n        .enter().append("circle")\n        .attr("class", "radarInvisibleCircle")\n        .attr("r", cfg.dotRadius*1.5)\n        .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })\n        .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })\n        .style("fill", "none")\n        .style("pointer-events", "all")\n        .on("mouseover", function(d,i) {\n          newX =  parseFloat(d3.select(this).attr(\'cx\')) - 10;\n          newY =  parseFloat(d3.select(this).attr(\'cy\')) - 10;\n\n          tooltip\n            .attr(\'x\', newX)\n            .attr(\'y\', newY)\n            .text(Format(d.value))\n            .transition().duration(200)\n            .style(\'opacity\', 1);\n        })\n        .on("mouseout", function(){\n          tooltip.transition().duration(200)\n            .style("opacity", 0);\n        });\n\n      //Set up the small tooltip for when you hover over a circle\n      var tooltip = g.append("text")\n        .attr("class", "tooltip")\n        .style("opacity", 0);\n\n      /////////////////////////////////////////////////////////\n      /////////////////// Helper Function /////////////////////\n      /////////////////////////////////////////////////////////\n\n      //Taken from http://bl.ocks.org/mbostock/7555321\n      //Wraps SVG text\n      function wrap(text, width) {\n        text.each(function() {\n        var text = d3.select(this),\n          words = text.text().split(/\\s+/).reverse(),\n          word,\n          line = [],\n          lineNumber = 0,\n          lineHeight = 1.4, // ems\n          y = text.attr("y"),\n          x = text.attr("x"),\n          dy = parseFloat(text.attr("dy")),\n          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");\n\n        while (word = words.pop()) {\n          line.push(word);\n          tspan.text(line.join(" "));\n          if (tspan.node().getComputedTextLength() > width) {\n          line.pop();\n          tspan.text(line.join(" "));\n          line = [word];\n          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);\n          }\n        }\n        });\n      }//wrap\n\n    }//RadarChart\n\n    console.log("WE HEEEEERRRRRRREEEEEEE!!!!!!");\n      /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */\n\n      //////////////////////////////////////////////////////////////\n      //////////////////////// Set-Up //////////////////////////////\n      //////////////////////////////////////////////////////////////\n      var margin = {top: 100, right: 100, bottom: 100, left: 100},\n        width = Math.min(400, window.innerWidth - 10) - margin.left - margin.right,\n        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);\n\n      //////////////////////////////////////////////////////////////\n      ////////////////////////// Data //////////////////////////////\n      //////////////////////////////////////////////////////////////\n      var data = [\n            [//iPhone\n            {axis:"Java",value:1},\n            {axis:"Brand",value:2},\n            {axis:"Contract Cost",value:3},\n            {axis:"Design And Quality",value:4},\n            {axis:"Have Internet Connectivity",value:5},\n            {axis:"Large Screen",value:4},\n            {axis:"Price Of Device",value:3},\n            {axis:"To Be A Smartphone",value:2}\n            ]\n          ];\n      //////////////////////////////////////////////////////////////\n      //////////////////// Draw the Chart //////////////////////////\n      //////////////////////////////////////////////////////////////\n      var color = d3.scale.ordinal()\n        .range(["#00A0B0","#EDC951","#CC333F"]);\n\n      var radarChartOptions = {\n        w: width,\n        h: height,\n        margin: margin,\n        maxValue: 5,\n        levels: 5,\n        roundStrokes: true,\n        color: color\n      };\n      //Call function to draw the Radar chart\n\n      RadarChart(".radarChart", data, radarChartOptions);\n  ') ];
}));                                                                                                                   // 96
                                                                                                                       // 97
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"radarChart.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/radarChart.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//import './main.html';                                                                                                // 1
function RadarChart(id, data, options) {                                                                               // 3
	var cfg = {                                                                                                           // 4
		w: 600,                                                                                                              // 5
		//Width of the circle                                                                                                // 5
		h: 600,                                                                                                              // 6
		//Height of the circle                                                                                               // 6
		margin: {                                                                                                            // 7
			top: 20,                                                                                                            // 7
			right: 20,                                                                                                          // 7
			bottom: 20,                                                                                                         // 7
			left: 20                                                                                                            // 7
		},                                                                                                                   // 7
		//The margins of the SVG                                                                                             // 7
		levels: 3,                                                                                                           // 8
		//How many levels or inner circles should there be drawn                                                             // 8
		maxValue: 0,                                                                                                         // 9
		//What is the value that the biggest circle will represent                                                           // 9
		labelFactor: 1.25,                                                                                                   // 10
		//How much farther than the radius of the outer circle should the labels be placed                                   // 10
		wrapWidth: 60,                                                                                                       // 11
		//The number of pixels after which a label needs to be given a new line                                              // 11
		opacityArea: 0.35,                                                                                                   // 12
		//The opacity of the area of the blob                                                                                // 12
		dotRadius: 4,                                                                                                        // 13
		//The size of the colored circles of each blog                                                                       // 13
		opacityCircles: 0.1,                                                                                                 // 14
		//The opacity of the circles of each blob                                                                            // 14
		strokeWidth: 2,                                                                                                      // 15
		//The width of the stroke around each blob                                                                           // 15
		roundStrokes: false,                                                                                                 // 16
		//If true the area and stroke will follow a round path (cardinal-closed)                                             // 16
		color: d3.scaleOrdinal(d3.schemeCategory10)                                                                          // 17
	}; //Put all of the options into a variable called cfg                                                                // 4
                                                                                                                       //
	if ('undefined' !== typeof options) {                                                                                 // 21
		for (var i in meteorBabelHelpers.sanitizeForInObject(options)) {                                                     // 22
			if ('undefined' !== typeof options[i]) {                                                                            // 23
				cfg[i] = options[i];                                                                                               // 23
			}                                                                                                                   // 23
		} //for i                                                                                                            // 24
                                                                                                                       //
	} //if                                                                                                                // 25
	//If the supplied maxValue is smaller than the actual one, replace by the max in the data                             // 27
                                                                                                                       //
                                                                                                                       //
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function (i) {                                                     // 28
		return d3.max(i.map(function (o) {                                                                                   // 28
			return o.value;                                                                                                     // 28
		}));                                                                                                                 // 28
	}));                                                                                                                  // 28
	var allAxis = data[0].map(function (i, j) {                                                                           // 30
		return i.axis;                                                                                                       // 30
	}),                                                                                                                   // 30
	    //Names of each axis                                                                                              // 30
	total = allAxis.length,                                                                                               // 31
	    //The number of different axes                                                                                    // 30
	radius = Math.min(cfg.w / 2, cfg.h / 2),                                                                              // 32
	    //Radius of the outermost circle                                                                                  // 30
	Format = d3.format('%'),                                                                                              // 33
	    //Percentage formatting                                                                                           // 30
	angleSlice = Math.PI * 2 / total; //The width in radians of each "slice"                                              // 34
	//Scale for the radius                                                                                                // 36
                                                                                                                       //
	var rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]); /////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////                                                             // 42
	/////////////////////////////////////////////////////////                                                             // 43
	//Remove whatever chart with the same id/class was present before                                                     // 45
                                                                                                                       //
	d3.select(id).select("svg").remove(); //Initiate the radar chart SVG                                                  // 46
                                                                                                                       //
	var svg = d3.select(id).append("svg").attr("width", cfg.w + cfg.margin.left + cfg.margin.right).attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom).attr("class", "radar" + id); //Append a g element
                                                                                                                       //
	var g = svg.append("g").attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")"); /////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////                                                             // 58
	/////////////////////////////////////////////////////////                                                             // 59
	//Filter for the outside glow                                                                                         // 61
                                                                                                                       //
	var filter = g.append('defs').append('filter').attr('id', 'glow'),                                                    // 62
	    feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),       // 62
	    feMerge = filter.append('feMerge'),                                                                               // 62
	    feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),                                          // 62
	    feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic'); /////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////                                                             // 69
	/////////////////////////////////////////////////////////                                                             // 70
	//Wrapper for the grid & axes                                                                                         // 72
                                                                                                                       //
	var axisGrid = g.append("g").attr("class", "axisWrapper"); //Draw the background circles                              // 73
                                                                                                                       //
	axisGrid.selectAll(".levels").data(d3.range(1, cfg.levels + 1).reverse()).enter().append("circle").attr("class", "gridCircle").attr("r", function (d, i) {
		return radius / cfg.levels * d;                                                                                      // 81
	}).style("fill", "#CDCDCD").style("stroke", "#CDCDCD").style("fill-opacity", cfg.opacityCircles).style("filter", "url(#glow)"); //Text indicating at what % each level is
                                                                                                                       //
	axisGrid.selectAll(".axisLabel").data(d3.range(1, cfg.levels + 1).reverse()).enter().append("text").attr("class", "axisLabel").attr("x", 4).attr("y", function (d) {
		return -d * radius / cfg.levels;                                                                                     // 93
	}).attr("dy", "0.4em").style("font-size", "10px").attr("fill", "#737373").text(function (d, i) {                      // 93
		return Format(maxValue * d / cfg.levels);                                                                            // 97
	}); /////////////////////////////////////////////////////////                                                         // 97
	//////////////////// Draw the axes //////////////////////                                                             // 100
	/////////////////////////////////////////////////////////                                                             // 101
	//Create the straight lines radiating outward from the center                                                         // 103
                                                                                                                       //
	var axis = axisGrid.selectAll(".axis").data(allAxis).enter().append("g").attr("class", "axis"); //Append the lines    // 104
                                                                                                                       //
	axis.append("line").attr("x1", 0).attr("y1", 0).attr("x2", function (d, i) {                                          // 110
		return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);                                              // 113
	}).attr("y2", function (d, i) {                                                                                       // 113
		return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);                                              // 114
	}).attr("class", "line").style("stroke", "white").style("stroke-width", "2px"); //Append the labels at each axis      // 114
                                                                                                                       //
	axis.append("text").attr("class", "legend").style("font-size", "11px").attr("text-anchor", "middle").attr("dy", "0.35em").attr("x", function (d, i) {
		return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2);                                  // 125
	}).attr("y", function (d, i) {                                                                                        // 125
		return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2);                                  // 126
	}).text(function (d) {                                                                                                // 126
		return d;                                                                                                            // 127
	}).call(wrap, cfg.wrapWidth); /////////////////////////////////////////////////////////                               // 127
	///////////// Draw the radar chart blobs ////////////////                                                             // 131
	/////////////////////////////////////////////////////////                                                             // 132
	//The radial line function                                                                                            // 134
                                                                                                                       //
	var radarLine = d3.lineRadial().curve(d3.curveBasisClosed).radius(function (d) {                                      // 135
		return rScale(d.value);                                                                                              // 136
	}).angle(function (d, i) {                                                                                            // 136
		return i * angleSlice;                                                                                               // 137
	});                                                                                                                   // 137
                                                                                                                       //
	if (cfg.roundStrokes) {                                                                                               // 139
		radarLine.curve(d3.curveCardinalClosed);                                                                             // 140
	} //Create a wrapper for the blobs                                                                                    // 141
                                                                                                                       //
                                                                                                                       //
	var blobWrapper = g.selectAll(".radarWrapper").data(data).enter().append("g").attr("class", "radarWrapper"); //Append the backgrounds
                                                                                                                       //
	blobWrapper.append("path").attr("class", "radarArea").attr("d", function (d, i) {                                     // 150
		return radarLine(d);                                                                                                 // 153
	}).style("fill", function (d, i) {                                                                                    // 153
		return cfg.color(i);                                                                                                 // 154
	}).style("fill-opacity", cfg.opacityArea).on('mouseover', function (d, i) {                                           // 154
		//Dim all blobs                                                                                                      // 157
		d3.selectAll(".radarArea").transition().duration(200).style("fill-opacity", 0.1); //Bring back the hovered over blob
                                                                                                                       //
		d3.select(this).transition().duration(200).style("fill-opacity", 0.7);                                               // 162
	}).on('mouseout', function () {                                                                                       // 165
		//Bring back all blobs                                                                                               // 167
		d3.selectAll(".radarArea").transition().duration(200).style("fill-opacity", cfg.opacityArea);                        // 168
	}); //Create the outlines                                                                                             // 171
                                                                                                                       //
	blobWrapper.append("path").attr("class", "radarStroke").attr("d", function (d, i) {                                   // 174
		return radarLine(d);                                                                                                 // 176
	}).style("stroke-width", cfg.strokeWidth + "px").style("stroke", function (d, i) {                                    // 176
		return cfg.color(i);                                                                                                 // 178
	}).style("fill", "none").style("filter", "url(#glow)"); //Append the circles                                          // 178
                                                                                                                       //
	blobWrapper.selectAll(".radarCircle").data(function (d, i) {                                                          // 183
		return d;                                                                                                            // 184
	}).enter().append("circle").attr("class", "radarCircle").attr("r", cfg.dotRadius).attr("cx", function (d, i) {        // 184
		return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);                                                     // 188
	}).attr("cy", function (d, i) {                                                                                       // 188
		return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);                                                     // 189
	}).style("fill", function (d, i, j) {                                                                                 // 189
		return cfg.color(j);                                                                                                 // 190
	}).style("fill-opacity", 0.8); /////////////////////////////////////////////////////////                              // 190
	//////// Append invisible circles for tooltip ///////////                                                             // 194
	/////////////////////////////////////////////////////////                                                             // 195
	//Wrapper for the invisible circles on top                                                                            // 197
                                                                                                                       //
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper").data(data).enter().append("g").attr("class", "radarCircleWrapper"); //Append a set of invisible circles on top for the mouseover pop-up
                                                                                                                       //
	blobCircleWrapper.selectAll(".radarInvisibleCircle").data(function (d, i) {                                           // 204
		return d;                                                                                                            // 205
	}).enter().append("circle").attr("class", "radarInvisibleCircle").attr("r", cfg.dotRadius * 1.5).attr("cx", function (d, i) {
		return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);                                                     // 209
	}).attr("cy", function (d, i) {                                                                                       // 209
		return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);                                                     // 210
	}).style("fill", "none").style("pointer-events", "all").on("mouseover", function (d, i) {                             // 210
		newX = parseFloat(d3.select(this).attr('cx')) - 10;                                                                  // 214
		newY = parseFloat(d3.select(this).attr('cy')) - 10;                                                                  // 215
		tooltip.attr('x', newX).attr('y', newY).text(Format(d.value)).transition().duration(200).style('opacity', 1);        // 217
	}).on("mouseout", function () {                                                                                       // 223
		tooltip.transition().duration(200).style("opacity", 0);                                                              // 225
	}); //Set up the small tooltip for when you hover over a circle                                                       // 227
                                                                                                                       //
	var tooltip = g.append("text").attr("class", "tooltip").style("opacity", 0); /////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////                                                             // 235
	/////////////////////////////////////////////////////////                                                             // 236
	//Taken from http://bl.ocks.org/mbostock/7555321                                                                      // 238
	//Wraps SVG text                                                                                                      // 239
                                                                                                                       //
	function wrap(text, width) {                                                                                          // 240
		text.each(function () {                                                                                              // 241
			var text = d3.select(this),                                                                                         // 242
			    words = text.text().split(/\s+/).reverse(),                                                                     // 242
			    word,                                                                                                           // 242
			    line = [],                                                                                                      // 242
			    lineNumber = 0,                                                                                                 // 242
			    lineHeight = 1.4,                                                                                               // 242
			    // ems                                                                                                          // 242
			y = text.attr("y"),                                                                                                 // 248
			    x = text.attr("x"),                                                                                             // 242
			    dy = parseFloat(text.attr("dy")),                                                                               // 242
			    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");                        // 242
                                                                                                                       //
			while (word = words.pop()) {                                                                                        // 253
				line.push(word);                                                                                                   // 254
				tspan.text(line.join(" "));                                                                                        // 255
                                                                                                                       //
				if (tspan.node().getComputedTextLength() > width) {                                                                // 256
					line.pop();                                                                                                       // 257
					tspan.text(line.join(" "));                                                                                       // 258
					line = [word];                                                                                                    // 259
					tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
				}                                                                                                                  // 261
			}                                                                                                                   // 262
		});                                                                                                                  // 263
	} //wrap                                                                                                              // 264
                                                                                                                       //
} //RadarChart                                                                                                         // 266
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Template = void 0;                                                                                                 // 1
module.watch(require("meteor/templating"), {                                                                           // 1
  Template: function (v) {                                                                                             // 1
    Template = v;                                                                                                      // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var ReactiveVar = void 0;                                                                                              // 1
module.watch(require("meteor/reactive-var"), {                                                                         // 1
  ReactiveVar: function (v) {                                                                                          // 1
    ReactiveVar = v;                                                                                                   // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
var Mongo = void 0;                                                                                                    // 1
module.watch(require("meteor/mongo"), {                                                                                // 1
  Mongo: function (v) {                                                                                                // 1
    Mongo = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 2);                                                                                                                 // 1
module.watch(require("./main.html"));                                                                                  // 1
employee_filtered_list = new ReactiveVar([]);                                                                          // 6
employee_selected = new ReactiveVar([]);                                                                               // 7
                                                                                                                       //
if (Meteor.isClient) {                                                                                                 // 12
  Employees = new Mongo.Collection('employees');                                                                       // 13
  Skills = new Mongo.Collection('skills');                                                                             // 14
  Template.resource_list.onCreated(function () {                                                                       // 16
    Meteor.subscribe('employees.skills');                                                                              // 17
  });                                                                                                                  // 18
  Template.resource_list.helpers({                                                                                     // 20
    getEmployees: function () {                                                                                        // 21
      Meteor.subscribe('employees.bySkill', employee_filtered_list.get());                                             // 22
      return Employees.find();                                                                                         // 23
    }                                                                                                                  // 24
  });                                                                                                                  // 20
  Template.resource_list.events({                                                                                      // 27
    'click .employee_row': function (event) {                                                                          // 28
      //console.log(this);                                                                                             // 29
      $('.employee_row').removeClass('employee_selected');                                                             // 30
      $(event.currentTarget).addClass('employee_selected');                                                            // 31
      employee_selected.set(this);                                                                                     // 32
    }                                                                                                                  // 33
  });                                                                                                                  // 27
  Template.resource_filter.helpers({                                                                                   // 36
    getSkills: function () {                                                                                           // 37
      return Skills.find();                                                                                            // 38
    }                                                                                                                  // 39
  }); //Event for when the employee_filter form is submitted.                                                          // 36
                                                                                                                       //
  Template.resource_filter.events({                                                                                    // 43
    'submit .employee_filter': function (event) {                                                                      // 44
      event.preventDefault();                                                                                          // 45
      var filterList = [];                                                                                             // 46
      event.target.skill_box.forEach(function (skill) {                                                                // 47
        if (skill.checked == true) {                                                                                   // 48
          filterList.push(skill.value);                                                                                // 49
        }                                                                                                              // 50
      });                                                                                                              // 51
      employee_filtered_list.set(filterList);                                                                          // 52
    }                                                                                                                  // 54
  });                                                                                                                  // 43
  Template.resource_display.helpers({                                                                                  // 57
    display_employee_details: function () {                                                                            // 58
      console.log(employee_selected.get());                                                                            // 59
                                                                                                                       //
      if (employee_filtered_list.get() == []) {                                                                        // 60
        return [];                                                                                                     // 61
      }                                                                                                                // 62
                                                                                                                       //
      return employee_selected.get();                                                                                  // 63
    }                                                                                                                  // 64
  });                                                                                                                  // 57
}                                                                                                                      // 67
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});
require("./client/template.main.js");
require("./client/radarChart.js");
require("./client/main.js");