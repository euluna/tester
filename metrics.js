const prometheus = require('prom-client');

// Create a Registry to register the metrics
const register = new prometheus.Registry();

// Create a counter for API calls
const apiCallsCounter = new prometheus.Counter({
  name: 'api_calls_total',
  help: 'Total number of API calls',
  labelNames: ['endpoint', 'status']
});

register.registerMetric(apiCallsCounter);

// Expose metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
}); 