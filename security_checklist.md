# Security & Performance Checklist

## Firestore Security Rules
- [ ] Users can only read/write their own orders
- [ ] Inventory reads are public, writes admin-only
- [ ] Feedback submissions validated for authenticated users
- [ ] Admin operations require elevated permissions

## API Security
- [ ] All endpoints require authentication token
- [ ] Rate limiting on order placement (max 5/min per user)
- [ ] Input validation on all user data
- [ ] Sanitize feedback text to prevent XSS

## Performance Optimizations
- [ ] Index Firestore queries on `userId` and `timestamp`
- [ ] Cache product inventory locally (5-min TTL)
- [ ] Compress images to < 200KB
- [ ] Lazy load order history (paginate 20 items)

## Data Privacy
- [ ] No PII stored in logs
- [ ] Payment info never stored client-side
- [ ] User data encrypted in transit (HTTPS)
