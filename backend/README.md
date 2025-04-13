# 📚 Book Collection Manager – Detailed Backend Documentation

**Project Name:** Book Collection Manager  
**Course:** Web Application Development  
**Exercise:** Exercise 1 – Business Logic and Data Model  
**Technology Stack:** PHP Laravel 12, SQLite  
**Submission Deadline:** 7 April 2025  
**Prepared by:** [Muhammed Dinc / Team F]

---

## 📖 1. Project Objective

The Book Collection Manager is a Laravel-based RESTful backend designed to manage a user's personal book and paper collection. It allows CRUD operations on books and simulates user roles (admin/user) to enforce permissions. Authentication will be integrated in later stages.

---

## ⚙️ 2. Technology Stack

| Component | Description |
|----------|-------------|
| PHP 8.2+ | Server-side scripting language |
| Laravel 12 | Modern PHP backend framework |
| SQLite | Lightweight embedded relational database |
| Composer | Dependency and package manager for PHP |
| PhpStorm | Integrated Development Environment (IDE) |
| Scribe | Laravel package to generate HTML-based API documentation (used instead of Swagger) |

---

## 🗃️ 3. Data Model: Book Entity

### Database Table: books

| Column | Type | Description |
|--------|------|-------------|
| id | bigint (PK) | Auto-incremented unique identifier |
| title | string | Title of the book |
| author | string (nullable) | Name of the author |
| description | text (nullable) | Description or notes about the book |
| published_date | date (nullable) | Publication date |
| user_id | bigint (nullable) | Simulated owner of the book |
| is_read | boolean (default: false) | Read status of the book |
| created_at | timestamp | Created timestamp |
| updated_at | timestamp | Last modified timestamp |

Migration files include:
- `create_books_table.php` - basic structure
- `add_user_and_read_flag_to_books_table.php` - adds `user_id` and `is_read` columns

---

## 📦 4. Laravel Structure Overview

```
book-collection-manager/
├── .scribe/                        # Auto-generated API docs
├── app/
│   └── Http/
│       └── Controllers/
│           ├── BookController.php # RESTful API logic
│           └── Controller.php     # Base abstract controller (empty)
│   └── Models/
│       ├── Book.php               # Eloquent model for books
│       └── User.php               # Simulated user model
├── bootstrap/
│   └── app.php, cache/
├── config/
├── database/
│   ├── database.sqlite            # SQLite database file
│   ├── factories/
│   ├── seeders/                   # Seeder directory (optional data)
│   └── migrations/                # All migration files
├── public/
│   └── docs/                      # Scribe-generated documentation
├── routes/
│   ├── api.php                    # All API routes defined here
│   ├── console.php, web.php
├── .env, composer.json, etc.
```

---

## 🧠 5. Role-Based Access Simulation

Simulated using HTTP headers (no real auth system yet):

| Header | Description |
|--------|-------------|
| X-User-ID | The simulated user ID (e.g., 1, 2, 5...) |
| X-User-Role | Role assigned to the user: `admin` or `user` |

**Admin**: Can access all resources.  
**User**: Can only manage own books.

### Example Header for Postman:
```
X-User-ID: 5
X-User-Role: user
```

Implemented in every controller method.

---

## 🔄 6. API Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | List all books or by user filter |
| GET | /api/books/{id} | Show a specific book |
| POST | /api/books | Create a new book |
| PUT | /api/books/{id} | Update a book |
| DELETE | /api/books/{id} | Delete a book |
| PATCH | /api/books/{id}/toggle-read | Toggle read/unread flag |
| GET | /api/test | Basic route test |

---

## 📂 7. Example Request Bodies

**POST /api/books**
```json
{
  "title": "Test Driven Development",
  "author": "Kent Beck",
  "description": "A guide to TDD.",
  "published_date": "2025-03-22",
  "user_id": 5,
  "is_read": false
}
```

**PATCH /api/books/3/toggle-read** – toggles `is_read` for book with ID 3

---

## ⚠️ 8. Error Handling Examples

| HTTP Code | Reason |
|-----------|--------|
| 403 | Forbidden – when user tries to access another user's book |
| 404 | Not Found – when book ID does not exist |
| 422 | Validation Error – if required fields are missing |

**Example Error (403):**
```json
{
  "error": "Users can only delete their own books."
}
```

---

## 📑 9. API Documentation via Scribe

- Tool: **Scribe (HTML-based API doc generator)** – used instead of Swagger
- Installation via: `composer require knuckleswtf/scribe --dev`
- API annotated using PHPDoc above controller methods
- Generate docs using:
```bash
php artisan scribe:generate
```
- View at: `http://127.0.0.1:8000/docs`

---

## 🧪 10. Testing & Tools

- All endpoints tested using **Postman**
- Request headers required (`X-User-ID`, `X-User-Role`)
- Assertions verified by role simulation and API responses

---

## 🧷 11. Seeders (optional)

Directory: `database/seeders/`  
Can be used to populate demo book entries or predefined roles if desired.

---

## 🔜 12. What Comes Next (Exercises 2 & 3)

| Phase | Description |
|-------|-------------|
| Exercise 2 | UI frontend development (assigned tech stack) |
| Exercise 3 | Full user registration, login, real role-based auth |

---

## 📎 13. References

- Laravel Docs → https://laravel.com/docs
- Scribe Docs → https://scribe.knuckles.wtf
- OpenAPI Best Practices → https://swagger.io/resources/articles/best-practices-in-api-design/
- SQLite in Laravel → https://laravel.com/docs/12.x/database

---

## ✅ 14. Summary

✔ Laravel backend with RESTful architecture  
✔ Data model + migration structure complete  
✔ Full role-based business logic  
✔ Extensive documentation via Scribe  
✔ Ready for final submission & presentation

---

*Prepared by: Muhammed Dinc*  
*Date: 23 March 2025*

_________________________________________________________________________________________

# 🛠️ PHP & Laravel Setup Guide for Book Collection Manager

**Purpose:** This guide helps your fellow students set up the exact same environment and configuration used in your Laravel backend project.  
**Goal:** Be ready to collaborate and contribute to the project in minutes.

---

## ✅ 1. Install PHP (without XAMPP)

1. Go to https://windows.php.net/download/ and download **PHP 8.3.x (Non Thread Safe .zip)**.
2. Extract the zip folder to `C:\php` (or another folder, but adjust paths later).
3. Open `C:\php\php.ini-development` → rename it to `php.ini`.
4. In `php.ini`, uncomment (remove `;` in front of) the following lines:
```
extension=sqlite3
extension=pdo_sqlite
extension=fileinfo
extension=zip
```
5. Add PHP path to Environment Variables:
    - Press `Win + S` → search for **"Environment Variables"**
    - Under **System variables → Path → Edit** → add `C:\php`
6. Restart terminal (or computer) and test:
```bash
php -v
```

---

## ✅ 2. Install Composer

1. Download the Composer installer: https://getcomposer.org/Composer-Setup.exe
2. During setup, browse and select `C:\php\php.exe` as your PHP interpreter.
3. Complete the setup. Test it via terminal:
```bash
composer -V
```

---

## ✅ 3. Set Up the Project

1. Clone or copy the project folder `book-collection-manager`.
2. Open the project in **PhpStorm**.
3. Open a terminal in PhpStorm or use `cmd` / `PowerShell`.
4. Run:
```bash
composer install
```
5. Create database file:
```bash
mkdir database
cd database
echo. > database.sqlite
```
Alternatively:
```bash
New-Item database/database.sqlite
```
6. Go back to root folder and run migrations:
```bash
php artisan migrate
```

---

## ✅ 4. Setup Scribe for API Documentation

1. Install Scribe:
```bash
composer require knuckleswtf/scribe --dev
```
2. Add PHPDoc comments in `BookController.php` (already done in project).
3. Generate docs:
```bash
php artisan scribe:generate
```
4. Access at: http://127.0.0.1:8000/docs

---

## ✅ 5. Simulate User Roles for Testing

Add headers in Postman or other clients:
```
X-User-ID: 1
X-User-Role: admin
```
OR
```
X-User-ID: 5
X-User-Role: user
```

---

## ✅ 6. Run Laravel Dev Server
```bash
php artisan serve
```
App will be available at: http://127.0.0.1:8000

---

## ✅ 7. Common Errors and Fixes

| Error | Fix |
|-------|-----|
| `Missing fileinfo extension` | Uncomment `extension=fileinfo` in `php.ini` |
| `404 Not Found for routes` | Check if you're calling correct `/api/...` endpoints |
| `Internal Server Error - No App Key` | Run `php artisan key:generate` |
| `Database missing` | Ensure `database/database.sqlite` exists and path is correct in `.env` |
| `Terminal not opening in PhpStorm` | Set `Shell path` to `cmd.exe` or `powershell.exe` in settings |

---

## 📎 Final Notes

- IDE: PhpStorm recommended, but any editor works.
- Make sure everyone uses the same PHP version and `.env` file.
- Commit only `.env.example`, not real `.env`.

---

*Prepared by: Muhammed Dinc*  
*Date: 23 March 2025*


