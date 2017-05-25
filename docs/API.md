**Register user**
----
  Registers new user to database

* **URL**

  /api/users/register

* **Method:**

  `POST`
  
* **URL Params**

  None

* **Data Params**

  `user = {username: username, email: email, name: name, password: password}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success : true, msg: msg}`
 
* **Error Response:**

  * **Code:** 200 <br />
    **Content:** `{ success : false, msg: msg, err: err }`



**Login user**
----
  Logins user to app, returns JSON Web token

* **URL**

  /api/users/login

* **Method:**

  `POST`
  
* **URL Params**

  None

* **Data Params**

  `user = {username: username, password: password}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success : true, token: JWT, msg: msg}`
 
* **Error Response:**

  * **Code:** 200 <br />
    **Content:** `{ success : false, msg: msg }`


**Validate user**
----
  When user navigates to view which requires user to be logged in, user is always validated in server

* **URL**

  /api/users/validate

* **Method:**

  `GET`
  
* **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ valid : true}`
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `Unauthorized`

