var exports=module.exports={}
exports.login =function(req,res)
{
	res.render('login');
}
exports.signup =function(req,res)
{
	res.render('signup');
}
exports.home = function(req, res)
{
	res.render('home')
}
exports.myGroups = function(req,res)
{
	res.render('list-man');
}
exports.groups = function(req,res)
{
	res.render('list-join');
}