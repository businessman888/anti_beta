const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");
const { pathToFileURL } = require("url");

const config = getDefaultConfig(__dirname);

// Fix for Windows: Use file:// URL for input
const inputPath = path.join(__dirname, "global.css");
const inputUrl = pathToFileURL(inputPath).href;

module.exports = withNativeWind(config, { input: inputUrl });
