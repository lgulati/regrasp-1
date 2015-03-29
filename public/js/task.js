window.onload=function(){
	console.log("HERE first");
	var taskLoad=false;
	var socket=io();
	var count=3;
	var start=false;
	document.getElementById("rep").innerHTML="Repetition "+count.toString();
	var score=false;
	var task=document.getElementById("task");
	task.onclick=function(){
		if(!start){
			socket.emit("startTask");
			task.style.backgroundColor='#f3284e';
			document.getElementById("tasktext").innerHTML="End";
			start=true;
		}else{
			count-=1;
			document.getElementById("taskCenter").innerHTML="Score Loading";
			socket.emit("endTask");
			task.style.backgroundColor='#97e157';
			document.getElementById("tasktext").innerHTML="Start";
			start=false;
			task.style.zIndex="9";
			document.getElementById("rep").innerHTML="Repetition "+count.toString();
		}

	}
	document.getElementById("start").onclick=function(){
		if(!score){
			if(count>0){
				document.getElementById("taskCenter").innerHTML="You have "+count.toString()+" repetitions left";
				score=true;
			}else{
				document.getElementById("taskCenter").innerHTML="You are done";
				socket.emit("quit");
			}
		}else{
			score=false;
			task.style.zIndex="11";
		}
	}
		
}