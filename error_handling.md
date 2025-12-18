# Error Handling Strategy

## Order Placement Errors
- Out of stock → Return 409, show alternative products
- Payment failed → Rollback inventory lock, notify user
- Network timeout → Queue order for retry, show pending status

## Inventory Management
- Lock inventory on order initiation (5-minute timeout)
- Release lock on completion or cancellation
- Handle race conditions with Firestore transactions

## Authentication Errors
- Invalid token → Force re-login
- Expired session → Refresh token automatically
- Network interrupted → Cache credentials, retry

## Fallback Mechanisms
- Failed Cloud Function → Retry 3x with exponential backoff
- Firestore write failure → Log to error queue
- Hardware communication timeout → Return to product selection
