import {dirname} from "path";
import {fileURLToPath} from "url";

globalThis.__dirname = dirname(fileURLToPath(import.meta.url));
