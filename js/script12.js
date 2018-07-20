var origBoard;
var a=new Audio();
a.src="musik/a.mp3";
var c=new Audio();
c.src="musik/c.m4a";
const  huPlayer="1";
const aiPlayer="2";
const winCombos=[
[0,1,2,3],
[4,5,6,7],
[8,9,10,11],
[12,13,14,15],
[0,4,8,12],
[1,5,9,13],
[2,6,10,14],
[3,7,11,15],
[0,5,10,15],
[3,6,9,12]
]
const cells=document.querySelectorAll('.cell');
startGame();

function startGame(){
	document.querySelector(".andgame").style.display="none"
	origBoard=Array.from(Array(16).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click',turnClick,false);
	}
	}
	function turnClick(square){
		if (typeof origBoard[square.target.id]=='number') {
			turn(square.target.id,huPlayer);
		if (!checkTie()) turn(bestSpot(),aiPlayer);
		}		
	}
	function turn(squareId,player){
		origBoard[squareId]=player;
		document.getElementById(squareId).innerText=player;
		let gameWon = checkWin(origBoard,player)
		if (gameWon) gameOver(gameWon)
	}
function checkWin(board,player){
	let plays=board.reduce((a,e,i ,o)=>
		(e===player) ? a.concat(i):a ,[]);
	let gameWon=null;
	for(let[index,win]of winCombos.entries()){
		if (win.every(elem=>plays.indexOf(elem) > -1)) {
			gameWon={index: index,player:player};
			break;
		}
	}
	return gameWon;
}
function gameOver(gameWon){
	for(let index of winCombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor=
		gameWon.player==huPlayer?"yellow":"red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click',turnClick ,false);
	}
	a.play();
	declareWinner(gameWon.player==huPlayer ?"kamu menang!":"kamu kalah")
}
function declareWinner(who){
	document.querySelector(".andgame").style.display ="block";
	document.querySelector(".andgame .text").innerText=who;
}

function emptySquares(){
	return origBoard.filter(s =>typeof s =='number')
}
function bestSpot(){
	return emptySquares()[1];
	return plays;
	return false;
	return true;
}
function checkTie(){
	
	if (emptySquares().length==0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor="green";
			cells[i].removeEventListener('click',turnClick,false);
		}
		c.play();
		declareWinner("kita sama!!!")
		return true;
	}
	return false;
}
