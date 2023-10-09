import {
  createCanvas,
  loadImage,
  DOMMatrix,
  CanvasRenderingContext2D,
} from "canvas";
import blanks from "./blanks.json" assert { type: "json" };
import * as fs from "fs";

const IMAGE_WIDTH = 1728;
const IMAGE_HEIGHT = 2160;
const TEXT_X = 920;
const TEXT_Y = 1500;
const LABEL_WIDTH = 480;
const LABEL_HEIGHT = 225;
const IPFS_BASE =
  "https://bafybeigvhgkcqqamlukxcmjodalpk2kuy5qzqtx6m4i6pvb7o3ammss3y4.ipfs.dweb.link";

function breakLines(
  ctx: CanvasRenderingContext2D,
  label: string,
  fontSize: number
): string[] {
  ctx.font = `bold ${fontSize}px helvetica`;
  const allLines: string[] = [];
  const words = label.split(/\s+/);
  let curLine = words[0];

  words.forEach((word: string, index: number) => {
    if (index > 0) {
      const newWidth: number = ctx.measureText(curLine + " " + word).width;
      if (newWidth < LABEL_WIDTH) {
        curLine += " " + word;
      } else {
        allLines.push(curLine);
        curLine = word;
      }
    }
  });

  allLines.push(curLine);
  return allLines;
}

export async function renderPack(
  label: string,
  cigNumber: number | null
): Promise<{ cigNumber: number; path: string }> {
  if (cigNumber === null) {
    cigNumber = blanks[Math.floor(Math.random() * blanks.length)];
  }
  let imageUrl = `${IPFS_BASE}/${cigNumber?.toString()}.jpg`;

  const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
  const image = await loadImage(imageUrl, canvas);

  ctx.drawImage(image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  let lines: string[] = [];
  let textHeight = LABEL_HEIGHT + 1;
  let textWidth = 0;
  let fontSize = 43;

  while (textHeight > LABEL_HEIGHT) {
    fontSize -= 1;
    lines = breakLines(ctx, label, fontSize);

    textHeight = 0;
    lines.forEach((line) => {
      const textMeasure = ctx.measureText(line);
      const fontHeight =
        textMeasure.actualBoundingBoxAscent +
        textMeasure.actualBoundingBoxDescent;
      textHeight += fontHeight;
      textWidth = Math.max(textWidth, textMeasure.width);
    });

    // set transformation with a deltaY fudge factor from testing
    let deltaY = 95 - textHeight / 2;
    const matrix = new DOMMatrix("");
    matrix.a = 1.2;
    matrix.b = -0.215;
    matrix.c = -0.02;
    matrix.d = 1.5;
    matrix.e = TEXT_X;
    matrix.f = TEXT_Y + deltaY;
    ctx.setTransform(matrix);
  }

  let y = 0;
  lines.forEach((line) => {
    const textMeasure = ctx.measureText(line);
    const fontHeight =
      textMeasure.actualBoundingBoxAscent +
      textMeasure.actualBoundingBoxDescent;
    const height = fontHeight / 2.2;

    ctx.fillText(line, 0, y);
    // increment y by a fraction of the height of the current line
    y += height;
    ctx.translate(0, height);
  });

  const buffer = canvas.toBuffer("image/png");
  const outputPath = "assets/pack.png";
  fs.writeFileSync(outputPath, buffer);

  return { cigNumber: cigNumber, path: outputPath };
}

// Example usage
const label = "yet another image of a thing";
const cigNumber = null;
const outputPath = await renderPack(label, cigNumber);
console.log(`pack has been saved to ${outputPath}`);
