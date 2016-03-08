var winners = [
	['a1','a2','a3'],
	['b1','b2','b3'],
	['c1','c2','c3'],
	['a1','b1','c1'],
	['a2','b2','c2'],
	['a3','b3','c3'],
	['a1','b2','c3'],
	['c1','b2','a3']
];

var whosTurn = 1;

function addSymbol(element){
	var gameHeader = document.getElementById('game-header')
	if(element.innerHTML == ''){
		//Put a symbol in... X or O?
		if(whosTurn == 1){
			//It's X's turn. So, we have an empty square, and it's X's turn. Put an X in.
			element.innerHTML = 'X';
			whosTurn = 2;
			gameHeader.innerHTML = "It is Player 2's turn";
			gameHeader.className = 'player-two';
			//Get rid of class 'empty', and add who took the square
			console.log(element.classList);
			element.classList.remove('empty');
			element.classList.add('playerOneHasThisSpace');
		}else{
			//It has to be O's turn. Put an O in.
			element.innerHTML = 'O';
			whosTurn = 1;
			gameHeader.innerHTML = "It is Player 1's turn";
			gameHeader.className = 'player-one';
			element.classList.remove('empty');
			element.classList.add('playerTwoHasThisSpace');
		}
	}else{
		gameHeader.innerHTML = "This box is taken";
		gameHeader.className = 'red';
	}
}


var squareWidth = document.getElementById('a1').clientWidth;
var squares = document.getElementsByClassName('square');
for(i=0; i<squares.length; i++){
	squares[i].style.height = squareWidth + 'px';
}

