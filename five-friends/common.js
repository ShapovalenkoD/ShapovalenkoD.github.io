document.addEventListener("DOMContentLoaded", function(){
    VK.init({
        apiId: 6241110
    });

    const vk_auth = document.getElementById('vk_auth'),
          refreshFriends = document.getElementById('btn'),
          topCaption = document.getElementById('name');

    VK.Auth.getLoginStatus( response => {
        if (response.status === "connected") {
            vk_auth.style.display = "none";
            seeFriends();
            userName();
        } else {
            refreshFriends.style.display = "none";
            topCaption.innerHTML = 'Пожалуйста авторизируетесь'
        }
    });

    vk_auth.addEventListener('click', () => {
        VK.Auth.login((response) => {
            if (response.session) {
                vk_auth.style.display = "none";
                refreshFriends.style.display = "inline-block";
                seeFriends();
                userName();
            } else {
                topCaption.innerHTML = 'Вы не авторизированы'
            }
        });
    });

    function userName() {
        VK.api("users.get", {"user_ids": ''}, data => {
            const value = data.response[0];
            topCaption.innerHTML = `${value.first_name} ${value.last_name}`
        });
    }

    refreshFriends.addEventListener('click', () => seeFriends());

    function seeFriends() {
        let li = '';
        VK.api("friends.get",
            {   "order": "random",
                "count": "5",
                "fields": "nickname, photo_100"
            },
            function (data) {
                data.response.map(x => {
                    li += `<li>
                           <img src="${x.photo_100}"></img>
                           <p>
                             id: ${x.uid}
                             <a target="_blank" href="https://vk.com/id${x.uid}">
                               ${x.first_name}
                               ${x.last_name}
                             </a>
                           </p>
                           </li>`
            });
            document.getElementById('root').innerHTML = li
        });
    }
});