# API Documentation
## Auth
<details>
    <summary>Login</summary>
    
    _ endpoint POST: /auth/login
    _ authorization: NO
    _ body: email, password
    _ param:
</details>

<details>
    <summary>Logout</summary>
    
    _ endpoint:
    _ authorization:
    _ body:
    _ param:
</details>

## User
<details>
    <summary>Get All Users</summary>
    
    _ endpoint GET: /users
    _ authorization: YES
    _ body:
    _ param:
</details>

<details>
    <summary>Get User By ID</summary>
    
    _ endpoint GET: /users/{user_id}
    _ authorization: YES
    _ body:
    _ param:
</details>

<details>
    <summary>Create User</summary>
    
    _ endpoint POST: /users
    _ authorization: NO
    _ body: email, gender, name, phone_number, password, image
    _ param:
</details>

<details>
    <summary>Update User</summary>
    
    _ endpoint PUT: /users
    _ authorization: YES
    _ body: gender, name, phone_number, image
    _ param:
</details>

## News Feed
<details>
    <summary>Get All News Feed</summary>
    
    _ endpoint GET: /news_feed
    _ authorization: YES
    _ body:
    _ param:
</details>

<details>
    <summary>Get Only My News Feed</summary>
    
    * endpoint GET: /news_feed/mine
    * authorization: YES
    * body:
    * param:
</details>

<details>
    <summary>Get News Feed By ID</summary>
    
    * endpoint GET: /news_feed/{news_feed_id}
    * authorization: YES
    * body:
    * param:
</details>

<details>
    <summary>Post News Feed</summary>
    
    * endpoint POST: /news_feed
    * authorization: YES
    * body: content
    * param:
</details>

<details>
    <summary>Like Or Unlike News Feed</summary>
    
    * endpoint POST: /news_feed/like_or_unlike/{news_feed_id}
    * authorization: YES
    * body:
    * param:
</details>

<details>
    <summary>Update News Feed</summary>
    
    * endpoint PUT: /news_feed
    * authorization: YES
    * body: feed_id, content
    * param:
</details>

<details>
    <summary>Delete News Feed</summary>
    
    * endpoint DELETE: /news_feed/{news_feed_id}
    * authorization: YES
    * body:
    * param:
</details>