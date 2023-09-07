import fs from 'fs';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import path from 'path';

function getUserInfoExample(token) {
    const userInfoHeaders = {
        Authorization: "Bearer " + token,
    };

    fetch(`${cognitoDomain}/oauth2/userInfo`, {
        headers: userInfoHeaders
    }).then((userInfo) => {
        if (userInfo.status != 200) return;
        const response = new Response(userInfo.body);
        response.json().then((data) => {
            console.log(data.username);
            console.log(data.email);
        })
    })
}

function auth(req, res, next) {

    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!req.path.includes('/api')) {
      return next();
    }
  
    if (!authHeader) {
        return res.status(401).json([]);
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
        var jwk = fs.readFileSync(path.resolve(__dirname, "jwks.json"))
        jwk = JSON.parse(jwk.toString());
        const pem = jwkToPem(jwk.keys[1]);
        const decode = jwt.verify(token, pem);
        res.locals.username = decode.username
    } catch (error) {
        console.log(error)
        return res.status(401).json([])
        
    }
  
    return next();
  }
  
  export default (auth)
