/*----
  Name of your program!
  Programmed by You!
  Documentation!
  ----*/

//Globals
var keysDown = []; //Map of which keys are being pressed

//Constants
var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 250;
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
		
		myButton.onclick = start;
   var myButton = document.getElementById("btnNext");
		
		myButton.onclick = next;


};

angleMode = "radians";
var test = "true";
var timer=0;

//Greatest common demoninator function
var gcd = function(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};

//declaring object to hold the fractions
// it holds both boxes keeps track of ????
var Fractions = function(box1,box2){
    this.number="";
    this.message="test";
    this.moving=false;
    this.box1=box1;
    this.box2=box2;
    this.step=0;
    this.newbox1=box1.clone();
    this.newbox2=box2.clone();
    this.flash=true;
    this.movebox=[];
    this.onebox1=box1.clone();
    this.onebox2=box2.clone();
    this.stepped=false;
    
};

//add function it finds the number of empty spaces in the first box and ques up to that many boxes from the second box

Fractions.prototype.add=function(){
    //finding the first filled in parts of each box
    var target1=this.box1.firstFilled()-1;
    var target2=this.box2.firstFilled();
  
while((target2)<this.box2.denominator&&target1>=0){   
        //manually cloneing the box to be moved
        var box = this.box2.squares[target2].clone();
        // making the original box empty
        this.box2.squares[target2].filled=false;
        
        box.target=this.box1.squares[target1];
        box.xdif = box.x-box.target.x;
        box.ydif = box.y-box.target.y;
        box.math=1;
        // setting move to flase so the box will be qued it the Box-update function
        box.move=false;
        
        
       
         this.box2.moveBox.push(box);
         
         target1--;
        target2++;
      /*  */
    }
    
};
////////////////////////// Subtract method//////////////////////
//almost the exact same as the add fucntion
Fractions.prototype.subtract=function(){
    this.box2.math=-1;
    var target1=this.box1.firstFilled();
    var target2=this.box2.firstFilled();
    //this.verticalSplit(target.denominator);
   // target.horizotalSplit(this.denominator);
   
while((target2)<this.box2.denominator&&target1<this.box2.denominator){   
    
        var box = this.box2.squares[target2].clone();
        this.box2.squares[target2].filled=false;
        
        box.target=this.box1.squares[target1];
        box.xdif = box.x-box.target.x;
        box.ydif = box.y-box.target.y;
        box.math=-1;
        //box.filled=false;
        box.move=false;
        
        
       
         this.box2.moveBox.push(box);
         
         target1++;
        target2++;
      /*  */
    }
    
};
//////////////////// MULTIPLY METHOD //////////////////////////
Fractions.prototype.multiply=function(){
    this.box1.verticalSplit(this.box2.numerator,this.box2.denominator)
    
};

////////////////////// DIVIDE METHOD //////////////////////////
Fractions.prototype.divide=function(){
    test=0;
    for(var x = this.box1.numerator; x  > 0; x -= this.box2.numerator){
        test++;
        this.movebox.push(this.box2.clone());
    }
    
};
////////////////////// RESET METHOD ////////////////////////
//returns the boxes to 1X1
Fractions.prototype.reset = function(){
	this.box1 = this.onebox1.clone();
	this.box2 = this.onebox2.clone();
}


////////////////////// UPDATE METHOD ///////////////////////////
//update function for fraction, controlls the moveBox que and math steps
///////////////////////////////////////////////////////////////
Fractions.prototype.update=function(){
    //part which checks if the boxes to be moved (box2) is full and boxes being moved (box1) is empty if so the first element in box 2 is moved to box2
    //purpose of this is so that only one box will be moved at a time.
    if(this.box2.moveBox[0]){
        
        if(!this.box1.moveBox[0]){
            var temp = this.box2.moveBox.shift();
            //move is set to true so the move will be recognized as one that should move.
            temp.move=true;
            if(temp.math===-1){
                temp.filled=false;
            }
        
            this.box1.moveBox.push(temp);
            this.box2.numerator--;
        }
    
    }
    if(this.step===0){
        this.newbox1=this.box1.clone();
        this.newbox2=this.box2.clone();
    }

 if(!this.box1.moveBox[0]&&!this.box2.moveBox[0]&&this.movebox[0]){
        this.box2=this.movebox.shift();
        this.subtract();
        this.box1.number++;
    }    
else if ( this.math === "add" || this.math ==="subtract"|| this.math ==="divide"){
        if (this.step===2&&this.stepped===false){
           var temp= this.box1.denominator;
        this.box1.verticalSplit(this.box2.denominator);
        this.box2.horizotalSplit(temp);
        this.stepped=true;
         this.message="making the bases of both fractions equel"
        }
        if (this.step===3){
            this.newbox1=this.box1.clone();
            this.newbox2=this.box2.clone();
		 this.flash=true;
        }
         
        if (this.step===4&&this.stepped===false){
		 if (this.math==="add"){
            	this.add();
			}
            else if(this.math==="subtract"){
			this.subtract();
			}
            else if(this.math==="divide"){
			this.divide();
			}
 		 this.message="Now that the bases are the same (pieces are equal size) we can "+this.math+" them."
            
            this.stepped=true;
            this.flash=false;
        }
       
    }
    else if(this.math==="multiply"){
		
            if (this.step===2){
            
                this.newbox1=this.box1.clone();
                this.newbox2=this.box2.clone();
            }
            if (this.step===3){
                
                this.multiply();
			this.flash=true;
              
            
                
            this.step++;
            
                
            }
         }
            
        if (this.step===5){
            this.newbox1=this.box1.clone();
            this.newbox2=this.box2.clone();
            this.flash=true;
        }
    
    
     if (this.step===8){
            this.box1.merge();
            this.box2.merge();
            this.step++;
        }
    if (this.step === 10){
          this.newbox1=this.box1.clone();
        this.newbox2=this.box2.clone();
            this.step++;
    }
};



Fractions.prototype.go=function(){
    if(frameCount%16>8 || this.flash===false){
        this.box2.display();
        this.box1.display();
       }
        else{
             this.newbox2.display();
             this.newbox1.display();
        }
    
    this.box1.update();
    this.box2.update();
    this.update();
};
//////////////////////////////////////////////////////////////////////////////////// BOX //////////////////////////////////// /////////////////////////////////////////////////////////////
//Box function - holds 

var Box = function(boxparts){
    
    this.number=-1;
    this.denominator=1;
    this.numerator=1;
    this.wide=1;
    this.squares=[];
    this.moveBox=[];
    if(boxparts){
        this.squares.push(boxparts);
    this.x=boxparts.x;
    this.y=boxparts.y;
    this.side1=boxparts.side1;
    this.side2=boxparts.side2;
    this.math=1;
        
    }
   // this.filled=  (typeof filled !== 'undefined') ? filled : true;
    
};
/// function to manually clone the Boxes
Box.prototype.clone=function(){
    var box = new Box();
    box.denominator=this.denominator;
    box.numerator=this.numerator;
    box.wide=this.wide;
    box.squares=[];
    for(var i = 0; i < this.squares.length; i++){
            box.squares.push(this.squares[i].clone());
    }
    
    
    
    box.x=this.x;
    box.y=this.y;
    box.side1=this.side1;
    box.side2=this.side2;
    box.math=this.math;
        
    
    return(box);
};



//declcaring on object to hold squares
var BoxParts = function(x,y,side1,side2,filled){
    //this.square=square;
    this.split="none";
    this.x=x;
    this.y=y;
    this.side1=side1;
    this.side2=side2;
    this.squares=[];
    this.filled=  (typeof filled !== 'undefined') ? filled : true;
    
};
/// function to manually clone the BoxParts
BoxParts.prototype.clone=function(){
    var box = new BoxParts(this.x,this.y,this.side1,this.side2,this.filled);
    box.target=this.target;
    box.xdif=this.xdif;
    box.ydif=this.ydif;
    box.math=this.math;
    return(box);
};
// Note: BoxParts are numbered top to bottom left to right
// 3x3 example below
// _______
// |8|5|2| 
// |7|4|1|
// |6|3|0|

//cuts the BoxParts contianed in a box vertically,it also modifys the denominator and numerator of the Box itself
Box.prototype.horizotalSplit = function(numerator,denominator){
    //demoninator sets how many parts each BoxPart is split into
    //numerator sets how many of each BoxParts are filled
    //This method is able to take only one input, it splits that many time and they are all filled
    denominator= denominator || numerator;
    var size = this.squares.length;
    var current = 1;
    this.denominator *= denominator;
    this.numerator *= numerator;
     this.wide*=denominator;
   
    for(var y = 0; y<size;y++){
         
        var filled = true;
        current=this.squares.pop();
        var height=current.side2;
        var width=current.side1/denominator;
        
        
        for(var x= 0; x<denominator;x++){
            if (!current.filled || x>=numerator){
                filled = false;
                
                }
            
            this.squares.unshift(new BoxParts(current.x+x*width,current.y,width-1,height,filled));
        
       
    }
    }
    
};

//same as horizotal split but it ?????
Box.prototype.verticalSplit = function(numerator,denominator){
    denominator= denominator || numerator;
    var size = this.squares.length;
    this.denominator *= denominator;
    this.numerator *= numerator;
   
   
    var current =1;
    
    
    for(var x = 0; x<size;x++){
        var filled = true;
        
    current=this.squares.pop();
    
    var height=current.side2/denominator;
    var width=current.side1;
    
    for(var y= 0; y<denominator;y++){
        if (!current.filled || y>=numerator){
        filled = false;
    }
        this.squares.unshift(new BoxParts(current.x,current.y+y*height,width,height-1,filled));
        
    }
    }
    
    
};

//Method to find the first BoxPart marked as filled
Box.prototype.firstFilled= function(){
   
    for(var x = 0; x < this.squares.length;x++){
         
        if(this.squares[x].filled===true){
            
            return x;
        }
    }
    return -1;
};
//currently unused function
Box.prototype.switch = function(box1,box2){
    var temp= this.square[box1].filled;
    this.square[box1].filled=this.square[box2].filled;
    this.square[box2].filled=temp;
};

/////////////// BOX MERGE METHOD //////////////////////////////

//function to simply the fraction
// finds the GDC and uses that to make a new box based on that fraction then replaces the curents box's squares with those ones.
Box.prototype.merge= function(){
    
    var length=this.squares.length;
    var number=gcd(this.numerator,this.denominator);
    var wide=gcd(this.wide,number);
    var tall=number/wide;
    
    
    var box = new Box(new BoxParts(this.x,this.y,this.side1,this.side2));
    box.horizotalSplit(this.numerator/number,this.denominator/number);
    this.squares=box.squares;
    this.numerator/=number;
    this.denominator/=number;
    /* part of the old method, commented out as it may be useful in a future method
     for(var i=length-1;i>0;i-=number){
        var square=this.squares[i].clone();
        square.side1= (square.side1*wide)+wide-1;
        square.side2 = (square.side2*tall)+tall-1;
        
    
    this.squares.splice(i,number,square);}*/
    
};

// Old method, not used at the moment may be used in future versions
Box.prototype.move=function(box,target,math){
    box=this.squares.slice(0)[box];
    //box=boxy[0];
    box.target=target;
    box.math=math;
    box.xdif = box.x-target.x;
    box.ydif = box.y-target.y;
    this.moveBox.push(box);
};


//////////////// BOX UPDATE ///////////////////////////////////
//The Box update method deals exclusivly with moving BoxParts in the moveBox array and thier effetct
Box.prototype.update = function(){
    //This method only does something if there is something in the moveBox array and if that element is ment to be moving(only BoxParts in Box1's moveBox array).
    //Agian this is done so only on box at a time is moving
    if(this.moveBox[0]){
        
        if(this.moveBox[0].move===true){
            
            this.moveBox[0].x-=this.moveBox[0].xdif/10;
            this.moveBox[0].y-=this.moveBox[0].ydif/10;
            
            if(abs(this.moveBox[0].x-this.moveBox[0].target.x)<1){
                 this.moveBox[0].xdif=0;
                 }
                 
                 if(abs(this.moveBox[0].y-this.moveBox[0].target.y)<1){
                     this.moveBox[0].ydif=0;
                     }  
                     
                     if(this.moveBox[0].xdif===0&&this.moveBox[0].ydif===0){
                         this.moveBox[0].target.filled=this.moveBox[0].filled;
                         this.numerator+=this.moveBox[0].math;
                         this.moveBox.splice(0,1);
                         
                          }
                          
                }
         }
};

//display methods, it displays the boxParts in squares, denominator, numorator, and the number if it is greater than 0;
Box.prototype.display=function(){
   
    if(this.squares[0]){
        
     for(var x=0;x<this.squares.length;x++){
         var square=this.squares[x];
         
         
       fill(165-99*this.math*square.filled, 90+this.math*90*square.filled, 100+this.math*90*square.filled );
     
    rect(square.x,square.y,square.side1,square.side2);} 
    }
      if(this.moveBox[0]){
        
     for(var x=0;x<this.moveBox.length;x++){
         var square=this.moveBox[x];
         //fill(255, 0, 0);
         
       fill(165-99*this.math*square.filled, 90+this.math*90, 100+this.math*90 );
     
      
    rect(square.x,square.y,square.side1,square.side2);} 
    }
    text(this.numerator*this.math,(this.x*2+this.side1)/2,this.y+this.side2+10);
    text(this.denominator,(this.x*2+this.side1)/2,this.y+this.side2+25);
    if(this.number>0){text(this.number,(this.x*2+this.side1)/2-20,this.y+this.side2+10);}
    
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function start(){
   
fractions.reset();

document.getElementById("btnSubmit").value="Reset";
var num1= parseInt(document.getElementById("num").value);
var num2 = parseInt(document.getElementById("num2").value);
var den1 = parseInt(document.getElementById("den1").value);
var den2 = parseInt(document.getElementById("den2").value);
var e = document.getElementById("math");
fractions.math = e.options[e.selectedIndex].value;	
		
fractions.box1.horizotalSplit(num1,den1);

fractions.box2.verticalSplit(num2,den2);
fractions.step=0;
}




function next(){
if(timer<=0){
	fractions.stepped=false;
	fractions.step++;
	timer=35;
	document.getElementById("btnNext").value="Step "+fractions.step;
}
}
/*
String.prototype.format = function(width){
	var lines = Math.floor(this.length/width)
	/*if (lines > 0){
		var x =Math.floor(this.length/lines)
		var temp = this.match(/.{1,x}/g);
		return temp.join("/n");
		}
	else{}*/
		return lines
}*/

////////////////////////////////////////////////////////////////////////////////////// TEST DATA ////////////////////////////// ///////////////////////////////////////////////////////////////////////////

// area to test variuos inputs before JS is put into an HTML.

frameRate(30);
//var square1 = new Square(10,10,[120]);
//var square2 = new Square(200,10,[120]);
var box1 = new Box(new BoxParts(10,10,120,120));
var box2 = new Box(new BoxParts(200,10,120,120));
var fractions = new Fractions(box1,box2);
//var num1 = prompt("What is your name", "Type you name here");

//box1.horizotalSplit(9,10);
//box1.verticalSplit(4);
//box1.verticalSplit(4,5);
//box2.verticalSplit(1,2);
//box2.horizotalSplit(5);
//var moveBox=new MoveBox();
///box1.verticalSplit(4);
 //       box2.horizotalSplit(5);
//fractions.math="divide";











/////////////////////////////////////////////////////////////////////////////////// DRAW ////////////////////////////////// //////////////////////////////////////////////////////////////////
void draw() {
	timer--;
   // box1.update();
    test=fractions.step;
  
    background(245, 242, 247);
    //rect(box1.squares[0]);
    fill(36, 36, 36);
    //rect(box1.squares[0]);
     text(test,200,200);
	//test=fractions.message;
    // text(test.format(40),(200-test.length*2.8),235);
     fractions.go();
    
    
    stroke(242, 233, 233);
   
  
};

void mouseClicked(){
    fractions.step++;
    if (step > 5){
        step = 1;
    
    }
};