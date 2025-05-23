<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // GET /api/books

    /**
     * List all books or filter by user.
     *
     * Returns all books or only those of a specific user.
     *
     * @queryParam user_id int Optional. Filter by user ID.
     * @response 200 [
     *   {
     *     "id": 1,
     *     "title": "Sample Book",
     *     "user_id": 5,
     *     "is_read": false
     *   }
     * ]
     */
    public function index(Request $request)
    {
        $queryUserId = $request->query("user_id");
        $userIdFromHeader = $request->header("X-User-ID");

        if ($queryUserId) {
            $books = Book::where("user_id", $queryUserId)->get();
        } elseif ($userIdFromHeader) {
            $books = Book::where("user_id", $userIdFromHeader)->get();
        } else {
            $books = Book::all();
        }

        return response()->json($books);
    }

    // GET /api/books/{id}
    /**
     * Show a single book.
     *
     * Returns details of one book by ID.
     *
     * @urlParam id int required The ID of the book.
     * @response 200 {
     *   "id": 1,
     *   "title": "Sample Book",
     *   "user_id": 5,
     *   "is_read": false
     * }
     */
    public function show(Request $request, $id)
    {
        return response()->json(Book::findOrFail($id));
    }

    // POST /api/books
    /**
     * Create a new book.
     *
     * Only users can add books to their own collection.
     *
     * @header X-User-ID int required The user ID performing the request.
     * @header X-User-Role string required Role (admin or user).
     * @bodyParam title string required Book title.
     * @bodyParam author string Author name.
     * @bodyParam description string Book description.
     * @bodyParam published_date date Publication date (YYYY-MM-DD).
     * @bodyParam user_id int required Owner of the book.
     * @bodyParam is_read boolean Read status.
     * @response 201 {
     *   "id": 5,
     *   "title": "Test Book",
     *   "user_id": 4,
     *   "is_read": false
     * }
     */
    public function store(Request $request)
    {
        $currentUser = $request->user();
        if (!$currentUser) {
            return response()->json(["error" => "Unauthenticated."], 401);
        }
        if ($currentUser->role === "user") {
            $validated = $request->validate([
                "title" => "required|string|max:255",
                "author" => "nullable|string|max:255",
                "description" => "nullable|string",
                "published_date" => "nullable|date",
                "is_read" => "nullable|boolean",
            ]);
            $validated["user_id"] = $currentUser->id;
        } else {
            $validated = $request->validate([
                "title" => "required|string|max:255",
                "author" => "nullable|string|max:255",
                "description" => "nullable|string",
                "published_date" => "nullable|date",
                "user_id" => "required|integer",
                "is_read" => "nullable|boolean",
            ]);
        }

        $book = Book::create($validated);
        return response()->json($book, 201);
    }

    // PUT /api/books/{id}
    /**
     * Update an existing book.
     *
     * Only users can update their own books.
     *
     * @header X-User-ID int required The user ID.
     * @header X-User-Role string required Role (admin or user).
     * @urlParam id int required Book ID to update.
     * @bodyParam title string required Book title.
     * @bodyParam author string Author.
     * @bodyParam description string Description.
     * @bodyParam published_date date Publication date.
     * @bodyParam user_id int User ID (optional).
     * @bodyParam is_read boolean Read status.
     * @response 200 {
     *   "id": 5,
     *   "title": "Updated Book",
     *   "user_id": 4
     * }
     */
    public function update(Request $request, $id)
    {
        $currentUser = $request->user();
        if (!$currentUser) {
            return response()->json(["error" => "Unauthenticated."], 401);
        }
        $book = Book::findOrFail($id);

        if ($currentUser->role === "user" && (string) $book->user_id !== (string) $currentUser->id) {
            return response()->json(
                ["error" => "Users can only update their own books."],
                403
            );
        }

        $validated = $request->validate([
            "title" => "required|string|max:255",
            "author" => "nullable|string|max:255",
            "description" => "nullable|string",
            "published_date" => "nullable|date",
            "user_id" => "nullable|integer",
            "is_read" => "nullable|boolean",
        ]);
        if ($currentUser->role === "user") {
            $validated["user_id"] = $currentUser->id;
        }
        $book->update($validated);
        return response()->json($book);
    }

    /**
     * Delete a book.
     *
     * Users can only delete their own books.
     *
     * @header X-User-ID int required The user ID.
     * @header X-User-Role string required Role (admin or user).
     * @urlParam id int required Book ID to delete.
     * @response 204 {
     *   "message": "Deleted successfully"
     * }
     */
    public function destroy(Request $request, $id)
    {
        $currentUser = $request->user();
        if (!$currentUser) {
            return response()->json(["error" => "Unauthenticated."], 401);
        }
        $book = Book::findOrFail($id);

        if ($currentUser->role === "user" && (string) $book->user_id !== (string) $currentUser->id) {
            return response()->json(
                ["error" => "Users can only delete their own books."],
                403
            );
        }

        $book->delete();
        return response()->json(null, 204);
    }

    /**
     * Toggle read/unread status.
     *
     * Users can only change their own books.
     *
     * @header X-User-ID int required The user ID.
     * @header X-User-Role string required Role (admin or user).
     * @urlParam id int required Book ID.
     * @response 200 {
     *   "message": "Read/unread status toggled.",
     *   "book": {
     *     "id": 5,
     *     "is_read": true
     *   }
     * }
     */
    public function toggleRead(Request $request, $id)
    {
        $currentUser = $request->user();
        if (!$currentUser) {
            return response()->json(["error" => "Unauthenticated."], 401);
        }
        $book = Book::findOrFail($id);

        if ($currentUser->role === "user" && (string) $book->user_id !== (string) $currentUser->id) {
            return response()->json(
                ["error" => "Users can only modify their own books."],
                403
            );
        }

        $book->is_read = !$book->is_read;
        $book->save();

        return response()->json([
            "message" => "Read/unread status toggled.",
            "book" => $book,
        ]);
    }
}
