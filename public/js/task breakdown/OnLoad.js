
    
    
    
    function systemSetup(){
        showReps();
        hideDiagram();
        taskReady = false;
        setup = false;
        document.getElementById("start").style.display = "";
        firstDiagram.style.width = "85%";
    }

    function showReps(){
        document.getElementById("repetitions").style.display="block";
        document.getElementById("prep").style.display="";
        document.getElementById("scoreResponse").style.display="none";
    }

    function hideDiagram(){
        diagScreen.style.visibility="hidden";
        taskArea.style.visibility="visible";
    }