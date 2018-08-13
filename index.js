var displaySearchResult = (r) => {
  return `<div>
            <h3><strong> ${r.name} </strong> - ${r.description}</h3>
            <a href="#" ${r.html_url}>${r.html_url}</a><br>
            <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}"onclick="showCommits(this)">Get Commits</a>
            <p>Owner: <a href = "#" ${r.owner.login}>${r.owner.login}</a></p>
            <img src="${r.owner.avatar_url}">
          </div>
          <hr>`
}

var displayError = () => {
  $("#errors").html("There has been an error")
}

function displayCommits(resp) {
  return `<div>
            <p>SHA: ${resp.sha}</p>
            <p>Author: ${resp.commit.author.name}</p>
            <p>Author Login: ${resp.author.login}</p>
            <img src="${resp.author.avatar_url}"
            `
}

function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    const repoResults = `${response.items.map(r => displaySearchResult(r)).join('')}`
    $("#results").html(repoResults)
  }).fail(error =>{ displayError()

  })
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response) {
    const commitResults = `${response.map(commit => displayCommits(commit)).join('')}`
    $("#details").html(commitResults)
  })

}

$(document).ready(function (){
});
