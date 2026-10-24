export interface Card {
  /** successful consecutive reviews */
  reps: number
  /** days until next review */
  interval: number
  /** easiness factor, ≥ 1.3 — drives interval growth */
  ease: number
  /** ms timestamp of next due review */
  due: number
}

/** A fresh card due immediately. */
export function newCard(now?: number): Card
/**
 * SM-2 review. quality 0–5: 5 instant recall … 0 blackout.
 * <3 resets the card to relearning.
 */
export function review(card: Card, quality: number, now?: number): Card
/** review(card, 4) — correct, recalled with effort */
export function good(card: Card, now?: number): Card
/** review(card, 5) — instant recall */
export function easy(card: Card, now?: number): Card
/** review(card, 1) — failed, relearn today */
export function again(card: Card, now?: number): Card
export function isDue(card: Card, now?: number): boolean
/** Cards due now, soonest first. */
export function dueCards(cards: Card[], now?: number): Card[]
/** "today" · "tomorrow" · "in 3d" · "in 2w" · "in 4mo" */
export function intervalLabel(card: Card): string
