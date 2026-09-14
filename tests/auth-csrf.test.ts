import assert from "node:assert/strict";
import test from "node:test";
import { extractCsrfToken } from "../src/auth.js";

test("extractCsrfToken waits for the regional app page to expose its token", async () => {
  const calls: string[] = [];
  const page = {
    async waitForSelector(selector: string) {
      calls.push(`wait:${selector}`);
    },
    async evaluate(expression: string) {
      calls.push("evaluate");
      assert.equal(
        expression,
        '() => document.querySelector(\'meta[name="csrf-token"]\')?.content ?? null'
      );
      return "cn-csrf-token";
    },
  };

  const token = await extractCsrfToken(page);

  assert.equal(token, "cn-csrf-token");
  assert.deepEqual(calls, [
    'wait:meta[name="csrf-token"]',
    "evaluate",
  ]);
});
