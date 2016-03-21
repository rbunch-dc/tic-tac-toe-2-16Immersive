//Give the user the option of having 1 player with the computer, or 2 players without the computer
//Add a reset button
//SUPER BONUS
//Give the user the option of an Nth size grid.
//ULTRA BONUS
// Make the computer try and win.

var winners = 
[
	['a1','a2','a3'],
	['b1','b2','b3'],
	['c1','c2','c3'],
	['a1','b1','c1'],
	['a2','b2','c2'],
	['a3','b3','c3'],
	['a1','b2','c3'],
	['c1','b2','a3']
];

// var winners = [];
// var gridSize = 5;
// for(i = 0; i< gridSize; i++){
// 	for(j = 0; j< gridSize; j++){
// 		winners[i].push('a' + j)
// 	}
// }


var playerOneMarkings = [];
var playerTwoMarkings = [];
var whosTurn = 1;
var gameHeader = $('#game-header');
var computer;
var playerMode;
var winsPlayerOne;
var winsPlayerTwo;

function onePlayer(){
	computer = true;
	playerMode = 1;
	$('#game-header').html('Your turn!');

	var buttons = $("button");
	for(i=0; i<buttons.length; i++){
		buttons[i].disabled = false;
	}
}

function twoPlayers(){
	computer = false;
	playerMode = 2;
	$('game-header').html('Player 1\'s turn!');
	var buttons = $("button");
	for(i=0; i<buttons.length; i++){
		buttons[i].disabled = false;
	}
}

$('.square').click(function(){
	addSymbol($(this));
})

function addSymbol(element){
	// $(element).html('X');
	if($(element).html() == ''){
		//Put a symbol in... X or O?
		if(whosTurn == 1){
			//It's X's turn. So, we have an empty square, and it's X's turn. Put an X in.
			$(element).html('X');
			whosTurn = 2;
			$(gameHeader).html("It is Player 2's turn");
			gameHeader.className = 'player-two';
			//Get rid of class 'empty', and add who took the square
			$(element).removeClass('empty');
			$(element).addClass('p1');
			playerOneMarkings.push($(element).attr('id'));
			console.log(playerOneMarkings);
			checkWin();
			//Only run computersTurn, if the user chose 1 player
			if(computer == true){
				// setTimeout(computersTurn, 3000);
				computersTurn();
			}
		}else{
		//Otherwise run players turn.
			//It has to be O's turn. Put an O in.
			$(element).html('O');
			whosTurn = 1;
			$(gameHeader).html("It is Player 1's turn");
			$(gameHeader).addClass = 'player-one';
			playerTwoMarkings.push(element.id);
			checkWin();
		}
	}else{
		$(gameHeader).html("This box is taken");
		$(gameHeader).addClass = 'red';
	}
	checkWin();
}

function computersTurn(){
	//It has to be O's turn. Put an O in.
	// Get a random, empty square.
	var arrayOfEmptySquares = document.getElementsByClassName('empty');
	var randomEmptySquareIndex = Math.floor(Math.random() * arrayOfEmptySquares.length);
	var element = arrayOfEmptySquares[randomEmptySquareIndex];
	element.innerHTML = 'O';
	whosTurn = 1;
	gameHeader.innerHTML = "It is Player 1's turn";
	gameHeader.className = 'player-one';
	element.classList.remove('empty');
	element.classList.add('p2');
	playerTwoMarkings.push(element.id);	
	checkWin();
}

function checkWin(){
	//Define a variable, and if it gets to 3, then we have a winner. If it doesn't, the row is not complete.
	var rowCount = 0;
	var playerTwoRowCount = 0;
	var thisWinCombination;
	//Loop through all winning possibilities. RowCount needs to restart each time. 
	for(i=0; i<winners.length; i++){
		rowCount = 0;
		playerTwoRowCount = 0;
		thisWinCombination = winners[i];
		//Now, let's check if all the elemtns in the winners array, exist in the current player array (playerOneMarkings or playerTwoMarkings)
		for(j=0; j<thisWinCombination.length; j++){
			//Check if this square of the win combo we are on, is in the player's marking
			if(playerOneMarkings.indexOf(thisWinCombination[j]) > -1){
				//HIT!!!!
				rowCount++;
			}
			if(playerTwoMarkings.indexOf(thisWinCombination[j]) > -1){
				//HIT!!!!
				playerTwoRowCount++;
			}

		}
		if(rowCount === 3){
			//Player 1 won!!!!
			gameOver(thisWinCombination, 1);
		}else if(playerTwoRowCount === 3){
			gameOver(thisWinCombination, 2);			
		}
	}
}


function gameOver(combo, playerWhoWon){
	for(i=0; i<combo.length; i++){
		// console.log(combo[i]);
		// document.getElementById(combo[i]).classList.remove('blink');
		document.getElementById(combo[i]).classList.add('winner');
	}
	for(i=0; i<combo.length; i++){
		// console.log(combo[i]);
		// document.getElementById(combo[i]).classList.add('blink');
	}

	$(gameHeader).html('Player ' + playerWhoWon + ' , won the game!');

	var buttons = document.getElementsByTagName("button");
	for(i=0; i<buttons.length; i++){
		buttons[i].disabled = true;
	}
	$('#play-again-button').removeAttr('disabled');
	//Give the user a button to click on, to reset the board. When they click on it

	// Update wins counter for the winning playerOneMarkings
	if(playerWhoWon==1){
		winsPlayerOne++;
	}else{
		winsPlayerTwo++;
	}
	$('#play-again-button').disabled = false;
	$('#play-again').css('display', 'block');
}

function resetGame(){
	// Clear Player Arrays
	playerOneMarkings = [];
	playerTwoMarkings = [];
	
	$(".square").each(function(){
		$(this).html('');
		$(this).addClass('empty');
		$(this).removeClass('winner');
	})
	//Enable the one and two player buttons
	$('#one-player').removeAttr('disabled');
	$('#two-players').removeAttr('disabled');
	//hide the play again button
	$('#play-again').css('display','none');
}

var squareWidth = $('#a1').width();
$('.square').each(function(){
	$(this).css('height', squareWidth + 'px')
})


