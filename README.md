
# Auto Sadad

Course: Electronic Business Development (BINF 503)  
Semester: Winter 2025  
Instructor: Dr. Nourhan Hamdi  
Teaching Assistants: Mr. Nour Gaser, Mr. Omar Alaa  

---
Based on the code and documentation provided in the repository, here is a comprehensive project description formatted for GitHub (README.md).

---

# Auto Sadad 💸

**Auto Sadad** is a smart repayment platform designed to centralize bills, loans, and installment payments into a single dashboard. It helps users track due dates, receive reminders, and automate payments through simulated integrations with Egyptian payment services like Fawry and InstaPay.

### 🚀 Problem It Solves

Managing financial obligations can be chaotic. People often forget due dates, lose track of payment amounts, and struggle with payments scattered across multiple apps. This leads to accumulated late fees and missed payments. **Auto Sadad** solves this by aggregating all financial commitments in one place to improve personal financial control.

---

## ✨ Key Features

### MVP (Minimum Viable Product)

* **User Authentication**: Secure registration and login using JWT (JSON Web Tokens) and password hashing.
* **Bill Aggregator**: Centralized view to add, update, and delete bills from multiple providers.
* **Smart Reminders**: Automated notifications for upcoming due dates with customizable frequency (once, weekly, monthly).
* **Automated Payments**: Users can set up "Auto-Pay Rules" to automatically handle bills under a specific amount.
* **Payment Integration (Simulation)**: Simulates transactions via providers like Fawry or banks without actual financial deduction.

### Future Scope

* Dashboard & Analytics
* Payment History
* Profile Management

---

## 🛠️ Tech Stack

This project is built using a RESTful API architecture with the following technologies:
**MERN Stack**
* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/) for object modeling)
* **Authentication**: `jsonwebtoken` (JWT) & `bcryptjs` for security
* **Environment Management**: `dotenv`
* **Utilities**: `cors`, `morgan` (logging)


## 1. Team Members

| Name | Student ID | Tutorial Group | GitHub Username |
|------|------------|----------------|-----------------|
| [Nour Samir] | [13006170] | [T4] | [@nourmsamir] |
| [Malak El Koumy] | [13007408] | [T4] | [@malakelkoumy-15] |
| [Ganna Hamza] | [13003623] | [T4] | [@Ganna-Hamza006] |
| [Sama Samer] | [13007478] | [T7] | [@samasamerbandy] |
| [Omar Khaled] | [13002892] | [T7] | [@OmarKhaled06] |

---

## 2. Project Description

**Concept:** Auto Sadad is a smart repayment platform that centralizes all bills, loans, and installments in one place, sends reminders before due dates, and can automate payments using integrations with Egyptian payment rails (InstaPay, Fawry, banks, wallets).

**Problem it solves:**  
People forget due dates, don’t know exact amounts, and payments are scattered across different apps, leading to late fees and missed payments. Auto Sadad aggregates all payments into one dashboard to improve financial control.

**Link to FinTech course document:**  
https://www.canva.com/design/DAG1aJenNZQ/0nDk3-8uV6sN2XQM-OIX1A/view?utm_content=DAG1aJenNZQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1bd21b778b

---

## 3. Feature Breakdown

### 3.1 Full Scope (Complete Feature List)

- User registration & authentication  
- Profile management  
- Bill aggregator (view bills from multiple providers)  
- Bill management (add / update / delete bills)  
- Payment reminders   
- Automated payments  
- Payment integration (Fawry / InstaPay simulation)  
- Payment history  
- Dashboard & analytics  

### 3.2 Selected MVP Use Cases (Course Scope)

1. **User Authentication (mandatory)**  
2. **Bill Aggregator & Management**  
3. **Payment Reminders**  
4. **Automated Payments**  
5. **Payment Integration**

---

## 4. Feature Assignments

| Team Member | Assigned Use Case | Description |
|------------|-------------------|-------------|
| Malak El Koumy | User Authentication | Register, login, JWT, password hashing |
| Omar Khaled | Bill Aggregator & Management | CRUD for bills |
| Nour Samir | Payment Reminders | Create, edit, view, delete reminders with due date & frequency |
| Ganna Hamza | Automated Payments | Create auto-pay rules |
| Sama Samer | Payment Integration | Simulate transactions without actual integration |

---

## 5. Data Model (Initial Schemas)

### 5.1 User Schema

```js
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:    { type: String },
  createdAt:{ type: Date, default: Date.now },
});
```

### 5.2 Bill Schema

```js
const BillSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  billType:    { type: String, required: true },
  provider:    { type: String, required: true },
  amount:      { type: Number },
  dueDate:     { type: Date },
  referenceNo: { type: String },
  createdAt:   { type: Date, default: Date.now },
});
```

### 5.3 Reminder Schema 

```js
const ReminderSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  billId:       { type: mongoose.Schema.Types.ObjectId, ref: "Bill" },
  billName:     { type: String, required: true },
  amount:       { type: Number },
  dueDate:      { type: Date, required: true },
  reminderDate: { type: Date, required: true },
  frequency:    { type: String, enum: ["once", "daily", "weekly"], default: "once" },
  channel:      { type: String, enum: ["email", "sms", "push"], default: "push" },
  createdAt:    { type: Date, default: Date.now },
});
```
