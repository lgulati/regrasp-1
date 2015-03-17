exports.newJSON=function(req,res){
	res.render("hello new json");
}
exports.showPatient=function(req,res){
	res.render('patientscreen',{title:"Getting Started"});
}
exports.beginsetup=function(req,res){
	res.render('beginsetup',{title:"Begin Setup"});
}
exports.patienthome=function(req,res){
	res.render('patienthome',{title:"Patient Home"});
}
exports.devicesetup=function(req,res){
	res.render('devicesetup',{title:"Device Setup"});
}
exports.syncing=function(req,res){
	res.render('syncing',{title:"Syncing"});
}
exports.complete=function(req,res){
	res.render('complete',{title:"Complete"});
}
exports.removehands=function(req,res){
	res.render('removehands',{title:"Remove Hands"});
}
exports.calibrate=function(req,res){
	res.render('calibrate',{title:"System Calibrating"});
}
exports.completecalibrate=function(req,res){
	res.render('completecalibrate',{title:"System Calibrated"});
}
exports.begintask=function(req,res){
	res.render('begintask',{title:"Begin Task"});
}
exports.taskTest=function(req,res){
	res.render('tasktest',{title:"Task Test"});
}

