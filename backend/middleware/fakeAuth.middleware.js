exports.fakeAuth = (req, res, next) => {
  const userId = req.headers["user-id"]|| req.body.userId;
  const storeId = req.headers["store-id"]|| req.body.storeId;

  if (!userId || !storeId) {
    return res.status(401).json({ message: "Missing userId or storeId" });
  }

  req.user = {
    id: userId,
    storeId: storeId,
  };

  next();
};