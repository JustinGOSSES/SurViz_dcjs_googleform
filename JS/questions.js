// Create a method for categorizing the answers for each question. 

// ### 

// 1. For each question, create a structure of ["question 1":["key":"value","key":"value"] with keys as.... this is done after answer strings are turned into array if ; is present. These things are populated in loops with number or string being first thing to check. 
// 2. Key = "string or number", if both, count as strings ("string" that says string or number)
///////  "NumOr":"number" or "Num":"string"
// 3. Key = "highest number of answers in that answer". (highest wins, "integer")
// 4. Key = "total number of unique answers across all answers" (populate unique [array])
// 5. Key = "string or number", if both, count as strings ("string" that says string or number)
// 6. Key = "if single string, total number of characters in string, if array of strings, character total in longest string within array" (0 or highest string length, "integer")
// 7. Key = "length in characters of string in each question" ("integer")
// 8. 

// var questions = [
// 	 "quest_1":["numOr":"number","countA":0,"uniqA":0,"length_A":0,"length_Q"],
// 	 "quest_2":["numOr":"number","countA":0,"uniqA":0,"length_A":0,"length_Q"],
// 	 "quest_3":["numOr":"number","countA":0,"uniqA":0,"length_A":0,"length_Q"], 
// 	 "quest_4":["numOr":"number","countA":0,"uniqA":0,"length_A":0,"length_Q"], 
// 	 "quest_5":["numOr":"number","countA":0,"uniqA":0,"length_A":0,"length_Q"]
// 	 ]


function identify_questions(data){
	//console.log("questions test data",data)
	var questions = {}
	var rowN = 0;

	for (row in data){
		//console.log("questions.js row is",row)
		//console.log("questions.js typeof(data[row] is",typeof(data[row]))
		var key_array = Object.keys(data[row])
		//console.log("questions.js key_array is ",key_array)

		for (eachQ in key_array){
			//// AnswerInt is a single question, as string
			var AnswerInt = key_array[eachQ]
			//console.log("questions.js check AnswerInt is ",AnswerInt)
			//console.log("questions.js check eachQ is ",eachQ)

			//// START: establish each question as a key
			if(!questions[AnswerInt]){
				//console.log("questions.eachQ did not exist",questions[AnswerInt])
				questions[AnswerInt] = []
				//console.log("questions.js check 2 questions.eachQ did not exist",questions[AnswerInt])
			}
			else{				
				console.log("questions.js check 2 hit else questions.eachQ did not exist",questions[AnswerInt])
			}
			//// END: establish each question as a key
			
			//// START: Determine length of question in characters of the string
			questions[AnswerInt]["lengthQ"] = AnswerInt.length
			//// END: Determine length of question in characters of the string

			//// START: determine length of array of answers for each question
			//// data[row][AnswerInt] = array of the answer(s)
			if(!questions[AnswerInt].countA){
				questions[AnswerInt].countA = data[row][AnswerInt].length
			}
			else{
				if(data[row][AnswerInt].length > questions[AnswerInt].countA){
					questions[AnswerInt].countA = data[row][AnswerInt].length
				}
			}

			//console.log("questions.js length of answer array ",questions[AnswerInt].countA)
			//// END: determine length of array of answers for each question
			
			//// START: determine if there are any strings in answers, if so, consider all string
			//// calls it number as base case
			if(!questions[AnswerInt].numOr){questions[AnswerInt].numOr = "number"}
			
			if(questions[AnswerInt].numOr !== "string"){
				for (eachAnswer in data[row][AnswerInt]){
						
						console.log("question.js xx check typeof(data[row][AnswerInt][eachAnswer])",typeof(data[row][AnswerInt][eachAnswer]))
						console.log("question.js xx check data[row][AnswerInt][eachAnswer]",data[row][AnswerInt][eachAnswer])
						console.log("question.js xx check data[row][AnswerInt][eachAnswer][0]",data[row][AnswerInt][eachAnswer][0])
						console.log("question.js xx check isNaN(data[row][AnswerInt][eachAnswer])",isNaN(data[row][AnswerInt][eachAnswer]))
						if(data[row][AnswerInt][eachAnswer] === ""){
							console.log("question.js xx check data[row][AnswerInt][eachAnswer][0] === ''",data[row][AnswerInt][eachAnswer][0])
						}
					// else{
						
						//// switches to string if a string && NAN & !== ""
						else if (isNaN(data[row][AnswerInt][eachAnswer])===true){
							//questions[AnswerInt].numOr = "number"
							questions[AnswerInt].numOr = "string"
							console.log("question.js xx x check isNaN(data[row][AnswerInt][eachAnswer])",isNaN(data[row][AnswerInt][eachAnswer]))
							console.log("question.js xx x check sdata[row][AnswerInt][eachAnswer]",data[row][AnswerInt])
							console.log("question.js xx x check sdata[row][AnswerInt][eachAnswer]",data[row][AnswerInt][eachAnswer])
							console.log("question.js xx x check sdata[row][AnswerInt][eachAnswer][0]",data[row][AnswerInt][eachAnswer][0])
						}
						else{
							questions[AnswerInt].numOr = "number"
							//questions[AnswerInt].numOr = "string"
							console.log("question.js xx x check isNaN(data[row][AnswerInt][eachAnswer])",isNaN(data[row][AnswerInt][eachAnswer]))
							console.log("question.js xx x check data[row][AnswerInt][eachAnswer][0]",data[row][AnswerInt][eachAnswer][0])

						}	
					// }
					
				}
			}
			


				// if(questions[AnswerInt].numOr !== "string"){
				// 	//console.log("questions.js isNaN(data[row][AnswerInt][eachAnswer][0])",isNaN(data[row][AnswerInt][eachAnswer][0]))
				// 	if(typeof(data[row][AnswerInt][eachAnswer]) === "string"){
				// 		//console.log("questions.js data[row][AnswerInt][eachAnswer][0]",data[row][AnswerInt][eachAnswer][0])
				// 		if(isNaN(data[row][AnswerInt][eachAnswer][0])){
				// 			console.log("questions.js xx got into isNAN true")

				// 			console.log("questions.js xx typeof(data[row][AnswerInt][eachAnswer][0]",typeof(data[row][AnswerInt][eachAnswer][0]))
				// 			questions[AnswerInt].numOr = "string"
				// 			console.log("questions.js xx questions[AnswerInt].numOr",questions[AnswerInt].numOr)
				// 		}
				// 		else{
				// 			console.log("questions.js xx got into isNAN false")
				// 			console.log("questions.js xx typeof(data[row][AnswerInt][eachAnswer][0]",typeof(data[row][AnswerInt][eachAnswer][0]))
				// 				questions[AnswerInt].numOr = "number"
				// 				//questions[AnswerInt].numOr = typeof(data[row][AnswerInt][eachAnswer][0])
				// 			// }
				// 		}
				// 	}
				// 	else if(typeof(data[row][AnswerInt][eachAnswer]) === "number"){
				// 		questions[AnswerInt].numOr = "number"
				// 	}
				// 	else{console.log("problem in questions.js function identify_questions answer isn't number of string!")}
				// }
			//}
			//// END: determine if there are only any strings in answers, if so, consider all string

			//// START: if number, determine if answer is date vs. integer vs. time
				//// call string and ignore if string
				//// assuming if time or date, only one item in array?
			if(questions[AnswerInt].numOr !== "number"){
				questions[AnswerInt]["type"] = "string"
			}
				//// check for : in 1 or 2 position for time. Check for / in 4 position if date
			else if(data[row][AnswerInt][0][4] === "/" || data[row][AnswerInt][0][1] === "/" || data[row][AnswerInt][0][2] === "/"){
				questions[AnswerInt]["type"] = "date"
			}
			else if(data[row][AnswerInt][0][1] === ":" || data[row][AnswerInt][0][2] === ":"){
				questions[AnswerInt]["type"] = "time"
			}
				//// if not time or date or string, consider as basic number
			else{
				questions[AnswerInt]["type"] = "number"
				//console.log("questions.js check time,date,number hit number? = ",data[row][AnswerInt][0])
				//console.log("questions.js check time,date,number hit number = ",data[row][AnswerInt][0][4])
			}
			//// END: if number, determine if answer is date vs. integer/decimal vs. time
			
			//// START: length of longest answer in characters
			//// creates it, if it doesn't exist
			if (!questions[AnswerInt]["IndAnsMaxLength"]){
				questions[AnswerInt]["IndAnsMaxLength"] = 0
			}
			//// goes through each answer in each answer array and replaces the max length integer if it is larger
			for (eachAnswer in data[row][AnswerInt]){
				if(data[row][AnswerInt][eachAnswer].length > questions[AnswerInt]["IndAnsMaxLength"]){
					questions[AnswerInt]["IndAnsMaxLength"] = data[row][AnswerInt][eachAnswer].length
				}
			}
			//// END: length of longest answer in characters

			//// START: Number of unique answer across all answer arrays
			//// if it doesn't exist, start with empty array
			if (!questions[AnswerInt]["uniqItems"]){
				questions[AnswerInt]["uniqItems"] = []
				questions[AnswerInt]["uniqItemsCount"] = 0
			}
			//// push array of answers from this row into array
			for (eachItem in data[row][AnswerInt]){
				questions[AnswerInt]["uniqItems"].push(data[row][AnswerInt][eachItem])
			}
			//// make array unique using uniq(a) function (currently on index.html inline JavaScript)
			questions[AnswerInt]["uniqItems"] = uniq(questions[AnswerInt]["uniqItems"])
			questions[AnswerInt]["uniqItemsCount"] = questions[AnswerInt]["uniqItems"].length
			//console.log("questions.js uniq questions[AnswerInt]['uniqItemsCount'] = ",questions[AnswerInt]["uniqItemsCount"])
			//console.log("questions.js uniq questions[AnswerInt]['uniqItems'] = ",questions[AnswerInt]["uniqItems"])
			//// END: Number of unique answer across all answer arrays
		}
	}
console.log("question.js xx x check questions",questions)	
return questions
}


