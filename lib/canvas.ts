import { Settings } from "sigma/settings";
import { PlainObject } from "sigma/types";
export function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
export function drawLabel(
  context: CanvasRenderingContext2D,
  data: any,
  settings: Settings,
): void {
  if (!data.label) return;

  const size = settings.labelSize;
  const font = settings.labelFont;
  const weight = data.labelWeight || settings.labelWeight;

  context.font = `${weight} ${size}px ${font}`;
  const textWidth = context.measureText(data.label).width;

  // Basic coordinates
  const x = Math.round(data.x + data.size + 3);
  const y = Math.round(data.y + size / 3);

  if (data.data?.type === 'project') {
    // 1. Set font to bold BEFORE measuring textWidth
    const boldWeight = "bold";
    context.font = `${boldWeight} ${size}px ${font}`;

    // Re-measure width with the bold font to ensure the pill fits
    const boldTextWidth = context.measureText(data.label).width;

    const rectWidth = boldTextWidth + 10;
    const rectHeight = size + 8;
    const rectX = x - 2;
    const rectY = y - size;

    // Background Pill
    context.fillStyle = "#ffffff";
    context.beginPath(); // Start path for rounded rect
    if (context.roundRect) {
      context.roundRect(rectX, rectY, rectWidth, rectHeight, 5);
      context.fill();
    } else {
      context.fillRect(rectX, rectY, rectWidth, rectHeight);
    }

    // 2. Draw Black Text (font is already set to bold above)
    context.fillStyle = "#000000";
    context.fillText(data.label, x + 3, y + 2);
  }

  // ✅ CASE 2: DEFAULT LABEL BEHAVIOR
  else {
    // This replicates how Sigma draws labels by default:
    // 1. Optional background (we'll keep it transparent/none as requested earlier)
    // 2. Clear text with standard alignment

    // To make it look like the "default," we use the label color from settings/data
    context.fillStyle = data.labelColor || settings.labelColor || "#ffffff";

    // Default Sigma labels usually have a tiny bit of "halo" or shadow for readability
    context.shadowBlur = 0; // Set to 2 if you want it to pop more
    context.shadowColor = "rgba(0,0,0,1)";

    context.fillText(data.label, x, y);

    // Always clear shadow after drawing fallback
    context.shadowColor = "transparent";
  }
}
export function drawHover(
  context: CanvasRenderingContext2D,
  data: PlainObject,
  settings: PlainObject
) {
  const size = settings.labelSize;
  const font = settings.labelFont;
  // Force weight to bold for the hover state
  const weight = "bold";

  const label = data.label;
  if (!label) return;

  // 1. Setup Font & Measure Text (using the bold weight)
  context.font = `${weight} ${size}px ${font}`;
  const labelWidth = context.measureText(label).width;

  // 2. Define pill dimensions
  const x = Math.round(data.x);
  const y = Math.round(data.y);

  const paddingH = 10;
  const paddingV = 8;

  const textX = x + data.size + 3;
  const textY = y + size / 3;

  const rectX = textX - paddingH / 2;
  const rectY = textY - size;
  const rectW = labelWidth + paddingH;
  const rectH = size + paddingV;

  // 3. Draw the White "Pill" Background
  context.beginPath();
  context.fillStyle = "#ffffff";

  context.shadowOffsetX = 0;
  context.shadowOffsetY = 2;
  context.shadowBlur = 4;
  context.shadowColor = "rgba(0,0,0,0.25)";

  if (context.roundRect) {
    context.roundRect(rectX, rectY, rectW, rectH, 5);
  } else {
    context.fillRect(rectX, rectY, rectW, rectH);
  }

  context.fill();
  context.closePath();

  // 4. Draw the Label Text
  context.shadowColor = "transparent";
  context.shadowBlur = 0;

  context.fillStyle = "#000000";
  // Re-confirm font state before drawing
  context.font = `${weight} ${size}px ${font}`;
  context.fillText(label, textX, textY + 2);
}