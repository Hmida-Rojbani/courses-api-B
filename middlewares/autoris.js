module.exports = function (req,res,next) {
    if(!req.user_token.isAdmin)
        return res.status(403).send('Forbiden Access you are not an admin')
    next();
}