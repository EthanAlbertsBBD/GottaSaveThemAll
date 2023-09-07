apiTest()

function apiTest() {
    const token = localStorage.getItem("gottaSaveThemAllToken");
    const headers = {
        Authorization: "Bearer " + token,
    };
    fetch(`https://qf78x42ctm.eu-west-1.awsapprunner.com/api/pokemons`, {
        headers: headers
    }).then(resp => resp.json()).then(data => {
        console.log(data)
    })
}