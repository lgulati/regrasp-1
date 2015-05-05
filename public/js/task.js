window.onload=function(){
	var taskLoad=false;
	var setupTime=2000;
	var maxErrors=5;
	var errorCount=0;
	var scoreTime=1000;
	var checkForErrors=false;
	var startTask="{\"type\" : \"startTask\", \"task\" : ";
	var resetTask="{\"type\" : \"resetTask\"}";
	var endTask="{\"type\" : \"endTask\"}";
	var systemReady="{\"type\" : \"SystemReady\",\"task\" : ";
	var taskSetupReq="{\"type\" : \"TaskSetup\",\"task\" : ";
	var taskDone="{\"type\" : \"TaskDone\",\"task\" : ";
	var intask=document.getElementById("task");
	var pretask=document.getElementById("pretask");
	var diagScreen=document.getElementById("diagram");
	var taskArea=document.getElementById("taskArea");
	var objectSetup=document.getElementById("objectSetup");
	var firstDiagram=document.getElementById("firstDiagram");
	var popup=document.getElementById("popupBoxOnePosition");	
	var socket=io();
	var scores=[];
	var count=3;
	var total=3;
	var checkForErrors=false;
	var showGarden=false;
	var done =false;
	var scoretimedout=false;
	var endReady=false;
	var rep=3-count;
	var exercise=1;
	var diagramOn=true;
	document.getElementById("count").innerHTML=total;
	var gotScore=false;
	var start=false;
	var scorewaiting=false;
	var taskReady=false;
	var repsScreen=false;
	var notChecked = false;
	var nextExercise=false;
	var diagramLayout=false;
	var svg=document.getElementById("objectsUsed");
	var svgCont=svg.contentDocument;
	var objects=svgCont.getElementsByClassName("ex1");
	var lastObjects=[];
	lastObjects.push(objects[0]);
	var setup=false;
	var attempt=0;
	highlightObject();
	function systemSetup(){
		showReps();
		hideDiagram();
		taskReady=false;
		setup=false;
		document.getElementById("start").style.display="";
		firstDiagram.style.width="85%";
	}
	function errorScreen(error){
		document.getElementById("start").style.display="";
		firstDiagram.style.width="85%";
		var msg="";
		document.getElementById("firstSetup").style.display="block";
		if(error==1){
			msg="Hand not in start zone";
		}else if(error==2){
			msg="Incorrect object placed on the mat";
		}else{
			msg="Object placed at incorrect location on the mat";
		}
		document.getElementById("firstDiagramText").innerHTML=msg;
	}

	function showDiagram(){
		diagScreen.style.visibility="visible";
		firstDiagram.style.visibility="hidden";
	}
	function hideDiagram(){
		diagScreen.style.visibility="hidden";
		taskArea.style.visibility="visible";
	}
	function showObjectSetup(){
		objectSetup.style.visibility="visible";
		taskArea.style.visibility="hidden";
	}
	function taskScreenOn(){
		intask.style.zIndex="13";
		intask.style.visibility="visible";
		pretask.style.visibility="hidden";
	}
	function showReps(){
		document.getElementById("repetitions").style.display="block";
		document.getElementById("scoreResponse").style.display="none";
	}
	function hideSetup(){
		objectSetup.style.visibility="hidden";
		taskArea.style.visibility="visible";
	}
	function highlightObject(){
		while(lastObjects.length>0){
			var lastObj=lastObjects.pop();
			lastObj.style.fill="none";
		}
		var svgfile=document.getElementById("objectsUsed");
		var svgContent=svgfile.contentDocument;
		var objects=svgContent.getElementsByClassName("ex"+exercise.toString());
		for(var i=0;i<objects.length;i++){
			objects[i].style.fill="#B3DD5F";
			lastObjects.push(objects[i]);
		}

	}
	function setUpTimeOut(){
		if(notChecked){
			attempt++;
			setTimeout(setUpTimeOut,setupTime);
			if(attempt==3){
				attempt=0;
				notChecked=false;
				checkForErrors=false;
				diagramLayout=true;
				showDiagram();
				document.getElementById("objectsUsed").style.visibility="visible";
				document.getElementById("start").style.display="";
				document.getElementById("firstDiagramText").innerHTML="Set up your object(s) and hand";
				document.getElementById("firstSetup").style.display="block";
				document.getElementById("firstSetup").src="../img/icons-all/diagrams-start"+exercise.toString()+".png";
				diagramLayout=true;
				firstDiagram.style.width="85%";
			}else{
				socket.emit("json",taskSetupReq+exercise.toString()+"}");
			}
		}
	}
	function showLoading(){
		firstDiagram.style.width="100%";
		document.getElementById("firstDiagramText").innerHTML="Loading";
		document.getElementById("firstSetup").style.display="none";
		document.getElementById("start").style.display="none";
	}
	function createGarden(){
		var totalScores=0;
		for(var i=0;i<scores.length;i++){
			var curScore=scores[i];
			if(i%total==0){
				if(curScore>0){
					totalScores+=curScore;

				}
			}
		}
	}

	document.getElementById("start").onclick=function(){
		//diagram goes to setup
		if(showGarden){
			showGarden=false;
			createGarden();

		}else if(diagramLayout){
			systemSetup();
			diagramLayout=false;
		}
		else if(diagramOn){
			diagramOn=false;
			objectSetup.style.visibility="hidden";
			firstDiagram.style.visibility="visible";
			document.getElementById("SetupText").innerHTML="Set up your object and hand";
			document.getElementById("objectsUsed").style.visibility="hidden";
			document.getElementById("firstSetup").src="../img/icons-all/diagrams-start"+exercise.toString()+".png";
			//need to request setup here
			setup=true;

			//taskReady=false;
		}else if(setup){
			socket.emit("json",taskSetupReq+exercise.toString()+"}");
			setup=false;
			showLoading();
			checkForErrors=true;
			attempt=0;
			//setup=true;
			notChecked=true;
			setTimeout(setUpTimeOut,setupTime);
		}
		else if(!taskReady){
			taskReady=true;
			taskScreenOn();
			if(count==total){
				//clearCircles();
			}
			socket.emit("json",systemReady+exercise.toString()+", \"iteration\" :  " +(4-count).toString()+"}");
		}else if(repsScreen){
			socket.emit("json",taskDone+exercise.toString()+", \"iteration\" :  " +(4-count).toString()+"}");
			if(exercise<4){
				repsScreen=false;
				diagramOn=true;
				if(count==total){
					clearCircles();
				}
				showObjectSetup();
			}else{
				window.location.href="/";
			}

		}
	}

	function enableEnd(){
		endReady=true;
	}
	function scoreTimeout(){
		if(!gotScore){
			rep=total-count;
			updateCurrentScore(-1);
			repsScreen=true;
		}

	}
	function updateVideo(){
		var video = document.getElementById('videodiag');
		video.setAttribute("src","../img/INR-Exercise"+exercise.toString()+".mp4");
	}
	function updateCountScreen(){
		if(count>0){
			document.getElementById("resetObjects").innerHTML="Reset your objects.";
		}else{
			done=true;
			count=total;
			exercise+=1;
			highlightObject();
			updateVideo();
			document.getElementById("diagIMG").src="../img/icons-all/diagrams-ex"+exercise.toString()+ ".png";
			//showGarden=true;
			document.getElementById("resetObjects").innerHTML="Task is done.";
		}
		document.getElementById("count").innerHTML=count;
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
		scores.push(score);
		var svgfile=document.getElementById("scoreImage");
		var svgContent=svgfile.contentDocument;
		var cirID="circle"+rep.toString();
		var hexResp=scoreToValues(score);
		var hex=hexResp.hex;
		var response=hexResp.response;
		svgContent.getElementById(cirID).style.fill=hex;
		document.getElementById("scoreValue").innerHTML=response;
		updateCountScreen();
		repsScreen=true;
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
			var obj=JSON.parse(data.message);
			if(!checkForErrors){
				gotScore=true;
				score=obj.score3;
				rep=total-count;
				if(score!=null){
					updateCurrentScore(score);
				}
			}else{
				errorCount+=1;
				notChecked=false;
				var errorType=0;
				if(obj.error1!=1){
					errorType=1;
				}else if(obj.error2!=1){
					errorType=2;
				}else if(obj.error3!=1){
					errorType=3;
				}
				if(errorType==0||errorCount>=5){
					attempt=0;
					notChecked=false;
					checkForErrors=false;
					diagramLayout=true;
					showDiagram();
					document.getElementById("objectsUsed").style.visibility="visible";
					document.getElementById("start").style.display="";
					document.getElementById("firstDiagramText").innerHTML="Set up your object(s) and hand";
					document.getElementById("firstSetup").style.display="block";
					document.getElementById("firstSetup").src="../img/icons-all/diagrams-start"+exercise.toString()+".png";
					diagramLayout=true;
					firstDiagram.style.width="85%";
					//systemSetup();
				}else{
					setup=true;
					errorScreen(errorType);
				}

			}
		}

	});

	function endScreenOn(){
		endReady=false;
		setTimeout(enableEnd,scoreTime);
		document.getElementById("tasktext").innerHTML="Tap the Screen When Finished";
		start=true;
	}

	function scoreLoadingScreen(){
		document.getElementById("repetitions").style.display="none";
		document.getElementById("scoreResponse").style.display="block";
		document.getElementById("scoreValue").innerHTML="Hold on";
		document.getElementById("resetObjects").innerHTML="Score is loading.";
		setTimeout(scoreTimeout,scoreTime);
		intask.style.backgroundColor='#97e157';
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
		

		}
	}
	document.getElementById("video").onclick=function(){
		var video = document.getElementById('videodiag');
		video.currentTime=0;
		video.play();
		popup.style.display="block";	


	}
	document.getElementById("exit").onclick=function(){
		popup.style.display="none";	


	}
	


}
		