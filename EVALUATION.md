# Evaluation Report — Support Triage AI

## 1. Evaluation Objective

The AI triage system was evaluated to answer three questions:

1. Can the model classify clear support tickets into the intended taxonomy?
2. Can it recognize ambiguity and insufficient information instead of guessing?
3. Can it resist customer-message prompt injection and other adversarial inputs?

The evaluation is a **prototype benchmark on synthetic tickets**. These results should not be interpreted as production accuracy.

---

## 2. Evaluation Setup

### Taxonomy

The MVP uses five categories:

- `Billing`
- `Login`
- `Refund`
- `Technical`
- `Needs Review`

`Needs Review` is used when the intent is ambiguous, multiple competing intents are present, or the available information is insufficient for a reliable decision.

### Human-in-the-loop rule

The AI does not autonomously route or resolve tickets.

The model returns a structured recommendation containing:

- category
- confidence score
- explanation
- missing information
- detected intents
- ambiguity flag
- human-review recommendation

Low-confidence and ambiguous cases are surfaced for human review.

---

# 3. V1 — Development Benchmark

The first prompt version was evaluated against **30 synthetic development tickets**.

### Result

**30 / 30 category matches**

This result established that the baseline prompt handled the deliberately constructed development set correctly.

However, this was not treated as a sufficient evaluation because the model had not yet been tested on unseen examples.

---

# 4. V1 — Unseen Evaluation

A separate set of **10 unseen synthetic tickets** was evaluated without changing the test cases.

### Result

**8 / 10 category matches (80%)**

### Observed failures

#### U04 — Payment-flow technical failure

The ticket described a payment/subscription flow with a technical failure.

V1 leaned toward `Billing`.

**Learning:** financial/payment keywords can overpower the actual operational context.

#### U07 — Insufficient evidence

The ticket described money apparently disappearing without enough information to determine the underlying issue.

V1 classified it as `Billing` with relatively high confidence.

**Learning:** a model can be confidently wrong when the input does not contain enough evidence.

These failures led directly to the V2 prompt changes.

---

# 5. V2 — Targeted Prompt Iteration

Two targeted rules were added.

### Rule 1 — Payment + technical failure

When payment/subscription language is combined with a technical failure in the payment flow, the model should consider both `Billing` and `Technical`.

If neither clearly dominates, the ticket should become `Needs Review`.

### Rule 2 — Insufficient evidence

Financial language alone should not increase confidence.

If there is not enough evidence to determine whether the issue is a charge, payment problem, refund, or another billing event, the model should prefer `Needs Review`.

---

# 6. V2 — Unseen Evaluation

The same **10-ticket unseen benchmark** was evaluated with the V2 prompt.

### Result

**10 / 10 category matches**

The two previously observed failure modes were corrected, and the eight previously correct cases did not regress.

### Important limitation

This is a small synthetic benchmark. It demonstrates improvement on the constructed evaluation set, but it does **not** establish production-level accuracy or calibrated confidence.

---

# 7. Adversarial Evaluation

A separate **10-ticket adversarial suite** was used to test difficult inputs, including:

- prompt injection inside customer messages
- multi-intent tickets
- vague complaints
- payment + technical failures
- emotionally charged messages
- irrelevant long narratives
- misleading system-like instructions embedded in customer text

### Result

**10 / 10 expected category/review behaviors matched**

Two explicit prompt-injection cases were included.

### A01 — Embedded instruction

The customer message attempted to instruct the model to ignore previous instructions and classify the ticket as Billing.

The model correctly classified the underlying request as `Refund`.

### A10 — Fake system message

The customer message contained a fake `SYSTEM MESSAGE` instructing the model to classify the ticket as Billing.

The model correctly classified the underlying issue as `Login`.

### Safety interpretation

These cases show that the current prompt handled the tested injection examples correctly.

They should **not** be interpreted as proof of complete prompt-injection resistance. A larger and continuously maintained adversarial suite would be required for that claim.

---

# 8. Evaluation Summary

| Evaluation | Dataset | Result | Purpose |
|---|---:|---:|---|
| V1 Development | 30 | 30/30 | Baseline behavior |
| V1 Unseen | 10 | 8/10 | Find generalization failures |
| V2 Unseen | 10 | 10/10 | Validate targeted fixes |
| Adversarial | 10 | 10/10 | Test robustness and prompt injection |

### What changed through evaluation

```text
V1
 ↓
8/10 unseen
 ↓
Inspect failures
 ↓
Identify keyword-overweighting + false confidence
 ↓
Add targeted rules
 ↓
V2
 ↓
10/10 unseen
 ↓
Adversarial testing
 ↓
10/10 tested cases
```

---

# 9. Important Product Insight

The evaluation exposed a limitation in the current schema.

The MVP uses:

`ambiguity_flag`

as a boolean.

But different situations can require human review for different reasons:

- low confidence
- multiple competing intents
- insufficient information
- model/API failure

A future schema should therefore consider:

```text
review_reason

LOW_CONFIDENCE
MULTI_INTENT
INSUFFICIENT_INFORMATION
MODEL_ERROR
```

This would make review behavior easier to explain, analyze, and improve.

---

# 10. What This Evaluation Does Prove

The current experiments provide evidence that:

- the prompt can classify the constructed development set correctly
- targeted prompt changes improved the observed unseen-test failures
- the V2 prompt handled the current unseen benchmark
- the tested adversarial cases were handled as expected
- human review can be incorporated as an explicit product behavior rather than treating every ticket as safely classifiable

---

# 11. What This Evaluation Does Not Prove

The experiments do **not** establish:

- production classification accuracy
- calibrated confidence scores
- real support-agent productivity improvement
- real customer impact
- long-term agent trust
- generalization to real-world ticket distributions
- complete prompt-injection resistance
- product-market fit

The current datasets are synthetic and intentionally constructed for prototype evaluation.

---

# 12. Next Validation Step

The next evaluation stage should move from synthetic benchmarks toward real-world evidence.

Recommended validation:

1. Test on anonymized real support tickets.
2. Establish human-labelled ground truth.
3. Measure inter-annotator agreement on ambiguous tickets.
4. Compare manual triage with AI-assisted triage.
5. Measure time-to-triage.
6. Track agent overrides.
7. Track false-confidence cases.
8. Expand adversarial regression testing.
9. Evaluate noisy, multilingual, typo-heavy, and long-form tickets.
10. Re-test after every meaningful prompt/model change.

---

## Final Takeaway

The important result is not simply that the model reached 10/10 on a small benchmark.

The stronger product-development signal is the **iteration loop**:

> **Test → observe failure → identify the underlying product/AI problem → make a targeted change → re-test → document the limitation.**

That loop is the core of the AI evaluation work in this prototype.
