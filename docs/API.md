# Booker MVP API Summary

## Table of Contents
- [POST /auth/signup](#post-authsignup)
- [POST /auth/login](#post-authlogin)
- [POST /books/search](#post-bookssearch)
- [POST /onboard](#post-onboard)
- [POST /copy_this](#post-copy_this)

## POST /auth/signup
### Payload
```
  username: String
  email: String
  password: String
```
### -- valid response payload --
Response: 200
```
  token: String
```
### -- token payload --
```
  id: String
```
### Summary:
- Encrypt the password
- Create a new document in the `users` collection
- Generate a JWT and return it to the client
### Error handling
Response: 400

with a Returns a list of errors (only the errors that occur is in the list)
```
  errors : [
	  'Invalid Username',
	  'Invalid Email',
	  'Invalid Password',
	  'Missing Username Field',
	  'Missing Email Field',
	  'Missing Password Field',
	  'Email is already Registered',
	  'Password is already Registered'
  ]
```

[Back to Contents](#table-of-contents)

---

## POST /auth/login
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
### Summary
- Compare the passwords
- Generate a JWT and return it to the client
### Error handling
- *needs documentation*

[Back to Contents](#table-of-contents)

---

## POST /books/search
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
### Summary
- Pass the inputs to Google Books `/volumes/q={search}`
- Return a list of recognized books
- The request must contain at least one field
- Each request happens 1/3 of a second after a user stops typing
### Error Handling
- *needs documentation*

[Back to Contents](#table-of-contents)

---

## POST /onboard
### -- request payload --
```
  token: String
  books: [
    volumeId: String
    critique: String
  ]
```
### Summary
- Pass the `volumeId`s to Google Books `/volumes/volumeId`
- Create `book` documents in the `books` collection for each book entity
- Associate the user's critique with the book
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