function stopDefault(event) {

  event.stopPropagation();
  event.preventDefault();
}

function setElementDisplay(element , display) {

	element.style.display = display;
}

function disableElement(element , isDisabled) { element.disabled = isDisabled; }

function addAndRemoveClassToElement(element , classNameToAdd , classNameToRemove) {

	var elementClassList = element.className.split(' ');

	if (elementClassList.indexOf(classNameToAdd) == -1) { element.className += ' ' + classNameToAdd; }

var elementClassToRemove = classNameToRemove;
var classToRemove = new RegExp(elementClassToRemove , 'g');

element.className = element.className.replace(classToRemove , ''); }

function setClassAndDisableElement(element , classNameToAdd , classNameToRemove , isDisabled) {

	var elementClassList = element.className.split(' ');

	if (elementClassList.indexOf(classNameToAdd) == -1) { element.className += ' ' + classNameToAdd; }

var elementClassToRemove = classNameToRemove;
var classToRemove = new RegExp(elementClassToRemove , 'g');

element.className = element.className.replace(classToRemove , '');
element.disabled = isDisabled;

} 

function onFileUploadErrorOrTimeoutOrAbort(fileUploadButton , fileUploadButtonCancel , customButtonElement) {

  setClassAndDisableElement(customButtonElement , '' , 'disabled' , false);
  setClassAndDisableElement(fileUploadButton , '' , 'disabled' , false);
  setElementDisplay(fileUploadButton , 'inline-block');
  setClassAndDisableElement(fileUploadButtonCancel , 'disabled' , '' , true);
  setElementDisplay(fileUploadButtonCancel , 'none');

}

function deleteEntryStatusElmsProps(elms , text , color) {

      elms.forEach((elem) => {

        elem.textContent = text;
        elem.style.color = color; });
}

function disableElms(elms , isDisabled) {

 elms.forEach((elem) => { elem.disabled = isDisabled; });

}


function removeFadeOut(elem , speed) {
    var seconds = speed/1000;
    
    el.style.transition = "opacity " + seconds + "s ease";
    el.style.opacity = 0;


    setTimeout(function() {

     el.parentNode.removeChild(el); } , speed);
}
