const performance = require('perf_hooks').performance;

function monitorAPIPerformance(req, res, next) {
  const start = performance.now();
  
  res.on('finish', () => {
    const duration = performance.now() - start;
    logger.info({
      path: req.path,
      method: req.method,
      duration: `${duration}ms`,
      status: res.statusCode
    });
  });
  
  next();
} 