window.onload=function(){
	console.log("HERE first");
	var taskLoad=false;
	var socket=io();
	var count=3;
	var score=false;
	var socket=io();
	socket.emit("startTask");
	var start=document.getElementById("start").onclick=function(){
		if(!score){
			count-=1;
			score=true;
			socket.emit("completeTask");
			document.getElementById("taskCenter").innerHTML="Score Loading";
		}
		else{
			if(count>=1){
				score =false;
				document.getElementById("taskCenter").innerHTML="You have  repetitions left";
			}
			else{
				document.getElementById("taskCenter").innerHTML="You have completed this task";
			}
		}

	};


	socket.on('message',function(data){
		if(data.message!=null){
			console.log("got message");
			console.log(data.message);
			score=false;

		}else{
			console.log("Problem",data);
		}
		
	});
}