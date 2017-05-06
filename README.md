# SurViz_dcjs_googleform

## "in progress"

## Goal
A project you can drop any google form response csv into and an interactive website running dc.js on the charts will be produced.

## About
This is a series of charts representing questions of a survey. All the charts are linked. When the user clicks on one bar or slice of a pie chart, it will filter all the other charts. Currently, long-form fill-in-the-blank ansers are not linked to the rest of the charts. This could be easily changed.

This data visualization was created with open-source JavaScript libraries, including: <a href="https://dc-js.github.io/dc.js/">DC.js</a>, <a href="https://github.com/crossfilter/crossfilter">Crossfilter.js</a>, and <a href="https://d3js.org/">D3.js</a>. D3.js creates the charts, crossfilter creates the links between each data dimension, and DC.js tells d3.js and crossfilter.js how to play nice and takes your directions. The code is easily adaptable to any google forms results sheet, and adaptable to a range of inputs with a little more effort

## Authored by 
Justin Gosses

## Instructions to run

## Adding your own data
The assumption is flat csv import with checklist answers with multiple items being in strings with ';'. Alternatives data structures might request editing the data processing part of the code.

## Particulars that might not apply to your use
- This is based around google form response CSV. In checklist questions, multiple answers can be checked. Those answers are given in the form of a string with ';' that separate answers. Due to this, there is a function in this project that takes strings and turns them into arrays, with the stings split into separate elements based on the ';'.

## Code organization
- Functions that ingest data = d3.csv() function
- Functions that process the data to deal with several issues coming from google forms
    - questions have spaces in the name, which doesn't work well for key names and ids, have spaces " " replaced with "_" underscores. = takeOutSpacesinKeys(data)
    - certain strings need to be split into array when dealing with checklist answers ";" = splitBasedSmCol() function
- Functions that puts questions into html as headers paired with appropriate dc.js chart. This is all within the uponDataLoad(data) function. Currently, only row charts (horizontal bar charts), pie charts, and tables are used. The functions for creating the dc.js charts could be significantly optimised to DRY. The current project was quickly thrown together before a meeting. Tables are created with jquery dataTables library. They are not linked to the other charts on purpose. That is an option.

## Privacy considerations
The fact that charts are linked will make it possible to filter down to the level of individuals if your dataset is not large. Additionally, the data is currently being added as a flat file with each row being a unique person who filled out the answers. If this might be an issue for you privacy-wise, you might consider limiting filtering and or changing the way the data is supplied to the charts. Server-side rending may also a possible solution.

## Example image
image goes here eventually.

## Future work

Create a method for categorizing the answers for each question. 

### 

1. For each question, create a structure of ["question 1":["key":"value","key":"value"] with keys as.... this is done after answer strings are turned into array if ; is present. These things are populated in loops with number or string being first thing to check. 
2. Key = "highest number of answers in that answer". (highest wins, "integer")
3. Key = "total number of unique answers across all answers" (populate unique [array])
4. Key = "string or number", if both, count as strings ("string" that says string or number)
5. Key = "if single string, total number of characters in string, if array of strings, character total in longest string within array" (0 or highest string length, "integer")
6. Key = "length in characters of string in each question" ("integer")
7. 


## Functions

index.html
- d3.csv = loads data
- function uniq(a)
- splitBasedSmCol(data)
- takeOutSpacesinKeys(data)
- putInSpacesinKeys(data)
- examineAnswers(data)
- uponDataLoad(data,questions)
- pickChart(questions)
questions.js
- identify_questions(data)
pickChart.js
- makePie(cf,ID,height,width,questionWith_)
- makeRow(cf,ID,height,width,questionWith_)
- makeLinearBar(cf,ID,height,width,questionWith_,scale)
- makeSingleTable(data,table_id,questionWith_)
















