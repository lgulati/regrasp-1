window.onload=function(){
	var nextStep=document.getElementById("nextStep").onclick=start("Done");

	var backIcon=document.getElementById("back").onclick=function(){
		console.log("HI");
		alert("HEYY");
		if(document.getElementById("nextStepText").value==="Done"){
			nextStep.innerHTML="Begin";
			alert("HI");
		}
		return false;
	};


}
