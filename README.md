# API Documentation
## Auth
<details>
    <summary><b>Login</b></summary>
    
    _ endpoint POST: /auth/login
    _ body: email, password
    _ authorization: no
</details>

<details>
    <summary><b>Logout</b></summary>
    
    _ endpoint:
    _ body:
    _ authorization:
</details>

## User
* **Get all users**
```
_ endpoint GET: /users
_ body:
_ authorization: yes
```
* **Get user by ID**
```
_ endpoint GET: /users/{user_id}
_ body:
_ authorization: yes
```
* **Create user**
```
_ endpoint POST: /users 
_ body: email, gender, name, phone_number, password, image
_ authorization: no
```
* **Update user**
```
_ endpoint PUT: 
_ body: gender, name, phone_number, image
_ authorization: yes
```

## News Feed
* **Get all news feed**
```
_ endpoint GET: 
_ body:
_ authorization: yes
```
* **Get only my news feed**
```
_ endpoint GET: 
_ body:
_ authorization: yes
```
* **Get news feed by ID**
```
_ endpoint GET: 
_ body:
_ authorization: yes
```
* **Post new news feed**
```
_ endpoint GET: 
_ body:
_ authorization: yes
```
* **Like or unlike news feed**
```
_ endpoint GET: 
_ body:
_ authorization: yes
```
* **Update news feed**
```
_ endpoint GET: 
_ body:
_ authorization: yes
```
* **Delete news feed**
```
_ endpoint GET: 
_ body:
_ authorization: yes
```