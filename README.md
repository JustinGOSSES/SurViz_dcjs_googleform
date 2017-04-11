# SurViz_dcjs_googleform

in progress

## To Do
- Change CSS so default text color is black so that text can be seen even against white background if bar is small
- use boostrap to make responsive and look nice
- establish default sizes for each chart type
- decide how to take questions from data ingest and add as text in html
- build most html from data input such that the number of questions or types of questions / answers doesn't need to be known for the code to work. 
- play around with different table looks for sentence responses
- play around with word charts for small 1-3 word responses
- add reset button to bring selections based to normal!

## Code Organization
- functions that process the data to deal with several issues coming from google forms
	- questions have spaces in the name, which doesn't work well for key names and ids
	- certain strings need to be split into array when dealing with checklist answers
- function that takes out all the questions and puts them in a global variable
- functions that puts questions into html as headers paired with appropriate charts
- functions that identify what type of answer
	- number or string or array?
	- if string, number of characters in string?
	- if relatively short string, are there repeated entries in that dimension?
- functions that create dc.js chart types based on the type of answer
- functions that add reset button 
- function that writes "about" section at end?