const BASE_URL = "https://api.football-data.org/v2/";
const API_TOKEN = "c9c5156acca4420da5eeb4383148da82";
const ID_LIGA = 2021;
let klasement = `${BASE_URL}competitions/${ID_LIGA}/standings`;
let tim = `${BASE_URL}competitions/${ID_LIGA}/teams`;
let detail_tim = `${BASE_URL}teams/`;

const fetchAPI = url => {
    return fetch(url, {
        headers:{
            'X-Auth-Token' : API_TOKEN
        }
    })

    .then(res => {
        if(res.status !== 200){
            console.log(`Error :${res.status}`);
            return Promise.reject(new Error(res.statusText))
        }else{
            return Promise.resolve(res);
            
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.log(err);
    })
};

getTeams = () => {
    fetchAPI(tim)
        .then(data => {
            showTeams(data);
        })
        .catch(error => {
          if ("caches" in window) {
            caches.match(tim).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        showTeams(data);
                    })
                }
            })
        }else{
          console.log(error)
        }
        })
}

showTeams = (data) => {
    dataTim = data;
    let tims = "";
    data.teams.forEach(function (tim) {
        tims += `
        
        <div class="col s12 m4 l4" >
        <div class="card" >
          <a href="./detailTeam.html?id=${tim.id}">
            <div class="card-content">
              <div class="center"><img width="64" alt="Logo Club ${tim.name}" height="64" src="${tim.crestUrl.replace(/^http:\/\//i, 'https://')}" onError="this.onerror=null;this.src='./assets/premiere.png';"></div>
              <div class="center">${tim.name}</div>
              <div class="center">${tim.area.name}</div>
            </div>
          </a>
          <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small" style="font-size:13px" onclick="insertTeamListener(${tim.id}); this.onclick=null;">Tambah Favorit
              </a>
          </div>
        </div>
      </div>
        `;
    });
    document.getElementById("main-content").innerHTML = tims;
}

getTeamId = () => {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let detailHTML = '';
    if ("caches" in window) {
        caches.match(detail_tim + idParam).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                  detailHTML = `
                  <div class="row mt70" style="background-color:#1e5f74;">
                      <div class="col s12 m6 l6 pt50">
                        <h2 class="white-text center-align">${data.name}</h2>
                        <h4 class="white-text center-align">since ${data.founded}</h4>
                      </div>
                      <div class="col s12 m6 pl20 pt20 pb20">
                        <img
                          src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}"
                          class="responsive-img center"
                          width="280px"
                          alt="Club ${data.name}"
                          onError="this.onerror=null;this.src='./assets/premiere.png';"
                        />
                      </div>
                  </div>
                  <div class="row mt50 ml80" style="margin-left: 37px">
                    <div class="col s12 m6 l4" id="card">
                      <div class="card cards pb10 pl10">
                        <div class="card-image mt20 left">
                          <img src="../assets/icon/browser.svg" style="width:60px" />
                        </div>
                        <div class="card-content mt10 left">
                          <p>${data.website}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4" id="card">
                      <div class="card cards pb10 pl10">
                        <div class="card-image mt20 left">
                          <img src="../assets/icon/email.svg" style="width:60px" />
                        </div>
                        <div class="card-content mt10 left">
                          <p>${data.email}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4" id="card">
                      <div class="card cards pb10 pl10">
                        <div class="card-image mt20 left">
                          <img src="../assets/icon/stadium.svg" style="width:60px"/>
                        </div>
                        <div class="card-content mt10 left">
                          <p class="">${data.venue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                    document.getElementById("detail-content").innerHTML = detailHTML;
                    resolve(data);
                });
            }
        });
    }

    fetchAPI(detail_tim + idParam)
        .then(status)
        .then(JSON)
        .then(function (data) {
            dataTeamJSON = data;
            detailHTML = `
                  <div class="row mt70" style="background-color:#1e5f74;">
                      <div class="col s12 m6 l6 pt50">
                        <h2 class="white-text center-align">${data.name}</h2>
                        <h4 class="white-text center-align">since ${data.founded}</h4>
                      </div>
                      <div class="col s12 m6 pl20 pt20 pb20">
                        <img
                          src="${data.crestUrl}"
                          class="responsive-img center"
                          width="280px"
                          alt=""
                        />
                      </div>
                  </div>
                  <div class="row mt50" id="dataKlub" style="margin-left: 20px">
                    <div class="col s12 m6 l4" >
                      <div class="card cards pb10 pl10 ml30" >
                        <div class="card-image mt20 left">
                          <img src="../assets/icon/browser.svg" style="width:60px" />
                        </div>
                        <div class="card-content mt10 left">
                          <p>${data.website}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4" >
                      <div class="card cards pb10 pl10 ml30">
                        <div class="card-image mt20 left">
                          <img src="../assets/icon/email.svg" style="width:60px" />
                        </div>
                        <div class="card-content mt10 left">
                          <p>${data.email}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4">
                      <div class="card cards pb10 pl10 ml30">
                        <div class="card-image mt20 left">
                          <img src="../assets/icon/stadium.svg" style="width:60px"/>
                        </div>
                        <div class="card-content mt10 left">
                          <p class="">${data.venue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                `;

            document.getElementById("detail-content").innerHTML = detailHTML;
            resolve(data);
        });
});  
  
}

getSquad = () => {
  return new Promise(function (resolve, reject) {
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get("id");
      let dataSquadHTML = ''
      let tableSquadHTML = ''
      if ("caches" in window) {
          caches.match(detail_tim+ idParam).then(function (response) {
              if (response) {
                  response.json().then(function (data) {
                      data.squad.forEach(function (squad, i) {
                          dataSquadJSON = squad;
                          dataSquadHTML += `
                          <tr>
                              <td>${i+1}. </td>
                              <td style="color:#fff;">${squad.name}</</td>
                              <td style="color:#fff;">${squad.position}</td>
                          </tr>`
                      });
                      tableSquadHTML += `
                      <div class="row">
                        <div class="col lg12 s12 m12>
                          <table style="margin-left:10px; margin-right:10px;"><tbody> ${dataSquadHTML}  </tbody></table>
                         </div>
                      </div> 
                        `
                      document.getElementById("squad").innerHTML = tableSquadHTML;
                      resolve(data);
                  });
              }
          });
      }

      fetchAPI(detail_tim + idParam)
          .then(status)
          .then(JSON)
          .then(function (data) {
              data.squad.forEach(function (squad, i) {
                  dataSquadJSON = squad;
                  dataSquadHTML += `
                  <tr>
                      <td>${i+1}. </td>
                      <td>${squad.name}</td>
                      <td>${squad.position}</td>
                  </tr>`
              });
              tableSquadHTML += `
              <table class="squadTable mt40 mb30 responsive-table">
                  <thead>
                      
                      <tr>
                          <th id="head">No</th>
                          <th id="head">Name</th>
                          <th id="head">Position</th>
                      </tr>
                  </thead>
                  <tbody> ${dataSquadHTML}  </tbody>
              </table>`

              document.getElementById("squad").innerHTML = tableSquadHTML;
              resolve(data);
          })
  });
}

getKlasement = () => {
  if ('caches' in window) {
    caches.match(klasement).then(function (response) {
        if (response) {
            response.json().then(function (data) {
                klasementResult(data);
            });
        }
    });
}

fetchAPI(klasement)
    .then(status)
    .then(JSON)
    .then(function (data) {
      klasementResult(data);
    })
}

klasementResult = (data) => {
  let standings = "";
  let standingElement =  document.getElementById("klasemen-content");

  data.standings[0].table.forEach(function (standing) {
      standings += `
              <tr>
                  <td>${standing.position}</td>
                  <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                  <td>${standing.team.name}</td>
                  <td>${standing.won}</td>
                  <td>${standing.draw}</td>
                  <td>${standing.lost}</td>
                  <td>${standing.points}</td>
                  <td>${standing.goalsFor}</td>
                  <td>${standing.goalsAgainst}</td>
                  <td>${standing.goalDifference}</td>
              </tr>
      `;
  });

  standingElement.innerHTML = `
              <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
              <table class="striped responsive-table">
                  <thead>
                      <tr>
                          <th>No</th>
                          <th></th>
                          <th>Team Name</th>
                          <th>W</th>
                          <th>D</th>
                          <th>L</th>
                          <th>P</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                      </tr>
                   </thead>
                  <tbody id="standings">
                      ${standings}
                  </tbody>
              </table>
              
              </div>
  `;
}

