import crypto from "crypto";

export const cryptoUtil = {
  createHash(text: string): string {
    return crypto.createHash("sha256").update(text).digest("hex");
  },
};
