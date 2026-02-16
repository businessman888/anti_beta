try {
    console.log("Attempting to require nativewind/metro...");
    const nativewind = require("nativewind/metro");
    console.log("Success! nativewind/metro loaded.");
} catch (error) {
    console.error("Failed to require nativewind/metro:", error);
}
