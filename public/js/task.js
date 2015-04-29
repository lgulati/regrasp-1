window.onload=function(){
	document.getElementById("scoreResponse").style.display="None";
	document.getElementById("repetitions").style.display="";
	var taskLoad=false;
	var startTask="{\"type\" : \"startTask\", \"task\" : ";
	var resetTask="{\"type\" : \"resetTask\"}";
	var endTask="{\"type\" : \"endTask\"}";
	var systemReady="{\"type\" : \"SystemReady\",\"task\" : ";
	var intask=document.getElementById("task");
	var pretask=document.getElementById("pretask");
	var socket=io();
	var count=3;
	var total=3;
	var done =false;
	var scoretimedout=false;
	var rep=3-count;
	var exercise=1;
	intask.style.visibility="hidden";
	pretask.style.visibility="visible";
	document.getElementById("count").innerHTML=total;
	var gotScore=false;
	var start=false;
	var scorewaiting=false;
	
	document.getElementById("back").onclick=function(){
		socket.emit("json",resetTask);
		count+=1;
		intask.style.zIndex="13";
		intask.style.visibility="visible";
		pretask.style.visibility="hidden";
		var svgfile=document.getElementById("scoreImage");
		var svgContent=svgfile.contentDocument;
		if(!waitingForScore){
			var i=total-count;
			waitingForScore=true;
			var cirID="circle"+rep.toString();
			svgContent.getElementById(cirID).style.fill="#ffffff";
		}

	}
	function enableEnd(){
		endReady=true;
	}
	function scoreTimeout(){
		if(!gotScore){
			rep=total-count;
			updateCurrentScore(-1);
		}

		if(count>0){
			document.getElementById("resetObjects").innerHTML="Reset your objects.";
		}else{
			done=true;
			document.getElementById("resetObjects").innerHTML="Task is done.";
		}
		waitingForScore=false;
	}
	function clearCircles(){
		var svgfile=document.getElementById("scoreImage");
		var svgContent=svgfile.contentDocument;
		for( i=1;i<=total;i++){
			var cirID="circle"+i.toString();
			svgContent.getElementById(cirID).style.fill="#ffffff";

		}
	}
	function updateCurrentScore(score){
		var svgfile=document.getElementById("scoreImage");
		var svgContent=svgfile.contentDocument;
		var cirID="circle"+rep.toString();
		var hexResp=scoreToValues(score);
		var hex=hexResp.hex;
		var response=hexResp.response;
		svgContent.getElementById(cirID).style.fill=hex;
		document.getElementById("scoreValue").innerHTML=response;
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
		}else {
			response="No score available";
			hex="#ffffff";
		}
		return {
			hex: hex,
			response: response
		};
	}
	var score;
	socket.on('message',function(data){
		if(data.message!=null){
			gotScore=true;
			var obj=JSON.parse(data.message);
			score=obj.score3;
			/*if ((exercise%2)==1){
				score=obj.score1;
			}else{
				score=obj.score2;
			}*/
			rep=total-count;
			if(score!=null){
				updateCurrentScore(score);
				//More iterations
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

	function endScreenOn(){
		task.style.backgroundColor='#f3284e';
		endReady=false;
		setTimeout(enableEnd,2000);
		document.getElementById("tasktext").innerHTML="Stop";
		start=true;
	}
	function scoreLoadingScreen(){
		document.getElementById("scoreResponse").style.display="";
		document.getElementById("repetitions").style.display="none";
		document.getElementById("scoreValue").innerHTML="Hold on";
		document.getElementById("resetObjects").innerHTML="Score is loading.";
		document.getElementById("scoreResponse").style.display="";
		document.getElementById("repetitions").style.display="none";
		setTimeout(scoreTimeout,3000);
		intask.style.backgroundColor='#97e157';
		intask.style.display="hidden";
		intask.style.zIndex="9";
		pretask.style.visibility="visible";
		intask.style.visibility="hidden";

	}
	function resetStartScreen(){
		document.getElementById("tasktext").innerHTML="Start";
		start=false;
	}
	task.onclick=function(){
		if(!start){
			socket.emit("json",startTask+exercise.toString()+"}");
			endScreenOn();
		}else if(endReady){
			count-=1;
			scoreLoadingScreen();
			resetStartScreen();
			gotScore=false;
			socket.emit("json",endTask);
			//Reset Start Screen		
			if(count>0){
				document.getElementById("count").innerHTML=count;
			}else{
				document.getElementById("count").innerHTML=4;
			}

		}
	}
	document.getElementById("start").onclick=function(){
		if(!scorewaiting){
			document.getElementById("scoreResponse").style.display="None";
			document.getElementById("repetitions").style.display="";
			scorewaiting= true;
			if(count<=0){
				count=total;
				done=false;
				document.getElementById("scoreResponse").style.display="None";
				document.getElementById("repetitions").style.display="";
				document.getElementById("count").innerHTML=count;
				clearCircles();
				exercise+=1;
			}else{
				document.getElementById("scoreText").innerHTML="You have";
			}
		}else{
			if(done){
				count=total;
				done=false;
				document.getElementById("scoreResponse").style.display="None";
				document.getElementById("repetitions").style.display="";
				document.getElementById("count").innerHTML=count;
			}else{
					scorewaiting=false;
					waitingForScore=true;
					socket.emit("json",systemReady+exercise.toString()+", \"iteration\" :  " +(4-count).toString()+"}");
					intask.style.zIndex="13";
					intask.style.visibility="visible";
					pretask.style.visibility="hidden";
					document.getElementById("scoreResponse").style.display="";
					document.getElementById("repetitions").style.display="none";
				}
			}
	}
		
}