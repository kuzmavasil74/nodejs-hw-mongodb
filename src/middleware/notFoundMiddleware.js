// мідлвар для відповіді 404 за допомогою json
const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
};

export default notFoundMiddleware;
