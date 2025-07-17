export const authRolesMidlleware = (...allowdRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowdRoles?.includes(user.role)) return res.sendStatus(403);

    next();
  };
};
