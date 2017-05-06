"string"

0

0.1

var array = []

var array = [1,2,2,"tasdfads","asdfads"]

var json = {"key":"value","keyBig":["key":"value","keyArray":[1,2,3,4,"key"]],"method":function printStuff(){console.log("print stuff")}}

var part_json = json.keyBig.keyArray

console.log("call part of that json or part_json", part_json)

console.log(json.method)

"jsons are a standard way to store stuff"

"you can store not just variables, but also functions"

" it is a helper library.. a bunch of utilitarium functions, most common types is find things in the html"


" when you load the jquery library, it reservers that $ sign as a short cut for jquery"
". = class"
"# = id for jquery"

$("h2.center").click("if you just wanted to append to it"){
	var textInside = $("h2.center").innerHTML()
	var textInside2 = "new text in front"+textInside
	$("h2.center").html(textInside2)
}



