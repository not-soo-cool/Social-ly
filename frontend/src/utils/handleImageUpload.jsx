import heic2any from "heic2any";

/**
 * Handles image input and returns Base64 + blob version.
 * @param {File} file - The image file selected by the user.
 * @returns {Promise<{ base64: string, blob: Blob }>}
 */
export const processImageFile = async (file) => {
  if (!file) return null;

  try {
    let blob = file;

    // Convert HEIC to JPEG if necessary
    if (file.type === "image/heic" || file.name.endsWith(".heic")) {
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 1,
      });
      blob = convertedBlob;
    }

    // Read as Base64
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    return { base64, blob };
  } catch (error) {
    console.error("Image processing failed:", error);
    return null;
  }
};
