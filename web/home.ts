const cognitoDomain = "https://gotta-save-them-all.auth.us-east-1.amazoncognito.com";
const clientID = "351ntcgkgo32jeh3vqrbblb6i0";
const clientSecret = "g3oll68h113i9f3uj77k3hmb0fnb59vj5g9o2p9v7ng44u2689";
const base64Credentials = btoa(`${clientID}:${clientSecret}`);
const basicAuthorization = `Basic ${base64Credentials}`;

var urlParams = new URLSearchParams(window.location.search);
var code = urlParams.get('code');

if (code) {
    exchangeCodeForTokens(code);

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

function exchangeCodeForTokens(code: string) {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": basicAuthorization,
    };

    const data = new URLSearchParams();
    data.append("grant_type", "authorization_code");
    data.append("client_id", clientID);
    data.append("code", code);
    data.append("redirect_uri", "http://localhost:8080/");

    fetch(`${cognitoDomain}/oauth2/token?${data.toString()}`, {
        method: 'POST',
        headers: headers,
    }).then((res) => {
        if (res.status != 200) return;
        const response = new Response(res.body);
        response.json().then((data) => {
            localStorage.setItem('gottaSaveThemAllToken', data.access_token);
            localStorage.setItem('gottaSaveThemAllRefreshToken', data.refresh_token);
        })
    })
}  