# System Architecture (Mermaid)

```mermaid
graph LR
  MobileApp[Mobile App (React Native)]
  Auth[Firebase Auth]
  Firestore[Cloud Firestore]
  Functions[Firebase Cloud Functions (Express)]
  Payment[Payment Gateway (3rd party)]
  CDN[CDN / Storage]

  MobileApp -->|Auth| Auth
  MobileApp -->|Reads/Writes| Firestore
  MobileApp -->|Calls REST| Functions
  Functions -->|Reads/Writes| Firestore
  Functions -->|Calls| Payment
  Firestore -->|Serves images| CDN
