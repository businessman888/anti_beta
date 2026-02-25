const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('mjs'); // Adiciona suporte ao formato do SDK da Anthropic

module.exports = config;
