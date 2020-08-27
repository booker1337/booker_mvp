# Booker MVP API Summary

## Note:
These routes are relative to `/api`, so if you're looking at `/auth/signup`, the real route is `/api/auth/signup`

## Table of Contents
- [/Auth](#auth)
  - [GET /auth](#get-auth)
  - [POST /auth/signup](#post-authsignup)
  - [POST /auth/login](#post-authlogin)
- [/User](#user)
  - [GET /user/:id](#get-userid)
  - [GET /user/profile]()
- [/Valid](#verification)
  - [GET /valid/isUsernamePresent/:username](#get-isusernamepresent)
  - [GET /valid/isEmailPresent/:email](#get-isemailpresent)
- [/Books](#books)
  - [POST /books/search](#post-bookssearch)
- [POST /onboard](#post-onboard)
- [POST /copy_this](#post-copy_this)

# /Status

## GET /status
Will return a 200 status code & json if the server is online
Response: `200`
```
  status: 200
```

## HEAD /status
Will return a 200 status code
Response: `200`

# /Auth

## GET /auth

~ Work in Progress ~
Will be used to just test JWT Authorization of routes

### Headers
```
 Authentication: Bearer <Token>
```

### -- valid response payload --
Response: `200`
```
  < User Object >
```

### Summary:
- For testing JWT Authentication, and getting the appropriate user data of the id inside the token
- 
### Error handling
- WIP

[Back to Contents](#table-of-contents)


## POST /auth/signup

### Summary:
- Encrypt the password
- Makes username lowercase with first letter capitalized
- Ensures unique email/username
- Create a new document in the `users` collection
- Generate a JWT and return it to the client

### Payload
```
  email: String
  username: String
  password: String
```

### -- valid response payload --
Response: `200`
```
  id: String
  token: String
  username: String
```

### -- token payload --
```
  id: String
```

### Error handling
Response: `400`

with a Returns a list of errors (only the errors that occur is in the list)
```
  errors : [
	  { 'username', 'Invalid Username' },
	  { 'email',    'Invalid Email' },
	  { 'password', 'Invalid Password' },
	  { 'username', 'Missing Username Field' },
	  { 'email',    'Missing Email Field' },
	  { 'password', 'Missing Password Field' },
	  { 'email',    'Email is already Registered' },
	  { 'username', 'Username is already Registered' }
  ]
```

[Back to Contents](#table-of-contents)

---

## POST /auth/login

**Warning** - This route hasn't been tested fully yet! Look out for bugs, and if you find any, look at the source code.

### Summary
- Authenticate user via finding username/email then comparing the password
- Generate a JWT and return it to the client for authorization

### -- request payload --
```
  loginId: String
  password: String
```
### -- response payload --
```
  token: String
```
### -- token payload --
```
  username: String
```

### Error handling
Response: `401`
```
  errors: [
    { 'loginId' : 'Invalid Username' }
    { 'loginId': 'Invalid Email' }
    { 'password': 'Invalid Password' }
  ]
```

Invalid Username/Email depends on whether it contains a @ or not


[Back to Contents](#table-of-contents)

# /User

## GET /user/:id

WIP

### Summary
- Retrieves user object from database which has the ID of `/:id`

### -- request headers --
```
  Authentication: Bearer <Token>
```

### -- request params --
```
  /user/<INSERT ID HERE>
```
### -- response payload --
Response Status: `200`
```
  username: String
  email: String
  verified: Boolean
```

### Error Handling
Response Status: `400`
```
  errors: [
    'error': 'User not Found'
  ]
```

[Back to Contents](#table-of-contents)

## GET /user/profile/:username

Get the user matching the username

### -- request params --
```
  /user/profile/:username
```

### -- response payload --
Response Status: `200`
```
  User Object
```

### Summary
- Retrieves user object from database which has the ID of `/:id`

### Error Handling
Response Status: `404`
```
  errors: [
    { 'username': 'No match was found' }
  ]
```

[Back to Contents](#table-of-contents)


# /Valid

## GET /isUsernamePresent
### Summary
- Checks if the username is present
### -- request payload --
```
  username: String
```
### -- response payload --
Response Status: 200
```
  present: Boolean
```

### Error Handling
No Errors

[Back to Contents](#table-of-contents)

## GET /isEmailPresent

### Summary
- Checks if the email is present

### -- request payload --
```
  email: String
```
### -- response payload --
Response Status: 200
```
  present: Boolean
```

### Error Handling
No errors

[Back to Contents](#table-of-contents)

# /Books

## POST /books/search

### Summary
- Pass the inputs to Google Books `/volumes/q={search}`
- Return a list of recognized books
- The request must contain at least one field
- Each request happens 1/3 of a second after a user stops typing

### -- request payload --
```
  inAuthor?: String
  inTitle?: String
  subject?: String
  isbn?: String
```
### -- response payload --
```
  books: [
    thumbnail: String
    title: String
    author: String
    volumeId: String
  ]
```

### Error Handling
- *needs documentation*

[Back to Contents](#table-of-contents)

---

## POST /onboard

### Summary
- Pass the `volumeId`s to Google Books `/volumes/volumeId`
- Create `book` documents in the `books` collection for each book entity
- Associate the user's critique with the book

### -- request payload --
```
  token: String
  books: [
    volumeId: String
    critique: String
  ]
```

### Error Handling
- *needs documentation*

[Back to Contents](#table-of-contents)

---

## POST /copy_this
### -- request payload --
```
```
### -- response payload --
```
```
### Summary
- *needs documentation*
### Error Handling
- *needs documentation*

[Back to Contents](#table-of-contents)