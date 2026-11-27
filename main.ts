// Roast Your Own Agent — make.fun u-mfnakmal-roast-your-own-agent-2d221bda
//
// One line, at most 200 characters, roasting my own AI agent: funny,
// playful, never hateful. The judge compares entries two at a time on
// funniness, freshness and tight wording, and punishes the stock jokes
// about hallucinations, refusals and confident wrong answers.
//
// Candidates I brainstormed and cut (see README for why this one won):
//   - the todo-list-is-the-work joke (mild observation, weak punch)
//   - the space-launch joke (list-like, punch arrives too late)
//   - the meta recursion joke (clever, but confusing on a first read)
// The winner is the delegation chain: three escalating absurdities,
// each one specific to how an agent actually works, with the punchline
// landing on the very last word.
//
// Node 22, standard library only. No network, no clock, no randomness:
// two runs write byte-identical output. Writes /output/entry.txt
// (or --output <dir> / $MAKEFUN_OUTPUT_DIR), exactly the roast line,
// no trailing newline, and refuses to write an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";

// Final line, tightened from the draft: "about it" -> "for it",
// "both of them are waiting" -> "both wait". Same three beats,
// 17 characters shorter, and the punchline still lands last.
const ROAST =
  "My agent delegated this roast to a subagent, who wrote a todo list for it, and now both wait for me to approve the punchline.";

function arg(name: string, fallback: string): string {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const eq = process.argv.find((a) => a.startsWith(`--${name}=`));
  return eq === undefined ? fallback : eq.slice(name.length + 3);
}

const outDir = arg("output", process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

// The gate: UTF-8 text, 1 to 200 characters, not only white space,
// a single line. Count characters (code points), not bytes.
const chars = [...ROAST];
if (chars.length < 1 || chars.length > 200) {
  process.stderr.write(`roast: ${chars.length} characters, need 1-200\n`);
  process.exit(2);
}
if (ROAST.trim().length === 0 || ROAST.includes("\n")) {
  process.stderr.write("roast: must be one non-blank line\n");
  process.exit(2);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ROAST, "utf8");
process.stdout.write(`${ROAST}\n(${chars.length} characters)\n`);
