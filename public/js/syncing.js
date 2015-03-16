window.onload=function(){
	console.log("HERE first");
	var socket=io.connect('http://localhost:3000');
	socket.on('message',function(data){
		console.log("HERE");
		var html="";
		var connected=false;
		if(data.message!=null){
			alert("HI");
			var obj=JSON.parse(data.message);
			if(obj.type.toString()==="Connection"){
				if(obj.isConnected){
					console.log("is connected");
					socket.emit("caseConnect");
				}
			}else if(obj.type==="CaseConnection"){
				if(obj.isConnected){
					console.log("Case is connected");
					document.location.href="/complete/";
				}
			}
		}else{
			console.log("Problem",data);
		}
		
	});
}