window.onload=function(){
	console.log("HERE first");
	var taskLoad=false;
	var waitingForScore=true;
	var socket=io();
	var count=4;
	var done =false;
	var progress = [5];
	var rep=4-count;
	document.getElementById("repetitions").style.display="none";
	var start=false;
	var scorewaiting=false;
	function enableEnd(){
		endReady=true;
	}
	function scoreToValues(score){
		var hex="";
		var response="";
		if(score==1){
			hex="#eddb72";
			response="Could improve";
		}else if(score==2){
			hex="#b3dd5f";
			response="That was OK";
		}else if(score==3){
			response="Nicely Done";
			hex="#55e5b5";
		}else if(score==4){
			response="Great Job";
			hex="#27b4f2";
		}else if(score==5){
			response="Excellent work";
			hex="#6b86db";
		}
		return {
			hex: hex,
			response: response
		};
	}
	var score;
	var intask=document.getElementById("task");
	var pretask=document.getElementById("pretask");
	socket.on('message',function(data){
		if(data.message!=null){
			var obj=JSON.parse(data.message);
			if (count>=2){
				score=obj.score1;
			}else{
				score=obj.score2;
			}
			rep=4-count;
			if(score>=0){
				var svgfile=document.getElementById("scoreImage");
				var svgContent=svgfile.contentDocument;
				var cirID="circle"+rep.toString();
				var hexResp=scoreToValues(score);
				var hex=hexResp.hex;
				var response=hexResp.response;
				svgContent.getElementById(cirID).style.fill=hex;
				document.getElementById("scoreValue").innerHTML=response;
				if(count>0){
				document.getElementById("resetObjects").innerHTML="Reset your objects.";
				}else{
					done=true;
					document.getElementById("resetObjects").innerHTML="Task is done.";
				}
				waitingForScore=false;
			}
		}

	});
	task.onclick=function(){
		if(!start){
			socket.emit("startTask");
			task.style.backgroundColor='#f3284e';
			endReady=false;
			setTimeout(enableEnd,2000);
			document.getElementById("tasktext").innerHTML="Stop";
			start=true;
		}else if(endReady){
			count-=1;
			document.getElementById("scoreValue").innerHTML="Hold on";
			document.getElementById("resetObjects").innerHTML="Score is loading.";
			socket.emit("endTask");
			document.getElementById("scoreResponse").style.display="";
			intask.style.backgroundColor='#97e157';
			document.getElementById("tasktext").innerHTML="Start";
			start=false;
			intask.style.display="hidden";
			intask.style.zIndex="9";
			pretask.style.display="visible";
			if(count>=0){
				document.getElementById("count").innerHTML=count;
			}else{
			}

		}
	}
	document.getElementById("start").onclick=function(){
		if(!scorewaiting){
			document.getElementById("scoreResponse").style.display="None";
			document.getElementById("repetitions").style.display="";
			scorewaiting= true;
			if(count<=0){
				//document.getElementById("repetitions").innerHTML="<span>You are done</span>";
				done=true;
				socket.emit("quit");
			}else{
				document.getElementById("scoreText").innerHTML="You have";
			}
		}else{
			scorewaiting=false;
			waitingForScore=true;
			socket.emit("systemReady");
			intask.style.zIndex="13";
			intask.style.display="visible";
			pretask.style.display="hidden";
			document.getElementById("repetitions").style.display="none";
		}
	}
		
}