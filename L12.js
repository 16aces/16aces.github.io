/*----
  Name of your program!
  Programmed by You!
  Documentation!
  ----*/

//Globals
var keysDown = []; //Map of which keys are being pressed

//Constants
var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 400
var FRAMERATE = 30;
var W = 87;
var A = 65;
var S = 83;
var D = 68;

//Classes

//Functions
		


void keyPressed()
{
   keysDown[keyCode] = true;
};

void keyReleased()
{
   keysDown[keyCode] = false;
};


void mousePressed(){
   
}

void mouseReleased() {
   
}


void setup()
{	
   size(CANVAS_WIDTH, CANVAS_HEIGHT);
   frameRate(FRAMERATE);
   var myButton = document.getElementById("btnSubmit");
		
		myButton.onclick = processAnswer;

};
		
		function processAnswer()
		
		{
		
		var inputBox = document.getElementById("txtRadius");
		
		
		
		
		var radius = parseInt(inputBox.value);
		
		
		var result = document.getElementById("result");
		

		
		var resultString = "";
		
		//Perform some validation on the user's input:
		
	
		if (isNaN(radius))
		
		{
		
		alert("Please, enter a number");
		
		}
		
		else
		
		{
		
		
		
		var circ = getCircumference(radius);
		
		resultString = "Circumference is: " + circ;
		
		result.innerHTML = resultString;
		
		}
		
		}
		
		
		
		/*********************************************/
		
		
		
		//This is the function that performs the calculation:
		
		//it takes the radius as input and returns the circumference
		
		function getCircumference(rad)
		
		{
		
		var circumference = 2 * (Math.PI * rad);
		
		return circumference;
		
		}
