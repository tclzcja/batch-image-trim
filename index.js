#!/usr/bin/env node

import fs from "fs";
import path from "path";
import jimp from "jimp";

const CURRENT_DIRECTORY = process.cwd();

console.clear();

const files = (await fs.promises.readdir(CURRENT_DIRECTORY)).filter((f) =>
	[".png", ".jpeg", ".jpg", ".bmp", ".tiff"].includes(path.extname(f))
);

for (const f of files) {
	console.log("Processing", f);

	let image = await jimp.read(f);

	image.quality(100);

	let edgeTop = image.bitmap.height;
	let edgeLeft = image.bitmap.width;
	let edgeRight = 0;
	let edgeBottom = 0;

	for (let y = 0; y < image.bitmap.height; y++) {
		for (let x = 0; x < image.bitmap.width; x++) {
			const rgba = jimp.intToRGBA(image.getPixelColor(x, y));
			if (rgba.a > 0) {
				edgeTop = Math.min(y, edgeTop);
				edgeBottom = Math.max(y, edgeBottom);
				edgeLeft = Math.min(x, edgeLeft);
				edgeRight = Math.max(x, edgeRight);
			}
		}
	}

	image.crop(
		edgeLeft,
		edgeTop,
		edgeRight - edgeLeft + 1,
		edgeBottom - edgeTop + 1
	);

	image.write(f);
}
