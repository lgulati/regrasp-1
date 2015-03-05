exports.newJSON=function(req,res){
	res.render("hello new json");
}
exports.showPatient=function(req,res){
	res.render('patientscreen',{title:"Getting Started"});
}
exports.beginsetup=function(req,res){
	res.render('beginsetup',{title:"Begin Setup"});
}