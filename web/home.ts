const cognitoDomain = "https://gotta-save-them-all-login.auth.us-east-1.amazoncognito.com";
const clientID = "5uc5eknh95m4golenj8208sueo";

var urlParams = new URLSearchParams(window.location.search);
var code = urlParams.get('code');

exchangeCodeForTokens()
getUserInfoExample()

async function exchangeCodeForTokens() {
    if (code) {
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            // "Authorization": basicAuthorization,
        };
    
        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("client_id", clientID);
        data.append("code", code);
        data.append("redirect_uri", "http://localhost:8080/");
    
        const response = await fetch(`${cognitoDomain}/oauth2/token?${data.toString()}`, {
            method: 'POST',
            headers: headers,
        });
       
        if (response.status != 200) return;
        const body = new Response(response.body);
        body.json().then((data) => {
            localStorage.setItem('gottaSaveThemAllToken', data.access_token);
            localStorage.setItem('gottaSaveThemAllRefreshToken', data.refresh_token);
        })
    }
}

function getUserInfoExample() {
    const token = localStorage.getItem("gottaSaveThemAllToken");
    if (token) {
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
}