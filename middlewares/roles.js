
const rolesMiddleware = {
  checkAdmin: () => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === 'ADMIN') {
        return next();
      } else {
        res.send(`You're not authorized!`)
      }
    }
  }
}

module.exports = { checkAdmin } = rolesMiddleware;