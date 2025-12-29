const successLogger = (req, res, next) => {
  res.on('finish', () => {
    if (req.method === 'POST' && (res.statusCode === 201 || res.statusCode === 200)) {
      console.log(`[${new Date().toISOString()}] Successful POST by User ID: ${req.session.userId}`);
    }
  });
  next();
};

module.exports = successLogger;