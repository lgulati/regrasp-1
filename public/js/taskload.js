window.onload=function(){
	console.log("HERE first");
	var taskLoad=false;
	var socket=io.connect('http://localhost:3000');
	var taskname=document.getElementById("taskName");
	socket.emit("systemReady");
	socket.on('message',function(data){
		console.log("HERE");
		var html="";
		if(data.message!=null){
			var obj=JSON.parse(data.message);
			taskname.innerHTML=obj.taskName;
		}else{
			console.log("Problem",data);
		}
		
	});
}