const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();
const db = admin.firestore();
const app = express();
app.use(cors({origin:true}));
app.use(express.json());

// Create order
app.post('/createOrder', async (req, res) => {
  try {
    const { uid, items, type, pickupLocation } = req.body;
    const order = {
      uid,
      items,
      type,
      pickupLocation: pickupLocation || null,
      status: 'PLACED',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const ref = await db.collection('orders').add(order);
    // decrement stock
    const batch = db.batch();
    for (const it of items) {
      const pRef = db.collection('products').doc(it.id);
      batch.update(pRef, { stock: admin.firestore.FieldValue.increment(-it.quantity || -1) });
    }
    await batch.commit();
    res.status(201).json({ orderId: ref.id });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

// Request refund
app.post('/requestRefund', async (req, res) => {
  try {
    const { orderId, uid, reason } = req.body;
    const orderRef = db.collection('orders').doc(orderId);
    const orderSnap = await orderRef.get();
    if (!orderSnap.exists) return res.status(404).send('Order not found');
    await db.collection('refunds').add({ orderId, uid, reason, status: 'REQUESTED', createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.status(200).send('Refund requested');
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

// Get product stock
app.get('/stock/:productId', async (req, res) => {
  try {
    const pid = req.params.productId;
    const p = await db.collection('products').doc(pid).get();
    if(!p.exists) return res.status(404).send('Not found');
    res.json({ id: p.id, stock: p.data().stock });
  } catch(e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

exports.api = functions.https.onRequest(app);
