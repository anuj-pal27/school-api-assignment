# 📚 School Management API

A RESTful Node.js API using Express and MySQL to manage school data. This system allows users to add schools and retrieve a list of schools sorted by proximity to a user-provided location.

---

## 🚀 Features

- ✅ Add new schools to the database
- ✅ List schools sorted by geographical distance (Haversine formula)
- ✅ Input validation and error handling
- ✅ MySQL database integration
- ✅ Hosted and ready for Postman testing

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MySQL (via `mysql2/promise`)
- dotenv
- Postman (for testing)

---

## 📦 Installation Instructions

1. **Clone the Repository**

```bash
cd school-management-api
```

3. Install Dependencies
 npm install

4. Create a .env file
PORT=3000
DB_HOST=your-db-host
DB_PORT=your-db-port
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

5. Set up the database
Run the SQL schema to create the schools table:
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);

6.Start the server
node server.js

🌐 API Documentation
1. Add a School
Endpoint: /addSchool

Method: POST

Content-Type: application/json

✅ Request Body
{
  "name": "Sunshine Public School",
  "address": "123 Example Street",
  "latitude": 28.7041,
  "longitude": 77.1025
}

✅ Success Response
{
  "message": "School added successfully."
}

2. List Schools by Proximity
Endpoint: /listSchools

Method: GET

Query Params: 
latitude=28.6139&longitude=77.2090

✅ Sample Request
GET /listSchools?latitude=28.6139&longitude=77.2090

✅ Sample Response
[
  {
    "id": 1,
    "name": "Sunshine Public School",
    "address": "123 Example Street",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": 11.23
  },
  ...
]

🌍 Hosting
This API is deployed on Railway.
Live URL:

https://school-api-assignment-production.up.railway.app/

📬 Postman Collection
You can test the API using Postman.

✅ Includes:
Example requests for /addSchool and /listSchools

Pre-filled JSON payloads and response examples

import from the raw : https://.postman.co/workspace/My-Workspace~75e862a8-39e0-4bf0-8ef1-cb46bb6d2eb9/collection/30170961-cabaf5e2-b315-4a9a-b4ab-55b97acd0115?action=share&creator=30170961

📄 License
This project is licensed under the MIT License.




