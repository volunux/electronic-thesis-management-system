var deleteOptionElms = document.querySelectorAll('.delete-option');
var deleteEntryStatusElms = document.querySelectorAll('.entries-delete-status');
var deleteEntriesUrl = window.location.href.split('/').slice(3 , 5);
var deleteList = [];
deleteEntriesUrl.push(...["delete" , "entries" , "many"]);
deleteEntriesUrl = deleteEntriesUrl.join('/');

if (deleteOptionElms !== null) {

  deleteOptionElms.forEach((deleteOptElem) => {

deleteOptElem.addEventListener('click' , (evt) => {

var items = document.querySelectorAll('input[name=entry-item]:checked');
var itemsParent = document.querySelector('.entries tbody');

  if (deleteEntryStatusElms !== null && items !== null) {

  if (items.length < 1) { deleteEntryStatusElmsProps(deleteEntryStatusElms , 'No entries to delete.' , 'red'); }

   else if (items.length > 0) {

    items.forEach((item) => { deleteList.push(item.value); });

    deleteEntryStatusElmsProps(deleteEntryStatusElms , 'Please wait or be patient....' , 'blue'); 
    disableElms(deleteOptionElms , true);

        var xhr = new XMLHttpRequest();
        xhr.open('POST' , "/" + deleteEntriesUrl , true);
        xhr.withCredentials = false;
        xhr.setRequestHeader('Content-Type' , 'application/json');
        var body = JSON.stringify({"entries" : deleteList });
        xhr.send(body);

        xhr.onload = function(resp) {

          disableElms(deleteOptionElms , false);

          if (resp.target.status == 200) { deleteEntryStatusElmsProps(deleteEntryStatusElms , 'Action Successful!!!' , 'green');

            items.forEach((itemElm) => {

              itemsParent.removeChild(itemElm.closest('tr')); }); }

          else if (resp.target.status == 404 || resp.target.status == 400) { deleteEntryStatusElmsProps(deleteEntryStatusElms , 'Action Unsuccessful!!!' , 'red'); }

          else { deleteEntryStatusElmsProps(deleteEntryStatusElms , 'Error has occured!!!' , 'red'); } 
        }

        xhr.onerror = function(evt) {

          disableElms(deleteOptionElms , false);
          deleteEntryStatusElmsProps(deleteEntryStatusElms , 'Error has occured!!!' , 'red'); 
        }

 }




 } });  });


}

