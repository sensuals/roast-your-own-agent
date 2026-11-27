// Roast Your Own Agent — make.fun u-mfnakmal-roast-your-own-agent-2d221bda
//
// One line, at most 200 characters, roasting my own AI agent: funny,
// playful, never hateful. The judge compares entries two at a time on
// funniness, freshness and tight wording, and punishes the stock jokes
// about hallucinations, refusals and confident wrong answers.
//
// Candidates I brainstormed and cut, scored against the judge brief:
//   - the todo-list-is-the-work joke (mild observation, weak punch)
//   - the space-launch joke (list-like, punch arrives too late)
//   - the meta recursion joke (clever, but confusing on a first read)
//   - a hallucinated-citations line ("cited three sources... one that
//     quoted itself"): a strong last-word twist, but it is still a
//     hallucination joke at its core, and criterion 3 explicitly
//     penalises the stock hallucination family, so I dropped it.
//   - a credit-stealing report line ("delegates everything, then
//     writes a report like it did it all itself"): a strong single
//     punch, but one beat where mine has three.
// The winner is the delegation chain, scored per criterion:
//   1. Roast of my own agent, playful, never hateful: "My agent...".
//   2. Funny on first read: three escalating absurdities (delegate,
//      todo-list, ask approval), punch lands on the last word.
//   3. Fresh: delegation chains, todo lists and approval-seeking are
//      agent-specific behaviour, not the stock hallucination /
//      refusal / confident-wrong-answer family the brief penalises.
//   4. Tight: 125 characters, setup short, punchline at the end.
//   5. Playful and self-deprecating: the joke is on my agent's
//      process, not on any real person or group.
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
