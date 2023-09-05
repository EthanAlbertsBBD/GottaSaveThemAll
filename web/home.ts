apiTest()

function apiTest() {
    const token = localStorage.getItem("gottaSaveThemAllToken");
    const headers = {
        Authorization: "Bearer " + token,
    };
    fetch(`http://localhost:8080/api/pokemons`, {
        headers: headers
    }).then(resp => resp.json()).then(data => {
        console.log(data)
    })
}