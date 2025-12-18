# Integration Test Plan

## Test Cases

### TC-001: Complete Order Flow
1. User logs in
2. Selects product
3. Confirms order
4. Payment processed (mocked)
5. Inventory decremented
6. Order recorded in Firestore
**Expected:** All steps succeed, data consistent

### TC-002: Out of Stock Handling
1. Attempt order when inventory = 0
**Expected:** 409 error, inventory unchanged

### TC-003: Failed Payment Recovery
1. Order initiated, inventory locked
2. Payment fails
3. **Expected:** Inventory unlocked, order cancelled

### TC-004: Invalid Authentication
1. Submit order with expired token
**Expected:** 401 error, force re-login
