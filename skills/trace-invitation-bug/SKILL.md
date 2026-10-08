---
name: trace-invitation-bug
description: Trace blank pages, stuck loaders, and guest-name URL failures in this Next.js wedding invitation project. Use for diagnosis and local reproduction; implement fixes only when requested.
---

Trace the failing guest URL through the matching page, guest lookup, cover loader, and asset request. Record observed behavior separately from suspected causes.

## Project map

- `/putra_&_maydi/[name]` uses `src/pages/putra_&_maydi/[name].jsx`, `WeddingInvitationPutra/index.jsx`, `WeddingInvitationPutra/MainContainer.jsx`, and Firestore `guest_list_putra`.
- `/invitation/[name]` uses `WeddingInvitation.jsx` and `guest_list`.
- `/invitation2/[name]` uses `WeddingInvitation2.jsx` and `guest_list_2`.
- Corresponding invitation-list pages generate view links and spreadsheet exports. Compare both URL generators.
- `lib/api/guest.js` handles shared guest lookup. Reads currently normalize with trim and lowercase. Next.js supplies the decoded dynamic parameter; avoid an extra unconditional decode.
- Putra cover assets exist under `public/img/bang_putra/`. Older code fetched the cover from Firebase Storage `/img_putra/putra_1.webp`.

## Evidence to collect

Inspect working-tree and staged changes before testing. This project may already contain an uncommitted fix; compare it with HEAD before attributing live-site behavior to local code. Preserve existing edits.

Run the existing local development command from package.json and test the exact route, including its literal static `putra_&_maydi` segment. Encode the guest-name segment, not the entire path. Start with the reported guest and inspect the relevant invitation-list view link. Use observed data rather than writing test guests to the live database.

A timer reaching 100% does not establish successful image loading. Inspect the actual pending promise and all error paths: a failed image request must release loading state or show a useful error. Check whether a local fix still waits for a decorative delay and whether effect cleanup cancels all timers.

For guest-name failures, check spaces, URL-reserved characters (`#`, `?`, `/`, `%`), case, and whitespace normalization in both link creation and lookup. Distinguish a missing guest from an asset failure: the uninvited message indicates lookup rejection; a rendered cover loader means guest validation already passed.

Verify the cover, displayed guest name, and BUKA UNDANGAN button in the browser. Inspect console errors and image load status when relevant. Avoid submitting RSVP, importing guest spreadsheets, or modifying live records during diagnosis.

Report the reproducible result, implicated files, existing fixes, unresolved production differences, and the smallest next change. A local success alone does not prove which code is deployed. In trace-only work, leave application code untouched and save concise findings if useful.
