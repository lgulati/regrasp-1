exports.newJSON=function(req,res){
	res.render("hello new json");
}
exports.showPatient=function(req,res){
	res.render('patientscreen',{title:"Getting Started"});
}