export function generateProgressBarSVG(params: {
  progress: number;
  scale?: number;
  title?: string;
  suffix?: string;
  width?: number;
  color?: string;
}): string {
  const {
    progress,
    scale = 100,
    title = '',
    suffix = '%',
    width = title ? 60 : 90,
    color = '428bca'
  } = params;

  const getProgressColor = (prog: number, totalScale: number): string => {
    const ratio = prog / totalScale;
    if (ratio < 0.3) return '#d9534f';
    if (ratio < 0.7) return '#f0ad4e';
    return '#5cb85c';
  };

  const progressColor = getProgressColor(progress, scale);
  const titleWidth = title ? 10 + 6 * title.length : 0;
  const totalWidth = titleWidth + width;
  const progressBarWidth = Math.min((progress / scale) * width, width);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${totalWidth}" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  
  <rect rx="4" x="0" width="${totalWidth}" height="20" fill="#${color}"/>
  <rect rx="4" x="${titleWidth}" width="${width}" height="20" fill="#555" />
  <rect rx="4" x="${titleWidth}" width="${progressBarWidth}" height="20" fill="${progressColor}" />
  
  ${title ? `<path fill="${progressColor}" d="M${titleWidth} 0h4v20h-4z" />` : ''}
  
  <rect rx="4" width="${totalWidth}" height="20" fill="url(#a)" />
  
  ${title ? `
  <g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="4" y="15" fill="#010101" fill-opacity=".3">${title}</text>
    <text x="4" y="14">${title}</text>
  </g>` : ''}
  
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="${Math.floor(width/2 + titleWidth)}" y="15" fill="#010101" fill-opacity=".3">${progress}${suffix}</text>
    <text x="${Math.floor(width/2 + titleWidth)}" y="14">${progress}${suffix}</text>
  </g>
</svg>`;
}