#!/usr/bin/env node

import fs from "fs";
import path from "path";
import jimp from "jimp";

const CURRENT_DIRECTORY = process.cwd();

const files = (await fs.promises.readdir(CURRENT_DIRECTORY)).filter((f) =>
	[".png", ".jpeg", ".jpg", ".bmp"].includes(path.extname(f))
);

for (const f of files) {
	console.log("Progressing", f);
	let image = await jimp.read(f);
	image.autocrop({
		cropOnlyFrames: true,
	});
	image.write(f);
}
