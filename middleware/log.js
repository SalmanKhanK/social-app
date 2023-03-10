module.exports = function log(req,res,next){
    console.log("Custom log middleware...");
    next()
}
