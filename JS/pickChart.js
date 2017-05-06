console.log("got into pickChart.js")

//// Function for decided what chart to use based on details found in question.js function(s) ////
function pickChart(questions){
	console.log("got into pickChart function")
	for (eachAnswerAr in questions){
		console.log("pickChart questions[eachAnswerAr]",questions[eachAnswerAr])
		questions[eachAnswerAr]["chartType"] = ""
	//// =< 3 uniq answers && each answer =< 40 characters = Pie Chart
		if (questions[eachAnswerAr]["uniqItemsCount"] < 3.1 && questions[eachAnswerAr]["IndAnsMaxLength"] < 40.1){
			questions[eachAnswerAr]["chartType"] = "piechart"
		}
	//// =< 3 answers && each answer > 40 characters OR > 3 uniq answers && < 25 uniq answers && < 70 max characters = Row Chart
		else if (questions[eachAnswerAr].uniqItemsCount < 3.1 && questions[eachAnswerAr].IndAnsMaxLength > 40.1 || questions[eachAnswerAr].uniqItemsCount > 3.1 && questions[eachAnswerAr].IndAnsMaxLength < 70.1 ){
			questions[eachAnswerAr]["chartType"] = "rowchart"
		}
	//// Max characters > 70 OR >25 uniq answer = Table 
		else if (questions[eachAnswerAr].IndAnsMaxLength > 70.1 || questions[eachAnswerAr].uniqItemsCount > 25){
			questions[eachAnswerAr]["chartType"] = "table"
		}
	//// Not strings, Not date, Not time, but numbers = Linear Bar Chart
		else if (questions[eachAnswerAr].type === "number"){
			questions[eachAnswerAr]["chartType"] = "linearbarNumb"
		}
	//// Date = date bar chart (very similar to linear bar chart)
		else if (questions[eachAnswerAr].type === "date"){
			questions[eachAnswerAr]["chartType"] = "linearbarDate"
		}
	//// Time = Linear bar chart (same as date and number but different scale used)
		else if (questions[eachAnswerAr].type === "time"){
			questions[eachAnswerAr]["chartType"] = "linearbarTime"
		}
	}
	return questions
}


///////////// the following functions will make various charts based on input arguments ////////

////// pie chart ///////

//// args for pie chart:
//// cd = var cf = crossfilter(data);
//// ID = DOM id of DIV this pie chart is going in
//// height
//// width
//// question on which the chart is being made, this assumes spaces are replaced with _ already
function makePie(cf,ID,height,width,questionWith_){
	var Dim = cf.dimension(function(d){ return d[questionWith_];});
	var dimGroup = centerDim.group();
	var PieChart = dc.pieChart(ID)
			.height(height)
            .width(width)
            .dimension(Dim)
            .group(dimGroup);
}

////// row chart ///////
function makeRow(cf,ID,height,width,questionWith_){
	var Dim = cf.dimension(function(d){ return d[questionWith_];});
	var dimGroup = centerDim.group();
	var rowChart = dc.rowChart(ID)
			.renderLabel(true)
			.height(height)
            .width(width)
            .dimension(Dim)
            .group(dimGroup)
            .xAxis()
            .ticks(3)
}

////// linear bar chart number, date, or time ///////
function makeLinearBar(cf,ID,height,width,questionWith_,scale){

	var d3scale = d3.scale.linear()
	///// need to investigate this more !!!!! //////// 

	if(scale === "number"){
		d3scale = d3.scale.linear().domain([20, 70])
	}
	else if (scale === "date" || scale === "time"){
		 d3scale = d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)])
	}
	// else if (){
	// }
	else{console.log("didn't do any of the ifs in function makeLinearBar()")}


	var Dim = cf.dimension(function(d){ return d[questionWith_];});
	var dimGroup = centerDim.group();
	var barChart = dc.barChart(ID)
			//.renderLabel(true)
			.height(height)
            .width(width)
            .dimension(Dim)
            .group(dimGroup)
            .elasticY(true)
            ///// might need to get fancier with domain!!!!!!
            //.x(d3.scale.linear().domain([20, 70]))
            .x(d3scale)
        	.xUnits(dc.units.fp.precision(1));
}

////// table ///////
//// a function that fills out the rows of a table based on table_id which includes # and a single dimension, which should be a key as a string with underscores filled in
        function makeSingleTable(data,table_id,questionWith_){
        	var Dim = cf.dimension(function(d){ return d[questionWith_]});
        	var dimGroup = Dim.group()
            for (each in data){
                //console.log("each = ",each," and data[each] = ",data[each], " and table_dim is ",table_dim)
                //console.log("data[each][table_dim]", data[each][table_dim])
                $(table_id+" tbody").append("<tr><td>"+data[each][dim]+"</td></tr>");
            }
            $(table_id).DataTable({ 
                "ordering": false,
                // "search":false,
                "bLengthChange": false,
                "bPaginate": true,
                "bFilter": false,
                "bInfo": false,
                "bAutoWidth": false
            });
        }


///// function that reads the chart type and order of chart type and picks bootstrap configuration



///// function that creates html row for each row of charts based on ideal bootstrap config from function above



///// function that creates html for each chart based












