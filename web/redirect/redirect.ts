const cognitoDomain = "https://gotta-save-them-all.auth.eu-west-1.amazoncognito.com";
const clientID = "6rlqcs6d04lfm8h8kf6q7438ne";
const redirectUri = "https://qf78x42ctm.eu-west-1.awsapprunner.com/redirect";

var urlParams = new URLSearchParams(window.location.search);
var code = urlParams.get('code');

exchangeCodeForTokens()

async function exchangeCodeForTokens() {
    if (code) {
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("client_id", clientID);
        data.append("code", code);
        data.append("redirect_uri", redirectUri);
    
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
        window.location.href = "https://qf78x42ctm.eu-west-1.awsapprunner.com/home"
    }
}