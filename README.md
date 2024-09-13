# Role-Based Authentication System
This project is a role-based authentication system with login, registration, and separate dashboard pages for students, instructors, and admins.
## Features
  * **Landing Page**: A login page for existing users and a link to the registration page for new users.
  * **Registration Page**: Allows users to register by entering their details such as name, email, password, and role (student, instructor, admin)
 * **Role-Based Dashboard**: Once logged in, users are redirected to a dashboard based on their role.

    * **Student Dashboard**: Displays features specific to students.
    * **Instructor Dashboard**: Displays features specific to instructors.
    * **Admin Dashboard**: Displays features specific to administrators.
## Technologies Used
   * **Frontend**: HTML, CSS, Angular
   * **Backend**: Node.js, Express.js
   * **Database**: MongoDB (using Mongoose)
   * **Authentication**: JWT (JSON Web Token)

## Installation
  **1.Clone the repository:**
  ```sh
      $ git clone https://github.com/your-repo-url.git

   ``` 
   **2.Switch Branch:**
```bash
   $ git checkout Branch Name
 ```
 **3.Install dependencies:**
 ```sh
      $ sudo npm install
``` 
 **3.Run the server:**

```sh
       $ ng serve
   ```
    
## User Flow
**1.Login/Registration:**

* When a user visits the application, they are shown the login page.
* If they don’t have an account, they can click on the link to go to the registration page.
**2.Role-Based Dashboard:**

* Upon successful login, the user is authenticated, and their role is verified.
* Based on the role (student, instructor, admin), they are redirected to the corresponding dashboard.

**3.Protected Routes:**

* The dashboard routes are protected by authentication middleware to ensure only authenticated users can access them.

## How it works
**1.Login Page:**

* Users enter their email and password to log in.
* The backend verifies credentials and returns a JWT token.
**2.Registration Page:**

* Users can register by providing their name, email, password, and selecting a role (student, instructor, or admin).
**3.Middleware:**

* authMiddleware.js checks the user’s token, verifies it, and passes the user role to the controller to show the appropriate dashboard.

**4.Role-Based Dashboards:**

* Once authenticated, users are redirected to a dashboard based on their role:
   * Student Dashboard: Shows options related to student activities.
   * Instructor Dashboard: Shows options for instructors to manage their classes.
   * Admin Dashboard: Shows admin functionalities like user management.