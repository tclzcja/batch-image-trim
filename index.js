#!/usr/bin/env node

import fs from "fs";
import path from "path";
import trimImage from "trim-image";

const CURRENT_DIRECTORY = process.cwd();

const files = (await fs.promises.readdir(CURRENT_DIRECTORY)).filter((f) =>
	[".png", ".jpeg", ".jpg", ".bmp"].includes(path.extname(f))
);

for (const f of files) {
	trimImage(f, f);
}
