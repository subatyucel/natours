# Natours

A learning project built with Node.js, Express, MongoDB, and Pug. It provides a tours marketplace with authentication, reviews, image uploads, Stripe checkout, and server-rendered pages.

## Tech stack
- Node.js (requires Node 22+)
- Express
- MongoDB with Mongoose
- Pug templates for server-rendered views
- Stripe Checkout (payments)
- JWT authentication (cookies + Authorization header)
- Multer + Sharp (image upload and processing)
- Nodemailer (SMTP in dev, SendGrid in prod)
- Security: Helmet, rate limiting, Mongo sanitize, XSS clean, HPP, CORS

## Project structure
- `server.js` – bootstraps app, connects to MongoDB, handles process signals
- `app.js` – Express app config, security middlewares, routers, static files, Pug views
- `routes/` – API and view routes (tours, users, reviews, bookings, pages)
- `controllers/` – route handlers (auth, tours, users, reviews, bookings, views)
- `models/` – Mongoose models (Tour, User, Review, Booking)
- `views/` – Pug templates and email templates
- `public/` – static assets (css, js, images, Leaflet)
- `dev-data/` – seed data and seeding script
- `utils/` – helpers (APIFeatures, AppError, email, catchAsync)

## Getting started

### 1) Install dependencies
```bash
npm install
```

### 2) Create environment file
Create a `config.env` in the project root with values for your environment:

```env
# App
NODE_ENV=development
PORT=3000

# Database (MongoDB Atlas or local). Replace <PASSWORD> with DATABASE_PASSWORD
DATABASE=mongodb+srv://<username>:<PASSWORD>@cluster0.mongodb.net/natours?retryWrites=true&w=majority
DATABASE_PASSWORD=your-db-user-password

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email (development SMTP)
EMAIL_HOST=your-smtp-host
EMAIL_PORT=587
EMAIL_USERNAME=your-smtp-username
EMAIL_PASSWORD=your-smtp-password
EMAIL_FROM=your-email@example.com

# Email (production via SendGrid)
SENDGRID_USERNAME=your-sendgrid-username
SENDGRID_PASSWORD=your-sendgrid-password

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
# Optional if you want to wire your own front-end key instead of the hardcoded test key in public/js/stripe.js
STRIPE_PUBLIC_KEY=pk_test_xxx
```

Notes:
- The app constructs the DB URI by replacing `<PASSWORD>` in `DATABASE` with `DATABASE_PASSWORD`.
- In development, emails are sent via your SMTP settings; in production, SendGrid is used if `NODE_ENV=production`.

### 3) Seed sample data (optional)
Import the provided sample data into your database:
```bash
npm run import-dev-data
```
Remove sample data:
```bash
npm run delete-dev-data
```

### 4) Run the app
Development (with nodemon):
```bash
npm run dev
```
Production:
```bash
npm start
```
App will start on `http://localhost:3000` by default.

## Key routes

### Views
- `GET /` – Overview
- `GET /tour/:slug` – Tour detail
- `GET /login` – Login page
- `GET /sign-up` – Sign up page
- `GET /me` – Account page (auth required)
- `GET /my-tours` – My tours (auth required)

### Auth and users (`/api/v1/users`)
- `POST /signup`, `POST /login`, `GET /logout`
- `POST /forgot-password`, `PATCH /reset-password/:token`
- `GET /me`, `PATCH /update-my-password`
- `PATCH /update-me`, `DELETE /delete-me`
- Admin only: CRUD on users via `/api/v1/users` and `/api/v1/users/:id`

### Tours (`/api/v1/tours`)
- CRUD on tours (create/update/delete require roles: admin, lead-guide)
- `GET /top-5-cheap`
- `GET /tour-stats`
- `GET /monthly-plan/:year` (admin/lead-guide/guide)
- Geo: `GET /tours-within/:distance/center/:latlng/unit/:unit`
- Geo: `GET /distances/:latlng/unit/:unit`
- Image upload on `PATCH /:id` with fields `imageCover` and `images[]`

### Reviews (`/api/v1/reviews` and nested under tours)
- `POST /` create (role: user)
- `GET /` list
- `GET/PATCH/DELETE /:id` (roles: user, admin for mutating)
- Nested: `POST /api/v1/tours/:tourId/reviews`

### Bookings (`/api/v1/bookings`)
- `GET /checkout-session/:tourId` – Stripe Checkout session
- Admin/lead-guide: CRUD under `/api/v1/bookings` and `/:id`

## Scripts
- `npm run dev` – start with nodemon
- `npm start` – start in production mode
- `npm run import-dev-data` – import sample data
- `npm run delete-dev-data` – delete sample data
- `npm run debug` – start with ndb debugger

## Security and middleware
- Helmet with CSP (Stripe, Google Fonts, Leaflet tiles allowed)
- Rate limiting on `/api`
- express-mongo-sanitize, xss-clean, hpp, CORS
- Cookies for JWT with `httpOnly` and `secure` (when applicable)

## License
ISC © Subat Yücel
