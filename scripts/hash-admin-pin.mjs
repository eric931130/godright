import { createHash, randomBytes } from "node:crypto";

const pin = process.env.ADMIN_SECONDARY_PIN;

if (!pin || !/^\d{4,12}$/.test(pin)) {
  console.error("Set ADMIN_SECONDARY_PIN to a 4-12 digit value before running this script.");
  process.exit(1);
}

const salt = process.env.ADMIN_SECONDARY_PIN_SALT || randomBytes(16).toString("hex");
const hash = createHash("sha256").update(`${salt}:${pin}`).digest("hex");

console.log(`ADMIN_SECONDARY_PIN_SALT=${salt}`);
console.log(`ADMIN_SECONDARY_PIN_HASH=${hash}`);
