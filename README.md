# SurViz_dcjs_googleform
by <a href="https://github.com/JustinGOSSES">Justin Gosses</a>

## What is it?
A project you can drop any google form response csv into and an interactive website of the survey results with cross-filtering abilities will be produced. Cross-filtering is the ability to select answer B to question 1 and see what that particular subset of people answered in question 2.

## Status
90% of the original vision is complete. I haven't worked on it recently but everything works fine. The charts are successfully picked and produced automatically. Could use a little CSS love to improve look and maybe some JavaScript optimization if you want it to run fast on large surveys with > 2000 responses. Issues section should have additional enhancements needed. 

## Example image
<i>image goes here eventually</i>

## Website 
You can check it out live <a href="https://justingosses.github.io/SurViz_dcjs_googleform/">here</a>.

## Instructions to run
1. Fork this repo
2. Add your google forms response CSV to the data form in your forked repo.
3. Either change the name of your CSV to match "cleaned_survey_results.csv" or go into index.html then search & replace that name with the name of your CSV that you've placed in the data directory. 

Everything should-auto populate with the javascript picking what chart to use for each question based on number of answers, length of answer, etc.

## Privacy considerations
The fact that charts are linked will make it possible to filter down to the level of individuals if your dataset is not large. Additionally, the data is currently being added as a flat file with each row being a unique person who filled out the answers. If this might be an issue for you privacy-wise, you might consider limiting filtering and or changing the way the data is supplied to the charts.

## Why 
Most of the times when people look at survey results, the results for each question is only grouped at one level, everyone. Using DC.js it becomes super easy to also see the results for each question filtered by answers by every other question. For example, if question 1 is "are you tall" and question 2 is "are you old", you can see the results for "are you old" for only those that answer "yes, I am tall". This opens up the opportunity for <b>insight into data that was always there</b>, just rarely taken advantage of due to the extra work involved. 

In other words, all the charts are linked. When the user clicks on one bar or slice of a pie chart, it will filter all the other charts. 

Currently, long-form fill-in-the-blank answers are not linked to the rest of the charts. This could be easily changed.

## Demo Dataset
Currently using a survey on the data visualization community found here: <a href="https://github.com/emeeks/data_visualization_survey">https://github.com/emeeks/data_visualization_survey</a>

## Adding your own data
<i>*in progress*</i> 
Eventually, there will be an upload option, so users can upload their csv of google forms responses into the webpage without having to fork/edit code.

## Survey data format assumptions
- <b>This project assumes the input datasets is a google form response CSV.</b> 
- These have a set data structure. For example, in checklist questions, multiple answers can be checked. Checklist answers are given in the form of a string with ';' that separate answers. There is a function in this project that takes strings and turns them into arrays, with the stings split into separate elements based on the ';'. Alternatives data structures not identical to google form response CSVs may require editing the data processing part of the code.

## Main open source libraries used
This data visualization was created with open-source JavaScript libraries, including: <a href="https://dc-js.github.io/dc.js/">DC.js</a>, <a href="https://github.com/crossfilter/crossfilter">Crossfilter.js</a>, and <a href="https://d3js.org/">D3.js</a>. D3.js creates the charts, crossfilter creates the links between each data dimension, and DC.js tells d3.js and crossfilter.js how to play nice and takes your directions. The code is easily adaptable to any google forms results sheet, and adaptable to a range of inputs with a little more effort

## Functions

#### index.html
- d3.csv = loads data
- function uniq(a) = helper, makes arrays unique
- splitBasedSmCol(data) = helper, splits strings into arrays based on ;
- takeOutSpacesinKeys(data) = helper, replaces " " with "_"
- putInSpacesinKeys(data) = helper, replaces "_" with " "
- examineAnswers(data) = function that runs the function identify_questions() and then uponDataLoad()

#### questions.js
- identify_questions(data) = group of functions, looks at answers & questions and populats charactersitics about them.....

#### index.html
- uponDataLoad(data,questions) = group of functions, functions that runs after data loads  & examineAnswer function runs

#### pickChart.js
- pickChart(questions) = function that picks the type of chart based on characteristics made in examineAnswers
- makePie(cf,ID,height,width,questionWith_)
- makeRow(cf,ID,height,width,questionWith_)
- makeLinearBar_Number(data,cf,ID,height,width,questionWith_,uniqItemsCount)
- * makeLinearBar_Date(cf,ID,height,width,questionWith_)
- * makeLinearBar_Time(cf,ID,height,width,questionWith_)
- makeSingleTable(data, cf, id,questionWith_)
- returnChart(chartType)
- getChartSize(chartType)
- getScaleForLinear(chartType)
- groupQuestIntoRows(questionsResult)
- buildRow(data,row,cf,ID,questionNumber,questionsResult)

















