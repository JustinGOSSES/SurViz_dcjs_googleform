# SurViz_dcjs_googleform

## "in progress"

## Goal
A project you can drop any google form response csv into and an interactive website running dc.js on the charts will be produced.

## Current Status
Charts are produced and communicate information from the initial example datasets, but the charts aren't very polished in their apperance. In addition, a wider range of chart types needs to be built. The tables probably needs to be represented as both a table and a chart with the 5-15 most common answers when the tables have a lot of repeated answers but too many unique answers to fit into another chart type.

## Why 
Most of the times when people look at survey results, the results for each question is only grouped at one level, everyone. Using DC.js it comes super easy to also see the results for each question filtered by answers by every other question. For example, if question 1 is "are you tall" and question 2 is "are you old", you can see the results for "are you old" for only those that answer "yes, I am tall". This opens up the opportunity for <b>insight into data that was always there</b>, just rarely taken advantage of due to the extra work involved. 

## Authored by 
Justin Gosses

## About
This is a series of charts representing questions of a survey. All the charts are linked. When the user clicks on one bar or slice of a pie chart, it will filter all the other charts. Currently, long-form fill-in-the-blank ansers are not linked to the rest of the charts. This could be easily changed.

## Dataset
Currently using a survey on the data visualization community found here: <a href="https://github.com/emeeks/data_visualization_survey">https://github.com/emeeks/data_visualization_survey</a>

This data visualization was created with open-source JavaScript libraries, including: <a href="https://dc-js.github.io/dc.js/">DC.js</a>, <a href="https://github.com/crossfilter/crossfilter">Crossfilter.js</a>, and <a href="https://d3js.org/">D3.js</a>. D3.js creates the charts, crossfilter creates the links between each data dimension, and DC.js tells d3.js and crossfilter.js how to play nice and takes your directions. The code is easily adaptable to any google forms results sheet, and adaptable to a range of inputs with a little more effort

## Privacy considerations
The fact that charts are linked will make it possible to filter down to the level of individuals if your dataset is not large. Additionally, the data is currently being added as a flat file with each row being a unique person who filled out the answers. If this might be an issue for you privacy-wise, you might consider limiting filtering and or changing the way the data is supplied to the charts. Server-side rending may also a possible solution.

## Example image
<i>image goes here eventually</i>

## Instructions to run
<i>*in progress*</i>

## Adding your own data
The assumption is flat csv import with checklist answers with multiple items being in strings with ';'. Alternatives data structures might request editing the data processing part of the code.

## Particulars that might not apply to your use
- This is based around google form response CSV. In checklist questions, multiple answers can be checked. Those answers are given in the form of a string with ';' that separate answers. Due to this, there is a function in this project that takes strings and turns them into arrays, with the stings split into separate elements based on the ';'.

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
- spickChart(questions) = function that picks the type of chart based on characteristics made in examineAnswers
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

















