# srs-mini

Tiny spaced-repetition scheduler — the SM-2 algorithm in ~60 lines, zero dependencies, ESM + TypeScript types.

The piece every flashcard app needs: given a card and how well the learner recalled it (0–5), when should it come back? Cards you recall easily stretch to weeks; cards you fail come back today.

## Use

```js
import { newCard, review, good, again, dueCards, intervalLabel } from "./srs-mini.js"

let card = newCard()          // due immediately

card = review(card, 4)        // correct, took a moment → due in 1 day
card = review(card, 4)        // again → 6 days
card = review(card, 5)        // instant recall → ease grows, ~15 days
card = again(card)            // failed → back to relearning, due today

dueCards(deck)                // everything due now, soonest first
intervalLabel(card)           // "in 3d", "in 2w", "in 4mo"
```

Store a card's four numbers (`reps`, `interval`, `ease`, `due`) next to whatever the card teaches — word, note, fact. The scheduler owns the timing; your app owns the content.

## Honest scope

Classic SM-2 — proven, simple, still what most small apps use. If you ever outgrow it, FSRS is the modern successor (harder to tune, better retention modeling). For hundreds of cards per learner, this is the right one.

## License

MIT
