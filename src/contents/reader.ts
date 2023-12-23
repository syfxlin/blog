import config from "../../keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { KEYSTATIC_ROOT } from "../env/private.mjs";

export const reader = createReader(KEYSTATIC_ROOT ?? ".", config);
