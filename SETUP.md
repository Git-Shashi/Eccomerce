Setup
=====

1) Install Node dependencies and start backend

```bash
cd backend
npm install
# create .env with MONGODB_URI if needed, otherwise default is used
npm start
```

2) Install frontend dependencies and start frontend

```bash
cd frontend
npm install
npm run dev
```

3) Visit the frontend

Open http://localhost:5173 in your browser. The backend listens on http://localhost:4000 by default.

Seeding
-------
On first run the backend will seed a few sample products if the products collection is empty.

Environment
-----------
You may create a `.env` file in `backend/` with:

MONGODB_URI=your_mongodb_connection_string
