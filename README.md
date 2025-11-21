# Google Docs Copy Auto-Confirm

Firefox extension that automatically accepts the Google Docs "Make a copy" confirmation on `/copy` links.

## Install for testing

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...** and choose `manifest.json` from this folder.
3. Open a Google Docs `/copy` link (e.g., a template URL). The add-on will automatically press **Make a copy** on the confirmation dialog.

## How it works

A content script (`src/auto-confirm.js`) runs on Google Docs copy pages. It watches for buttons whose text or ARIA label mentions "make a copy" and clicks the first match, including late-rendered dialogs.
