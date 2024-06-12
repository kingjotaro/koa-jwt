
# JWT Authentication with Koa


To install the dependencies and run the server, you can use the following commands:

```bash
npm install
node index.js
```
Using the Scripts
Generating JWT Token
To generate a JWT token, execute the following script:

```bash

./login.sh
```
This script logs in and obtains a JWT token.

Accessing the Protected Route
To access the protected route with a specific JWT token, use the following script, replacing <TOKEN_JWT> with your own JWT token obtained after logging in:

```bash

./protegido.sh <TOKEN_JWT>
```