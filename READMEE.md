### Pages and Routes

| Page Name      | Route         | Protected | Data Displayed        | Components Used                                                                                      |
| -------------- | ------------- | --------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| Landing        | /             | No        | Static content        | Navbar, Hero, Features, Footer                                                                       |  PASS | 
| Login          | /login        | No        | Login form            | LoginForm                                                                                            | PASS | http://localhost:5173/login
| Signup         | /signup       | No        | Signup form           | SignupForm                                                                                           | PASS | http://localhost:5173/signup |
| Dashboard      | /dashboard    | Yes       | User's meetings list  | Navbar, MeetingList, MeetingCard, UploadButton, SearchBar                                            | PASS | http://localhost:5173/dashboard |
| Meeting Detail | /meetings/:id | Yes       | Full meeting details  | MeetingDetail, TranscriptionView, ActionItemsList, DecisionsList, DiscussionPointsList, ExportButton | PASS | http://localhost:5173/meeting/1
| Profile        | /profile      | Yes       | User profile settings | ProfileForm, SettingsPanel                                                                           | PASS |

### API Endpoints

| Method | Endpoint                  | Protected | Purpose                                    | LLM Integration |
| ------ | ------------------------- | --------- | ------------------------------------------ | --------------- |
| POST   | /api/meetings             | Yes       | Upload new meeting audio file              | Yes             | PASS | http://localhost:5173/meeting/1
| GET    | /api/meetings             | Yes       | Get all user meetings                      | No              | PASS | http://localhost:5173/meeting/1
| GET    | /api/meetings/:id         | Yes       | Get single meeting with full details       | No              | PASS | http://localhost:5173/meeting/1
| DELETE | /api/meetings/:id         | Yes       | Delete meeting                             | No              | PASS |
| POST   | /api/meetings/:id/process | Yes       | Process meeting audio                      | Yes             | PASS |
| GET    | /api/meetings/:id/export  | Yes       | Export meeting as PDF or markdown          | No              | PASS |
| GET    | /api/search               | Yes       | Search meetings by title, summary, or date | No              | PASS |

### User Interaction Flow

| User Action                | What Happens               | API Called                   | Result                        |
| -------------------------- | -------------------------- | ---------------------------- | ----------------------------- |
| Click "Sign Up" on landing | Navigate to signup page    | None                         | Signup form displayed         | PASS | 
| Submit signup form         | Firebase creates account   | Firebase Auth                | Redirect to login             | PASS |
| Submit login form          | Firebase authenticates     | Firebase Auth                | Redirect to dashboard         | PASS |
| Click "Upload" button      | Open upload modal          | None                         | Modal visible                 | PASS |
| Submit upload form         | Send audio file to backend | POST /api/meetings           | Meeting created and displayed | PASS |
| Click meeting card         | Navigate to meeting detail | GET /api/meetings/:id        | Meeting detail page displayed | PASS |
| Click "Export" button      | Download meeting notes     | GET /api/meetings/:id/export | File downloaded               | PASS |
| Enter search query         | Filter meetings            | GET /api/search              | Search results displayed      | PASS |
| Click "Delete" button      | Remove meeting             | DELETE /api/meetings/:id     | Meeting removed from list     | PASS |

### Protected Routes

List all routes that require authentication:
- /dashboard
- /meetings/:id
- /profile

### Error Scenarios Tested

| Scenario                            | Expected Behavior         | Actual Result     |
| ----------------------------------- | ------------------------- | ----------------- |
| Login with invalid credentials      | Show error message        | ✓ Works correctly | PASS |
| Access protected route without auth | Redirect to login         | ✓ Works correctly | PASS |
| Submit form with missing fields     | Show validation errors    | ✓ Works correctly | PASS |
| Upload invalid file type            | Show error message        | ✓ Works correctly | PASS |
| Search with no results              | Show "No results" message | ✓ Works correctly | PASS | 