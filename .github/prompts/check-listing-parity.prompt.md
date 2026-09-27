---
name: Check Listing Parity
description: Compare the listing page against a reference at a shared desktop viewport and report only measurable visual or interaction mismatches.
argument-hint: 'Reference URL, viewport, and section to inspect'
agent: Listing Visual QA
---
Compare the local listing page with the supplied reference at the same viewport.

Inspect the requested section and record bounding boxes, image load state, text wrapping, sticky behavior, and the relevant interaction. Use the repository's [listing visual validation skill](../skills/listing-visual-validation/SKILL.md). Do not copy source implementation from the reference. If the reference cannot load, state that and use only supplied screenshots or captured page semantics.

Return the three highest-impact reproducible mismatches, with component/file locations and the smallest evidence-based correction for each. If no mismatch is verified, say so and list the remaining unverified states.
