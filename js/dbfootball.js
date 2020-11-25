var elTimFavorit = () => {
    var teams = getTimfav()
  
    teams.then(data => {
      dataTim = data;
      var html = ' '
      html += '<div class="row">'
      data.forEach(tim => {
        html += `
        <div class="col s12 m6 l6">
          <div class="card">
            <div class="card-content">
              <div class="center"><img width="64" height="64" src="${tim.crestUrl.replace(/^http:\/\//i, 'https://') || 'img/empty_badge.svg'}"></div>
              <div class="center flow-text">${tim.name}</div>
              <div class="center">${tim.area.name}</div>
            </div>
            <div class="card-action right-align">
                <a class="waves-effect waves-light btn-small red" onclick="deleteTeamListener(${tim.id})">HAPUS DARI FAVORIT</a>
            </div>
          </div>
        </div>
      `
      })
  
      if(data.length == 0) html += '<h6 class="Kamu tidak memiliki tim favorit!</6>'
  
      html += "</div>"
      let doc = document.getElementById('main-content');
      doc.innerHTML = html;
    })
  }
  
  // database operations
  var dbx = idb.open('sepakbola', 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore('tim', { 'keyPath': 'id' })
    }
  });
  
  
  
  var insertTeam = (tim) => {
    dbx.then(db => {
      var tx = db.transaction('tim', 'readwrite');
      var store = tx.objectStore('tim')
      tim.createdAt = new Date().getTime()
      store.put(tim)
      return tx.complete;
    }).then(() => {
      M.toast({ html: `${tim.name} berhasil disimpan!` })
      console.log('Pertandingan berhasil disimpan');
    }).catch(err => {
      console.error('Pertandingan gagal disimpan', err);
    });
  }
  
  var deleteTeam = (idTim) => {
    dbx.then(db => {
      var tx = db.transaction('tim', 'readwrite');
      var store = tx.objectStore('tim');
      store.delete(idTim);
      return tx.complete;
    }).then(() => {
      M.toast({ html: 'Tim Sudah Di Hapus!' });
      elTimFavorit();
    }).catch(err => {
      console.error('Error: ', err);
    });
  }
  
  var getTimfav = () => {
    return dbx.then(db => {
      var tx = db.transaction('tim', 'readonly');
      var store = tx.objectStore('tim');
      return store.getAll();
    })
  }
  
  
  
  var insertTeamListener = idTim => {
    var tim = dataTim.teams.filter(el => el.id == idTim)[0]
    insertTeam(tim);
  }
  
  var deleteTeamListener = idTim => {
    var c = confirm("Yakin Hapus Tim Ini dari Favorit?")
    if (c == true) {
      deleteTeam(idTim);
    }
  }