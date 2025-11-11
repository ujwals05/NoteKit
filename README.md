# NoteKit

A full-stack note-taking application that allows users to create, read, update, and delete notes seamlessly. Built with React, Node.js, Express, and MongoDB.

## Features

**User Authentication:** Register, Login, Logout using JWT  
**Dashboard:** CRUD-enabled notes management (Create, Read, Update, Delete)  
**Responsive UI:** Works on desktop and mobile  
**Backend API:** RESTful endpoints for notes and user management  

## 💻 Tech Stack

**Frontend:** React.js   
**Backend:** Node.js + Express   
**Database:** MongoDB  
**Authentication:** JWT (JSON Web Token)  
**Tools:** Axios, Postman, Tailwind CSS  

### Installation

1. **Clone the repository**

```
git clone https://github.com/ujwals05/NoteKit.git
cd NoteKit
```
2. Setup Backend

```
cd backend
npm install
```

**.env variables**

```
PORT = 8000
mongo_db = '...'

ACCESS_TOKEN_SECRET = '....'
ACCESS_TOKEN_EXPIRY = 1d

REFRESH_TOKEN_SECRET = '....'
REFRESH_TOKEN_EXPIRY = 10d 
```

```
npm run dev
```

3. Setup Frontend

```
cd ../frontend
npm install
npm start
```
