let checks = document.querySelectorAll(".entry-check");
let deleteList = [];
let evtSet = false;
let deleteManyBtn = document.querySelectorAll(".delete-option");
let deleteEntriesUrl = window.location.href.split('/').slice(3 , 5);

function addEntryToDeleteList(entryidx) {

  entryidx = entryidx != null ? entryidx.value : "";

  if (deleteList.indexOf("" + entryidx) > -1) {

    deleteList = deleteList.filter((id) => { let finalId = id != entryidx;

      if (finalId == true) return '' + finalId;

      return false; }); }

   else { deleteList.push(entryidx); } 

   console.log(deleteList);

 }

function stopDefault(elm) {

  elm.preventDefault();
  elm.stopPropagation();
}


function entryChecker(cb) {

if (checks.length > 0) {

checks.forEach((item) => {

    item.addEventListener('click' , (evt) => {

    stopDefault(evt);

    console.log(deleteList.length);

  if (deleteList.length > 1) { 

    console.log('Hello WOrld');
    console.log(deleteList);
    console.log('Hello WOrld');


    item.style.color = 'red'; } 

  else { item.style.color = '#827f7f'; }

    let evtEl = evt.target , elm = evtEl.querySelector('span') , noInput = evtEl.querySelector('input[type=checkbox]');

    if (elm != null && elm.className.indexOf('entry-checked') > -1) { 

      elm.className = '';

    noInput.checked = false;

    if (cb != undefined) cb(noInput);

    } else if (elm != null) { elm.className = 'entry-checked';

    noInput.checked = true;

      if (evtSet == false) { evtSet = true;

            elm.addEventListener('click' , (evt) => {

              stopDefault(evt);

              noInput.checked = true;

    if (cb != undefined) cb(noInput);

              elm.className = ''; }); } 

    if (cb != undefined) cb(noInput);

          } }); }); }

}

entryChecker(addEntryToDeleteList);




deleteEntriesUrl.push(...["delete" , "entries" , "many"]);
deleteEntriesUrl = deleteEntriesUrl.join('/');

deleteManyBtn.forEach((item) => {

  item.addEventListener('click' , (evt) => {

    stopDefault(evt);

    if (deleteList.length > 0) {
  
    var entriesDeleteStatusEl = document.querySelector('.entries-delete-status');

    entriesDeleteStatusEl.textContent = "Please wait or be patient....";
    entriesDeleteStatusEl.style.color = "blue";
    entriesDeleteStatusEl.style.display = "inline-block";
    deleteManyBtn.disabled = true;



        let xhr = new XMLHttpRequest();

        xhr.open('POST' , "/" + deleteEntriesUrl , true);

        xhr.withCredentials = false;

        xhr.setRequestHeader('Content-Type' , 'application/json');

        let body = JSON.stringify({"entries" : deleteList });

        xhr.send(body);

        xhr.onload = function(resp) {

          deleteManyBtn.disabled = false;

          if (resp.target.status == 200) {

          entriesDeleteStatusEl.textContent = "Successs!!!";
          entriesDeleteStatusEl.style.color  = "green"; }

          else if (resp.target.status == 404 || resp.target.status == 400) {

          entriesDeleteStatusEl.textContent = "Failure!!!";
          entriesDeleteStatusEl.style.color  = "red"; }

          else {

          entriesDeleteStatusEl.textContent = "Error!!!";
          entriesDeleteStatusEl.style.color  = "red"; }

        }

        xhr.onerror = function(evt) {

          entriesDeleteStatusEl.disabled = false;
          entriesDeleteStatusEl.textContent = "Error!!!";
          entriesDeleteStatusEl.style.color  = "red";
        }

    } });

});