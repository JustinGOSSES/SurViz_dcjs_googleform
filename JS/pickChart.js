console.log("got into pickChart.js")

//// Function for decided what chart to use based on details found in question.js function(s) ////
function pickChart(questions){
	//console.log("got into pickChart function")
	for (eachAnswerAr in questions){
		//console.log("pickChart questions[eachAnswerAr]",questions[eachAnswerAr])
		questions[eachAnswerAr]["chartType"] = ""
	//// =< 3 uniq answers && each answer =< 40 characters = Pie Chart
		if (questions[eachAnswerAr]["uniqItemsCount"] < 3.1 && questions[eachAnswerAr]["IndAnsMaxLength"] < 40.1 && questions[eachAnswerAr].type === "string"){
			questions[eachAnswerAr]["chartType"] = "piechart"
		}
		else if (questions[eachAnswerAr].uniqItemsCount > 65){
			questions[eachAnswerAr]["chartType"] = "table"
		}
		//// Not strings, Not date, Not time, but numbers = Linear Bar Chart
		else if (questions[eachAnswerAr].type === "number"){
			questions[eachAnswerAr]["chartType"] = "linearbarNumb"
		}
	//// =< 3 answers && each answer > 40 characters OR > 3 uniq answers && < 25 uniq answers && < 70 max characters = Row Chart
		else if (questions[eachAnswerAr].uniqItemsCount < 3.1 && questions[eachAnswerAr].IndAnsMaxLength > 40.1 || questions[eachAnswerAr].uniqItemsCount > 3.1 && questions[eachAnswerAr].IndAnsMaxLength < 100.1 ){
			questions[eachAnswerAr]["chartType"] = "rowchart"
		}
		
		// else if(questions[eachAnswerAr].length > 1 && questions[eachAnswerAr].uniqItemsCount < 40){
		// 	questions[eachAnswerAr]["chartType"] = "rowchart"
		// }
	//// Max characters > 70 OR >25 uniq answer = Table 
		else if (questions[eachAnswerAr].IndAnsMaxLength > 65.1 || questions[eachAnswerAr].uniqItemsCount > 25){
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
function makePie(cf,ID,height,width,questionWith_){
	//console.log("ID for question "+questionWith_+" is ",ID)
	var Dim = cf.dimension(function(d){ return d[questionWith_];},true);
	//console.log("DIM for question "+questionWith_+" is ",Dim)
	var dimGroup = Dim.group();
	var PieChart = dc.pieChart("#"+ID)
			.height(height)
            .width(width)
            .dimension(Dim)
            .group(dimGroup);
}

////// row chart ///////
function makeRow(cf,ID,height,width,questionWith_){
	//console.log("ID for question "+questionWith_+" is ",ID)
	var Dim = cf.dimension(function(d){ return d[questionWith_];},true);
	var dimGroup = Dim.group();
	var rowChart = dc.rowChart("#"+ID)
			.renderLabel(true)
			.height(height)
            .width(width)
            .dimension(Dim)
            .group(dimGroup)
            .xAxis()
            .ticks(3)
}

////// linear bar chart number, date, or time ///////
function makeLinearBar_Number(data,cf,ID,height,width,questionWith_,uniqItemsCount){
	//console.log("ID for question "+questionWith_+" is ",ID)
	var d3scale = d3.scale.linear()
	///// need to investigate this more !!!!! //////// 
	var min = d3.min(data, function(d) { return d[questionWith_];})
	var max = d3.max(data, function(d) { return d[questionWith_];})
	var prec = 1
	if (max - min > 10){
		prec = (max - min) / uniqItemsCount
 	}
 	// else if()}{}
	d3scale = d3.scale.linear().domain([min,max])
	//d3scale = d3.scale.linear().domain([0, 100])
	var Dim = cf.dimension(function(d){ return d[questionWith_];});
	var dimGroup = Dim.group();
	var barChart = dc.barChart("#"+ID)
			//.renderLabel(true)
			.height(height)
            .width(width)
            .dimension(Dim)
            .group(dimGroup)
            .elasticY(true)
            ///// might need to get fancier with domain!!!!!!
            //.x(d3.scale.linear().domain([20, 70]))
            .x(d3scale)
        	.xUnits(dc.units.fp.precision(prec));
}

////// linear bar chart number, date, or time ///////
function makeLinearBar_Date(cf,ID,height,width,questionWith_){
	//console.log("ID for question "+questionWith_+" is ",ID)
	var d3scale = d3.scale.linear()
	///// need to investigate this more !!!!! //////// 
	d3scale = d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)])
	var Dim = cf.dimension(function(d){ return d[questionWith_];});
	var dimGroup = Dim.group();
	var barChart = dc.barChart("#"+ID)
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

////// linear bar chart number, date, or time ///////
function makeLinearBar_Time(cf,ID,height,width,questionWith_){
	//console.log("ID for question "+questionWith_+" is ",ID)
	var d3scale = d3.scale.linear()
	///// need to investigate this more !!!!! //////// 
	d3scale = d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)])
	var Dim = cf.dimension(function(d){ return d[questionWith_];});
	var dimGroup = Dim.group();
	var barChart = dc.barChart("#"+ID)
			//.renderLabel(true)
			.height(height)
            .width(width)
            .dimension(Dim)
            .group(dimGroup)
            .elasticY(true)
            ///// might need to get fancier with domain!!!!!!
            //.x(d3.scale.linear().domain([20, 70]))
            .x(d3scale)
            //.xUnits(function(){return 10;});
        	.xUnits(dc.units.fp.precision(1));
}

////// table ///////
//// a function that fills out the rows of a table based on table_id which includes # and a single dimension, which should be a key as a string with underscores filled in
function makeSingleTable(data, cf, id,questionWith_){
	//console.log("ID for question table_id",table_id)
	$("div#"+id).append("<table id='table_"+id+"' class='display' cellspacing='0' width='100%'><thead><th></th></thead><tbody></tbody></table>")
	//var Dim = cf.dimension(function(d){ return d[questionWith_]});
	//var dimGroup = Dim.group()
    for (each in data){
        //console.log("each = ",each," and data[each] = ",data[each], " and table_dim is ",table_dim)
        //console.log("data[each][table_dim]", data[each][table_dim])
        $("table#table_"+id+" tbody").append("<tr><td>"+data[each][questionWith_]+"</td></tr>");
    }
    var table = $("table#table_"+id).DataTable({ 
        //"ordering": true,
        //"bOrder": [[ 1, "desc" ]],
        "aaSorting": [[1, 'desc']],
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        //"search":true,
        "bLengthChange": false,
        "bPaginate": true,
        "bFilter": false,
        "bInfo": false,
        "bAutoWidth": false
    });
    // table.order([ 1, 'asc' ]).draw()
}

///////////////////////////// end functions that make different charts ///////////////////////

//// function that picks which chart function to use based on chart type in question json used as argument
function returnChart(chartType){
	var func 
	switch (chartType){
		case "pieChart":
			func = makePie()
			break;
		case "rowChart":
			func = makeRow()
			break;
		case "linearbarNumb":
			func = makeLinearBar_Number()
			break;
		case "linearbarDate":
			func = makeLinearBar_Date()
			break;
		case "linearbarTime":
			func = makeLinearBar_Time()
			break;
	}
	return func
}


function getChartSize(chartType){
	var size_ = {"height":250,"width":250}
	if(chartType === "pieChart"){size_ =  {"height":250,"width":250}}
	else if(chartType === "rowChart"){size_ =  {"height":450,"width":250}}
	else if(chartType === "linearbarTime"){size_ =  {"height":350,"width":400}}
	else if(chartType === "linearbarDate"){size_ =   {"height":350,"width":400}}
	else if(chartType === "linearbarNumber"){size_ =   {"height":350,"width":400}}
	else{size_ =   {"height":450,"width":400}}
	return size_
}

function getScaleForLinear(chartType){
	var scale = chartType.slice(8)
	//console.log("pickChart.js getScaleForLinear scale = ",scale)
	return scale 
}

////////////////////////////////////// end chart helpers   ///////////////////////////////////////////////////


///// function that reads the chart type and order of chart type and picks bootstrap configuration
function groupQuestIntoRows(questionsResult){
	var qWithChart = questionsResult

	
	//// goes throught each question/row and adds key:value pair for bootstrap width
	//// keeps track of bootstrap width left. Tries minusing 4 for pie or row chart or 12 for table and 6 for bar
	//// if would be negative... starts new line
	//////// loop through data structure of questions
	//////// var holder gets returned [] if build row is run 
	var startAssumpChartSize = {
		"piechart":4,
		"rowchart":4,
		"linearbarNumb":6,
		"linearbarDate":6,
		"linearbarTime":6,
		"table":12
	}
	//// function to get key name for an item in an array based on number of the row
	var keysOfQuestions = Object.keys(qWithChart)
	//// variable bootWidth = for space left in row, starts with 12
	var bootWidth = 12
	var holder = []
	var row = 0
	var row_holder = []
	for (eachQ in qWithChart){
		//console.log("pickChart.js qWithChart[eachQ] = ",qWithChart[eachQ]);
		//console.log("pickChart.js keysOfQuestions = ",keysOfQuestions);
		//console.log("pickChart.js eachQ = ",eachQ);
		//console.log("pickChart.js keysOfQuestions[1] = ",keysOfQuestions[1]);
		//console.log("pickChart.js qWithChart[eachQ]['chartType'] = ",qWithChart[eachQ]["chartType"]);
		//console.log("pickChart.js startAssumpChartSize[qWithChart[eachQ]['chartType']] = ",startAssumpChartSize[qWithChart[eachQ]["chartType"]]);
		//// 
		if((bootWidth - startAssumpChartSize[qWithChart[eachQ]["chartType"]]) > -0.1){
			bootWidth = bootWidth - startAssumpChartSize[qWithChart[eachQ]["chartType"]]
			holder.push(eachQ)
			//console.log("pickChart.js groupQuestIntoRows() eachQ = ",eachQ)
			//console.log("pickChart.js groupQuestIntoRows() holder = ",holder)
		}
		else {
			row_holder.push(holder)
			row = row + 1
			holder = []
			bootWidth = 12
			if((bootWidth - startAssumpChartSize[qWithChart[eachQ]["chartType"]]) > -0.1){
				bootWidth = bootWidth - startAssumpChartSize[qWithChart[eachQ]["chartType"]]
				holder.push(eachQ)
			}
		}
	}
	//// This should return an array of arrays. Each array group consists of 1-3 strings that
	//// represents each of the questions that is also a key in the questions array.
	//// example = [["question1","question2","question3"],["question4"],["question5","question6"],["ques7"]] 
	//// if there are three questions in an array, than the bootstrap width will be 4. If two, then 6, if one then 12. 
	//console.log("pickChart.js function groupQuestIntoRows : row_holder",row_holder)
	return row_holder 
}


//// builds a bootstrap row for divs to go inside
function buildRow(data,row,cf,ID,questionNumber,questionsResult){
	var rowStartsWithChart = questionNumber
	//// html for row as variable
	var rowHTML = "<div id='firstChartIs_"+rowStartsWithChart+"' class='row'></div>"
	////// append rowHTML
	$("div#"+ID).append(rowHTML)
	//// this block calculates the number of questions/items in each row array and then returns the bootstrap width of the charts
	//// for example, two items means each chart item should be 6 bootstraps width elements
	var width_chartHolder = 4
	switch(row.length){
		case 3:
			width_chartHolder = 4
			break;
		case 2:
			width_chartHolder = 6
			break;
		case 1:
			width_chartHolder = 12
			break;
	}
	//console.log("pickChart row = ",row)
	//// for each question in row 
	for (question in row){
		var questionWith_ = row[question]
		var questionNumber = questionNumber + 1
		//console.log("pickChart question in row, question = ",row[question])
		var chartType = questionsResult[row[question]]["chartType"]
		var sizeArray = getChartSize(chartType)
		/// scale is needed for when linearBar Charts are built. The domain can either be number, data, or time
		var scale = "not_needed"
		if(chartType === "linearbarDate" || chartType === "linearbarTime" || chartType === "linearbarNumber"){
			scale = getScaleForLinear(chartType)
		}
		var questionNoDash = putInSpacesinString(row[question])
		//// returns an empty function based on chart type
		////// might take away ...  //////  var chartFunction = returnChart(chartType)
		//console.log("pickChart.js row[question]",row[question])
		//// makes html elements for div that contains chart and is inside of row html but doesn't yet contain charts
		var pQues = "question"
		if(chartType !== "table"){
			pQues = "question"
		}
		else{pQues = "questionTable"}

		var div_around_chart =  "<div class='col-sm-"+width_chartHolder+" middle'><div><p class='"+pQues+"'>"+questionNoDash+"</p><div id='"+"Question_"+questionNumber+"'></div></div></div>"
		//// append div_around_chart
		$("div#"+"firstChartIs_"+rowStartsWithChart).append(div_around_chart)
		//// this makes chart and returns it as variables
		//// append chart html to div_around_chart html
		var madeChart = "<p>something didn't work, my bad</p>"
		var uniqItemsCount = questionsResult[row[question]]["uniqItemsCount"]
		if(chartType === "piechart"){
			//console.log("pichChart.js got into charts function pieChart")
			madeChart = makePie(cf,"Question_"+questionNumber,sizeArray.height,sizeArray.width,questionWith_)
		}
		else if(chartType === "rowchart"){
			//console.log("pichChart.js got into charts function rowchart")
			madeChart = makeRow(cf,"Question_"+questionNumber,sizeArray.height,sizeArray.width,questionWith_)
		}
		else if(chartType === "linearbarNumb"){
			//console.log("pichChart.js got into charts function linearbarNumb")
			madeChart = makeLinearBar_Number(data, cf,"Question_"+questionNumber,sizeArray.height,sizeArray.width,questionWith_,uniqItemsCount)
		}
		else if(chartType === "linearbarDate"){
			//console.log("pichChart.js got into charts function linearbarDate")
			madeChart = makeLinearBar_Date(cf,"Question_"+questionNumber,sizeArray.height,sizeArray.width,questionWith_)
		}
		else if(chartType === "linearbarTime"){
			//console.log("pichChart.js got into charts function linearbarTime")
			madeChart = makeLinearBar_Time(cf,"Question_"+questionNumber,sizeArray.height,sizeArray.width,questionWith_)
		}
		else if(chartType === "table"){
			//// !!! might need to be data instead of cf, check original version if doesn't run right !!!
			//console.log("pichChart.js got into charts function table")
			madeChart = makeSingleTable(data, cf,"Question_"+questionNumber,questionWith_)
		}
		else{console.log("pickChart.js buildRow, hey!, no match of chart type !!!!!")}
	}
}


// <div class="row">
// </div>

      // <div class="col-sm-4 middle">
      //     <div>
      //         <p class="question">Is there an area you'd like to learn about, do more with in the future, or improve you/your team's skills in? [select all that apply]</p>
      //     </div>
      //     <div id="learn-bars"></div>
      // </div>



//// builds a div that holds a chart. 1-3 divs with charts go into each bootstrap row
function builtDiv(){}



///// function that creates html row for each row of charts based on ideal bootstrap config from function above



///// function that creates html for each chart based












