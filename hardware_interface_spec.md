# Hardware Interface Specification

## Communication Protocol
- Method: REST API / MQTT / Serial
- Endpoint: `/machine/dispense`
- Format: JSON

## Command Structure
```json
{
  "command": "DISPENSE",
  "slot": "A3",
  "orderId": "order_12345",
  "timestamp": "2024-12-17T10:30:00Z"
}
```

## Status Updates
- `READY` - Machine available
- `DISPENSING` - In progress
- `COMPLETE` - Item dispensed
- `ERROR` - Mechanical failure
- `OUT_OF_STOCK` - Slot empty

## Error Recovery
- Timeout (30s) → Refund customer, log incident
- Mechanical jam → Alert admin, offer refund
- Communication loss → Retry command 3x

## Mock Implementation
Located in: `src/services/mockHardware.js`
Simulates 2-second dispense delay + random 5% failure rate
