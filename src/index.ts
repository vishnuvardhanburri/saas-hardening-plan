import express from 'express';
import { BrandExtractionSchema } from './api/validation.js';
import { BrandService } from './services/brand_service.js';
import { logger } from './utils/logger.js';

const app = express();
app.use(express.json());

const brandService = new BrandService();

app.post('/v1/dna/extract', async (req, res) => {
  try {
    const validated = BrandExtractionSchema.parse(req.body);
    const result = await brandService.extractDNA(validated.url);
    return res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'INVALID_INPUT', details: error.message });
      }
      logger.error('API execution error', { message: error.message });
    }
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
});

const PORT = 3000;
// Only start the server if NOT in a test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => logger.info(`System running on port ${PORT}`));
}

export default app;