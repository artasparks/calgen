import { Router } from 'express';
import { generateCalendarPDF } from '../services/pdfGenerator.js';

const router = Router();

router.get('/', (req, res) => {
  const year = Number(req.query.year);
  const month = Number(req.query.month);
  const startDay = (req.query.startDay || 'sunday').toLowerCase();

  if (!year || !month || month < 1 || month > 12) {
    return res.status(400).json({ error: 'Valid year and month (1-12) are required.' });
  }

  if (startDay !== 'sunday' && startDay !== 'monday') {
    return res.status(400).json({ error: 'startDay must be "sunday" or "monday".' });
  }

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const filename = `${MONTH_NAMES[month - 1]}-${year}.pdf`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  const pdfStream = generateCalendarPDF({ year, month, startDay });
  pdfStream.pipe(res);
});

export default router;
