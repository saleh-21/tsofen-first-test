const root = document.getElementById('root');

fetch('/login')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data.user[0])
        const user = data.user[0]
        root.innerHTML = `<h1>LOGIN</h1>
    <img id="loginImage"src="${user.image}" alt="">
    <h2 id = "loginName">${user.name}</h2>
    <button id="login" onclick="login(event)">LOGIN</button>
    `
    })

function login(event) {
    fetch('/homePage', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(data => {
            const user = data.user[0]
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            render(user);
            // root.innerHTML = ` 
            // <div id='left'></div>

            // <div id='middle'>
            //     <div id='newPost'>
            //         <img src="${user.image}" alt="" id='homeImage'>
            //         <h3>${user.name}</h3>
            //         <input type="text" id = 'homePost' placeholder = 'New Post'>
            //         <button id='homePostButton' onclick="post(event)">POST</button>
            //     </div>
            //     <div id = 'feed'>FEED</div>
            // </div>

            // <div id='right'></div>
            // `
        })
}

function post(event) {
    const text = document.getElementById('homePost').value
    fetch('/newpost', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(data => {
            const user = data.user[0]
            render(user)
        })
}



function render(user) {
    const root = document.getElementById('root');
    root.innerHTML = ` 
    <div class='container'>
    <div id='left' class='left'>
        <img src="images/icon1.png" alt="">
        <img src="images/icon2.png" alt="">
        <img src="images/icon3.png" alt="">
        <img src="images/icon4.png" alt="">
    </div>

    <div id='middle' class='mainCol'>
        <div id='newPost'>
            <img src="${user.image}" alt="" id='homeImage'>
            <h3>${user.name}</h3>
            <input type="text" id='homePost' placeholder='New Post'>
            <button id='homePostButton' onclick="post(event)">POST</button>
        </div>
        <div id='feed'>FEED</div>
    </div>

    <div id='right'>RIGHT</div>
</div>
<div id='right' class="right">
    <h2>TRINDS FOR YOU</h2>
    <div>
        <h4>Trinding In Israel: </h4>
        <h5> amit segel</h5>
    </div>

    <div>
        <h4>Trinding In Israel: </h4>
        <h5>750 NIS</h5>
    </div>
</div>
            `
    
    let userPosts = '';
    const posts = user.posts
    posts.forEach(element => {
        userPosts += `<h3>${element}</h3> <br>`
    });
    const feed = document.getElementById('feed')
    feed.innerHTML = userPosts;

}