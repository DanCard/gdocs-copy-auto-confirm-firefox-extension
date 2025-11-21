"use strict";

const TARGET_TEXT = ["make a copy", "make copy", "copy document", "copy file", "yes", "ok"];
let hasConfirmed = false;

function normalize(text) {
  return (text || "").trim().toLowerCase();
}

function clickIfMatch(element) {
  if (!element || hasConfirmed) {
    return false;
  }

  const text = normalize(element.textContent);
  const aria = normalize(element.getAttribute("aria-label"));
  const label = normalize(element.value);

  const matches = TARGET_TEXT.some((t) => text.includes(t) || aria.includes(t) || label.includes(t));
  if (matches) {
    element.click();
    hasConfirmed = true;
    return true;
  }

  return false;
}

function tryConfirm() {
  if (hasConfirmed) {
    return true;
  }

  const candidates = document.querySelectorAll(
    'button, input[type="button"], input[type="submit"], div[role="button"], span[role="button"]'
  );

  for (const el of candidates) {
    if (clickIfMatch(el)) {
      return true;
    }
  }

  return false;
}

function startWatching() {
  // Attempt immediately in case the dialog is already present.
  if (tryConfirm()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (tryConfirm()) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  startWatching();
} else {
  document.addEventListener("DOMContentLoaded", startWatching, { once: true });
}
