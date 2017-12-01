function Hand(){
	this.type = {
		first: setFirst(),
		win: setWL(),
		lose: setWL()
	}
	this.won = false;
	this.moves = [];
	this.results = [];
}
function setFirst(){
	var num = Math.floor(Math.random()+1);
	switch(num){
		case 1:
		// 	return "R";
		// case 2:
		// 	return "P";
		// case 3: 
		// 	return "S";
		// case 4:
			return "X";
		default:
			return "ERROR";
	}
}
function setWL(){
	var num = Math.floor(Math.random()*3+1);
	switch(num){
		case 1:
			return "K";
		case 2:
			return "C";
		case 3: 
			return "S";
		default:
			return "ERROR";
	}
}
function run(){
	console.log("In the run");
	handArray = [];
	var F = {
		R:0,
		P:0,
		S:0,
		X:0
	};
	var W = {
		K:0,
		C:0,
		S:0
	};
	var L = {
		K:0,
		C:0,
		S:0
	};

	for (var i = 0; i < 10000; i++) {
		handArray.push(new Hand());
	}
	console.log(handArray);
	for (var i = 0; i < handArray.length; i++) {
		switch(handArray[i].type.first){
			case "R":
				F.R++;
				break;
			case "P":
				F.P++;
				break;
			case "S":
				F.S++;
				break;
			case "X":
				F.X++;
				break;
		}
		switch(handArray[i].type.win){
			case "K":
				W.K++;
				break;
			case "C":
				W.C++;
				break;
			case "S":
				W.S++;
				break;
		}
		switch(handArray[i].type.lose){
			case "K":
				L.K++;
				break;
			case "C":
				L.C++;
				break;
			case "S":
				L.S++;
				break;
		}
	}
	console.log(F);
	console.log(W);
	console.log(L);

	console.log("*****");
	
}

//
function play(Hand1, Hand2, rounds){
	//THIS NEEDS TO CATCH INFINITE CASES, UGHHHHH

	//Round 1
	p1win = null;
	console.log("before the first round");
	//Repeat in case of tie
	while(p1win == null){
		playRound(Hand1, Hand2);
	}
	console.log("before the second round");
	//Round 2+
	p1win = null;
	var j = 1
	var nulls = 0;
	while(j < rounds){
		console.log("in the while loop");
		console.log("nulls: "+nulls);
		playRound(Hand1, Hand2);
		if(p1win != null){
			j++;
			p1win = null;
		}
		else{
			nulls ++;
			if(nulls >=2){
				j = rounds;
				Hand1.won = true;
				Hand2.won = false;
			}
		}
	}
	console.log("outside of the second+ round");

	

	console.log(Hand1);
	console.log(Hand2);
}

//MASTER ROUND COORDINATOR
function playRound(Hand1, Hand2){
	if(Hand1.moves.length == 0){
		var p1move1 = firstMove(Hand1);
		var p2move1 = firstMove(Hand2);
	}
	else{
		var p1move1 = nextMove(Hand1,Hand2.moves[Hand2.moves.length-1]);
		var p2move1 = nextMove(Hand2,Hand1.moves[Hand1.moves.length-1]);
	}
	console.log(p1move1 + " " + p2move1);

	Hand1.moves.push(p1move1);
	Hand2.moves.push(p2move1);

	p1win = didP1Win(p1move1,p2move1);
	if(p1win != null){
		if(p1win){
			Hand1.results.push("W");
			Hand2.results.push("L");
		}
		else{
			Hand1.results.push("L");
			Hand2.results.push("W");
		}
	}
	else{
		var lastIndex = Hand1.moves.length-1;
		Hand1.moves.splice(lastIndex,1);
		Hand2.moves.splice(lastIndex,1);
	}
}

//TEST
function didP1Win(p1Move, p2Move){
	if(p1Move == "R"){
		switch(p2Move){
			case "P":
				return false
			case "S":
				return true
			default:
				return null
		}
	}
	if(p1Move == "P"){
		switch(p2Move){
			case "S":
				return false
			case "R":
				return true
			default:
				return null
		}
	}
	if(p1Move == "S"){
		switch(p2Move){
			case "R":
				return false
			case "P":
				return true
			default:
				return null
		}
	}
}


//MOVES

function firstMove(HandObj){
	if(HandObj.type.first == "X"){
		var random = Math.floor(Math.random()*3+1);
		console.log(random);
		switch(random){
			case 1: 
				return "R"
			case 2:
				return "P"
			case 3:
				return "S"
			default:
				return null
		}
	}
	else{
		return HandObj.type.first;
	}
}

function nextMove(HandObj, oMove){
	console.log(HandObj);
	var otherArray = ["R","P","S"];
	var lastIndex = HandObj.moves.length-1;
	console.log(lastIndex);
	var lastMove = HandObj.moves[lastIndex];

	otherArray.splice(otherArray.indexOf(oMove),1);
	otherArray.splice(otherArray.indexOf(lastMove),1);
	var otherMove = otherArray[0];
	console.log("last: "+lastMove);
	console.log("other: "+otherMove);
	if(HandObj.results[lastIndex] == "W"){
		var key = HandObj.type.win;
	}
	else{
		var key = HandObj.type.lose;
	}
	console.log(key);
	switch(key){
		case "K":
			return HandObj.moves[HandObj.moves.length-1];
		case "C":
			return oMove;
		case "S":
			return otherMove;
		default:
			return null
	}
}
