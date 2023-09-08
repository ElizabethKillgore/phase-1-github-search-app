document.addEventListener("DOMContentLoaded", () => {
   console.log("The DOM has loaded") 

   
    document.getElementById('github-form').addEventListener('submit', (e) => {
        e.preventDefault()
        const search = document.getElementById('search')
        console.log(search.value)
    fetch(`https://api.github.com/search/users?q=${search.value}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
        },
    
    })
        .then(res => res.json())
         .then(user => (user.items.forEach(user => renderUserInfo(user))))
    })
   function renderUserInfo(user) {
    let userInfo = document.createElement('li')
        userInfo.innerHTML = `
        <h2>${user.login}</h2>
        <img src=${user.avatar_url}>
        <a href=${user.url}>
        `
    document.getElementById('user-list').appendChild(userInfo)

    userInfo.addEventListener('click', () => {
        fetch(`https://api.github.com/users/${user.login}/repos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json" 
            }
        })
        .then(res => res.json())
         .then(data => renderUserRepo(data))
    })
    function renderUserRepo(data) {
        data.forEach(repo => {
            let userRepo = document.createElement('li')
        userRepo.innerHTML = `
        <h2>${repo.html_url}
        `
        document.getElementById('repos-list').appendChild(userRepo)
        })
        
            
        }


    }
   })




