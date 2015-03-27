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
			if(count>1){
				count-=1;
				score=true;


				//io.emit("completeTask");
			}
		}
		else{
			document.getElementById("count").innerHTML="You have completed this task";
		}

	}


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