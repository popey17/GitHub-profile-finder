$(document).ready(function () {
  $("#searchUser").on("keyup", function (e) {
    let userName = e.target.value;

    $.ajax({
      url: "https://api.github.com/users/" + userName,
      data: {
        client_id: "06be22f4c5391e6b95cd",
        client_secret: "7cc57b2aa9e976f46c43f5ce6b0f12a42e8d138b",
      },
    }).then(function (user) {
        $.ajax({
            url:"https://api.github.com/users/"+userName+"/repos",
            data: {
                client_id: "06be22f4c5391e6b95cd",
                client_secret: "7cc57b2aa9e976f46c43f5ce6b0f12a42e8d138b",
                sort: "created: asc",
                per_page: 5
              },
        }).then(function(repos){
            $.each(repos,function(index,repo){
                $('#repos').append(`
                    <div class="uk-child-width-expand@s" uk-grid>
                        <div class="uk-width-2-5">
                            <strong>${repo.name}</strong>: 
                            <div class="style="text-align:left">${repo.description}</div>
                        </div>
                        <div class="uk-width-2-5">
                            <span class="uk-label uk-label-success">Watchers: ${repo.watchers_count}</span>
                            <span class="uk-label uk-label-danger">Forks: ${repo.forks_count}</span>
                            <span class="uk-label uk-label-warning">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="uk-width-1-5">
                            <a href="${repo.html_url}" target="_blank" class="uk-button uk-button-primary">Repo Link</a>
                        </div>
                    </div>
                `);
            });
        });
      $("#profile").html(`
      <div class="uk-card">
        <div class="uk-card-header">
          <h3 class="uk-card-title">${user.name}</h3>
        </div>
        <div class="uk-card-body">
            <div class="uk-child-width-expand@s" uk-grid>
                <div class="uk-width-1-3">
                    <div>
                        <img src="${user.avatar_url}" width="200px" style="border-radius:50%; margin-bottom:20px;">
                        <a target="_blank" class="uk-button uk-button-primary" href="${user.html_url}"> View Profile</a>
                    </div>
                </div>
                <div>
                    <div>
                        <div class="uk-badge">Public Repos: ${user.public_repos}</div>
                        <div class="uk-badge">Public Gists: ${user.public_gists}</div>
                        <div class="uk-badge">Followers: ${user.followers}</div>
                        <div class="uk-badge">Following: ${user.following}</div>
                    </div>
                    <ul class="uk-list">
                        <li>Company : ${user.company}</li>
                        <li>Website/blog : ${user.blog}</li>
                        <li>Location : ${user.location}</li>
                        <li>Member Since : ${user.created_at}</li>
                    </ul>
                 </div>
            </div>   
        </div>
      </div>
      <h3 class="page-header">Latest Repo</h3>
      <div id="repos">
        
      </div>
      `);
    });
  });
});
