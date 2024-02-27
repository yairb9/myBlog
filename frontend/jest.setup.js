import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

global.fetch = require("cross-fetch");
