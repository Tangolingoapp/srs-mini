// srs-mini — tiny spaced-repetition scheduler (SM-2 style).
// One card = { reps, interval, ease, due }. ~60 lines, no dependencies.

const DAY_MS = 86_400_000
const MIN_EASE = 1.3

export function newCard(now = Date.now()) {
  return { reps: 0, interval: 0, ease: 2.5, due: now }
}

// quality: 0–5 (SM-2). 5 = instant recall, 4 = correct after thought,
// 3 = correct but hard, 2 = wrong but recognized, 1 = wrong, familiar,
// 0 = complete blackout. <3 resets the card to relearning.
export function review(card, quality, now = Date.now()) {
  const q = Math.max(0, Math.min(5, Math.round(quality)))
  const c = { ...card }
  if (q < 3) {
    c.reps = 0
    c.interval = 0 // relearn today
  } else {
    c.reps += 1
    c.interval = c.reps === 1 ? 1 : c.reps === 2 ? 6 : Math.round(c.interval * c.ease)
  }
  // SM-2 ease adjustment — hard cards get easier-shrinking intervals,
  // easy cards grow them faster
  c.ease = Math.max(MIN_EASE, c.ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  c.due = now + c.interval * DAY_MS
  return c
}

// Convenience wrappers for the common pass/fail UI
export const good = (card, now) => review(card, 4, now)
export const easy = (card, now) => review(card, 5, now)
export const again = (card, now) => review(card, 1, now)

export function isDue(card, now = Date.now()) {
  return card.due <= now
}

// Cards due now, soonest first
export function dueCards(cards, now = Date.now()) {
  return cards.filter((c) => isDue(c, now)).sort((a, b) => a.due - b.due)
}

// Human label for a card's interval: "today", "in 2d", "in 3w"
export function intervalLabel(card) {
  const d = card.interval
  if (d === 0) return "today"
  if (d === 1) return "tomorrow"
  if (d < 7) return `in ${d}d`
  if (d < 30) return `in ${Math.round(d / 7)}w`
  return `in ${Math.round(d / 30)}mo`
}
