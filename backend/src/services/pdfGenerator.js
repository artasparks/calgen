import PDFDocument from 'pdfkit';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_SUNDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_MONDAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * Generate a monthly calendar PDF.
 * @param {{ year: number, month: number, startDay: 'sunday' | 'monday' }} opts
 * @returns {PDFDocument} readable stream
 */
export function generateCalendarPDF({ year, month, startDay }) {
  const doc = new PDFDocument({
    size: 'LETTER',
    layout: 'landscape',
    margin: 40,
  });

  const pageW = 792;
  const pageH = 612;
  const margin = 40;
  const gridW = pageW - margin * 2; // 712
  const cols = 7;
  const rows = 6;
  const colW = gridW / cols;

  // Title
  const titleY = margin;
  const title = `${MONTH_NAMES[month - 1]} ${year}`;
  doc.fontSize(20).font('Helvetica-Bold');
  doc.text(title, margin, titleY, { width: gridW, align: 'center' });

  // Day headers
  const headerY = titleY + 32;
  const dayNames = startDay === 'monday' ? DAYS_MONDAY : DAYS_SUNDAY;
  doc.fontSize(10).font('Helvetica-Bold');
  for (let c = 0; c < cols; c++) {
    const x = margin + c * colW;
    doc.text(dayNames[c], x, headerY, { width: colW, align: 'center' });
  }

  // Grid area
  const gridTop = headerY + 18;
  const gridH = pageH - margin - gridTop;
  const rowH = gridH / rows;

  // Compute calendar days
  const firstOfMonth = new Date(year, month - 1, 1);
  let firstDow = firstOfMonth.getDay(); // 0=Sun
  if (startDay === 'monday') {
    firstDow = (firstDow + 6) % 7; // shift so Mon=0
  }
  const daysInMonth = new Date(year, month, 0).getDate();

  // Draw grid lines and day numbers
  doc.lineWidth(0.5).strokeColor('#999999');

  for (let r = 0; r <= rows; r++) {
    const y = gridTop + r * rowH;
    doc.moveTo(margin, y).lineTo(margin + gridW, y).stroke();
  }
  for (let c = 0; c <= cols; c++) {
    const x = margin + c * colW;
    doc.moveTo(x, gridTop).lineTo(x, gridTop + rows * rowH).stroke();
  }

  // Day numbers and ruled lines
  doc.font('Helvetica').fontSize(10);
  for (let day = 1; day <= daysInMonth; day++) {
    const cellIndex = firstDow + day - 1;
    const col = cellIndex % cols;
    const row = Math.floor(cellIndex / cols);
    const x = margin + col * colW;
    const y = gridTop + row * rowH;

    // Day number top-left
    doc.fillColor('#000000');
    doc.text(String(day), x + 4, y + 3, { width: colW - 8, align: 'left' });

    // Two light ruled lines for notes
    const noteStart = y + 18;
    const lineSpacing = (rowH - 22) / 3;
    doc.lineWidth(0.25).strokeColor('#cccccc');
    for (let l = 1; l <= 2; l++) {
      const ly = noteStart + l * lineSpacing;
      doc.moveTo(x + 3, ly).lineTo(x + colW - 3, ly).stroke();
    }
  }

  doc.end();
  return doc;
}
