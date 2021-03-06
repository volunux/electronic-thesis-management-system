var $$fileObjects = [{	'key' : '' , 'photo' : { 'url' : '' , 'size' : false , 'type' : false } } , {	'key' : '' , 'photo' : { 'url' : '' , 'size' : false , 'type' : false } } ,

{	'key' : '' , 'photo' : { 'url' : '' , 'size' : false , 'type' : false } } , {	'key' : '' , 'photo' : { 'url' : '' , 'size' : false , 'type' : false } }];

var countFiles = 4;

var optProperties = ['elem' , 'group' , 'add' , 'del' , 'can' , 'progress' , 'uploadError' , 'uploadError1' , 'text' , 'message' , 'percent'];

function createFileGroup(opt) {

	var $fileCreatedObject = {};

	if (opt.length) {

		for (var i = 0; i < opt.length; i++) {

				$fileCreatedObject[optProperties[i]] = opt[i];		}		}

	return $fileCreatedObject;
}

var $file1 = createFileGroup(['photo-1' , 'file-upload-1' , 'btn-add-file-1' , 'btn-del-file-1' ,

								'btn-can-file-1' , 'file-upload-progress-1' , 'file-upload-error-1' , 'file-upload-error-11' ,

								'file-upload-text-1' , 'file-upload-message-1' , 'file-percent-1']);


var $file2 = createFileGroup(['photo-2' , 'file-upload-2' , 'btn-add-file-2' , 'btn-del-file-2' ,

								'btn-can-file-2' , 'file-upload-progress-2' , 'file-upload-error-2' , 'file-upload-error-22' ,

								'file-upload-text-2' , 'file-upload-message-2' , 'file-percent-2']);

var $file3 = createFileGroup(['photo-3' , 'file-upload-3' , 'btn-add-file-3' , 'btn-del-file-3' ,

								'btn-can-file-3' , 'file-upload-progress-3' , 'file-upload-error-3' , 'file-upload-error-33' ,

								'file-upload-text-3' , 'file-upload-message-3' , 'file-percent-3']);


var $file4 = createFileGroup(['photo-4' , 'file-upload-4' , 'btn-add-file-4' , 'btn-del-file-4' ,

								'btn-can-file-4' , 'file-upload-progress-4' , 'file-upload-error-4' , 'file-upload-error-44' ,

								'file-upload-text-4' , 'file-upload-message-4' , 'file-percent-4']);


var $elementReferences = [$file1.elem , $file2.elem , $file3.elem , $file4.elem];

var $rmethod = document.getElementById('rmethod').value;

var $uaddress = document.getElementById('ulink').value;

var objectKey = '';

var $fileSize = 500 * 1024;

var ajaxCall = '';

var $formProcess = document.getElementById('form-btn-submit');

var $body = '' , $data = {};

if (window.attachEvent) { 

		window.attachEvent('onload' , function () {

							$pageLoad($file1 , $$fileObjects[0]);
							$pageLoad($file2 , $$fileObjects[1]);	
							$pageLoad($file3 , $$fileObjects[2]);
							$pageLoad($file4 , $$fileObjects[3]);		}); }

else if (window.addEventListener) {

		window.addEventListener('load' , function () {

							$pageLoad($file1 , $$fileObjects[0]);
							$pageLoad($file2 , $$fileObjects[1]);	
							$pageLoad($file3 , $$fileObjects[2]);
							$pageLoad($file4 , $$fileObjects[3]);		} , false);	}

else {

	document.addEventListener('load' , function () {

							$pageLoad($file1 , $$fileObjects[0]);
							$pageLoad($file2 , $$fileObjects[1]);	
							$pageLoad($file3 , $$fileObjects[2]);
							$pageLoad($file4 , $$fileObjects[3]);		} , false);}


function $pageLoad(opts , $$file) { 

	var $uploadBtn = document.getElementById(opts.add) , $removeBtn = document.getElementById(opts.del) , $inputFile = document.getElementById(opts.elem) , parentt = $inputFile.parentNode;

	var $btnElement = document.createElement('button');

	$showButton(opts.add , 'block');

	$showButton(opts.elem , 'block');

	$btnElement.className ='btn-upload';

	$btnElement.textContent = 'Choose a File';
	
	parentt.insertBefore($btnElement , $inputFile.nextSibling);

	$inputFile.style.display = 'none';

	$btnElement.addEventListener('click' , function(e) {

			$clearEvent(e);

			$inputFile.click();
	});

	$formPost(opts.add);

	$inputFile.onchange = function(e) {

		var $el = e.target.files[0];

			$checkImageSize($el , opts , $$file , $btnElement);

			$checkImageType($el , opts , $$file , $btnElement);

			$validateSignature($el , opts , $$file , $btnElement);	};

	$uploadBtn.onclick = function(e) {

			$clearEvent(e);

			$clearText([opts.message , opts.uploadError , opts.uploadError1 , opts.progress]);

			var data = { 'photo' : document.getElementById(opts.elem).files[0] }

		if (!data.photo) { $setText(opts.uploadError , 'Photo should be provided and cannot be empty.' , 'block');
	
				return false;	}

var $getHash = new XMLHttpRequest();

$getHash.open('POST' , '/api/o/sign/photo/' + data.photo.name + '/');

$getHash.setRequestHeader('Content-Type' , 'application/json;charset=UTF-8');

$getHash.onload = function(res) { var signedRes = res.target.responseText; $$file.key = JSON.parse(signedRes).data.fields.key;

		if (res.target.status == 200) {

		$setElement(opts.elem , true);

		$setButton(opts.add , true , 'disabled' , 'btn-options');

		$showButton(opts.can , 'block');

		$setText(opts.message , 'Photo is uploading. Please be patient and wait. % uploaded : ' , 'inline-block' );

		return $uploadImage(JSON.parse(signedRes) , data , opts , $$file);	}

		$clearText([opts.message , opts.uploadError , opts.uploadError1 , opts.progress]);

		$setText(opts.uploadError , 'Error has occured. Please try again.' , 'block');
}		

var $photoInfo = { 'filename' : data.photo.name , 'contentType' : data.photo.type	};

$photoInfo = JSON.stringify($photoInfo);

$getHash.send($photoInfo);

};		

	$removeBtn.onclick = function(e) {

			$clearEvent(e);

			$clearText([opts.message , opts.uploadError , opts.uploadError1 , opts.progress , opts.percent , opts.text]);

			$setText(opts.message , 'Photo is getting deleted. Please be patient and wait.' , 'block');

			$setButton(opts.del , true , 'disabled' , 'btn-options');

			$removeImage($$file.key , opts);
 };


var cancelBtn = document.getElementById(opts.can);

cancelBtn.onclick = function(e) {

			$clearEvent(e);

			$setElement(opts.can , true);

			$xhrUpload.abort();

			$showButton(opts.can , 'none');

			$setElement(opts.can , false);

			$setButton(opts.add , false , 'btn-options' , 'disabled');

			$clearText([opts.message , opts.uploadError , opts.uploadError1 , opts.progress , opts.percent , opts.text]);

			$setElement(opts.elem , false);
};


};



/** Form Handling Section below **/ 

	var entryForm = document.querySelector('form');

	$formProcess.onclick = function(e) {

				$clearEvent(e);

				$clearText(['errors']);

				var $$sFiles = $$fileObjects.map((file , i) => {

					var $_$file = document.getElementById($elementReferences[i]);

					var fileType = $_$file.files[0] ? $_$file.files[0].type : 'file';

					var fileSize = $_$file.files[0] ? $_$file.files[0].size : '2';

						return {	'location' : file.photo.url , 'mimetype' : fileType , 'size' : fileSize , 'encoding' : fileType }	});

				var compFiles = document.getElementById('compfiles') ,  $compFiles = JSON.stringify($$sFiles) , $message = document.getElementById('message');

				compFiles.value = $compFiles;

				$elementReferences.forEach((item , idx) => { let elemFile = document.getElementById(item);

						elemFile.value = '';	});

				entryForm.submit();
																																													
			}; 


function $showButton(ref , display) {

	var $el = document.getElementById(ref);
	
			$el.style.display = display;						}



function $formPost(elem) {

			if ($rmethod == 'POST') {

			$setButton(elem , true , 'disabled' , 'btn-options');		}		}



function $setButton(ref , attr , add = '' , remove = '') {

var $el = document.getElementById(ref);

		$el.disabled = attr;

		$arr = $el.className.split(' ');
 
		if ($arr.indexOf(add) == -1) {
		
				$el.className += ' ' + add;		}

var $remove = remove;

var $rm = new RegExp($remove , 'g');

			$el.className = $el.className.replace($rm , '');		}



function $setElement(ref , attr) {

var $el = document.getElementById(ref);
			
			$el.disabled = attr;		}


function $clearText(elementsRef) {

	if (elementsRef.length) {

		for (var i = 0; i < elementsRef.length; i++) {

			var $el = document.getElementById(elementsRef[i]);

				if ($el) {	$el.style.display = 'none';

										$el.textContent = '';	}	}	}	}


function $setText(ref , text , display , ref2 , ref3) {

var $el = document.getElementById(ref);
		
		$el.style.display = display;

		$el.textContent = text;
}

function $clearEvent($el) {

		$el.stopPropagation();

		$el.preventDefault();
}

function getTypeFromMagicNumber(signature) {

	switch (signature) {
		 
			case "89504E47" :
		return "image/png"

			case "47494638" :
		return "image/gif"

			case "25504446" :
		return "application/pdf"

			case "FFD8FFDB" :
			case "FFD8FFE0" :
			case "FFD8FFE1" :
			case "FFD8FFE2" :
			case "FFD8FFE3" :
			case "FFD8FFE8" :
		return 'image/jpeg'

			case "504B0304" :
		return "application/zip"

			default :
		return "Unknown filetype"
	}
}


function $checkImageSize($myFile , opts , $fileRef , $btnRef) {

	if ($myFile) {
									
		if ($myFile.size > $fileSize) {
				
				$clearText([opts.message , opts.uploadError , opts.progress]);

				$setButton(opts.add , true , 'disabled' , 'btn-options');

				$setText(opts.uploadError , 'File is too large and will not be uploaded.' , 'block');

				$btnRef.textContent = 'A file with name ' + $myFile.name + ' has been selected';

				$fileRef.photo.size = true;

														return false;		}
	
				$clearText([opts.message , opts.uploadError , opts.progress]);

				$setButton(opts.add , false , 'btn-options' , 'disabled');

				$btnRef.textContent = 'A file with name ' + $myFile.name + ' has been selected';

								$fileRef.photo.size = false;
			} else {

					$btnRef.textContent = 'Choose a File';

					$clearText([opts.message , opts.uploadError , opts.progress]);

					$setButton(opts.add , true , 'disabled' , 'btn-options');	}
	 }



function $checkImageType($myFile , opts , $fileRef , $btnRef) {

	if ($myFile) {

			if ($myFile.type.indexOf('image') == -1) {

		$clearText([opts.message , opts.progress]);
	
		$setButton(opts.add , true , 'disabled' , 'btn-options');
	
		$setText(opts.uploadError1 , 'Only Photo or Image is allowed to be uploaded in this field.' , 'block');
	
		$fileRef.photo.type = true;

								return false;		}

			if (!$fileRef.photo.size) {

					$clearText([opts.message , opts.uploadError , opts.uploadError1 , opts.progress]);

					$setButton(opts.add , false , 'btn-options' , 'disabled');	

				$btnRef.textContent = 'A file with name ' + $myFile.name + ' has been selected';	}

				else {
								$clearText([opts.message , opts.uploadError1 , opts.progress]);

								$setButton(opts.add , true , 'disabled' , 'btn-options');			}	}	
			else {
							$btnRef.textContent = 'Choose a File';

							$clearText([opts.message , opts.uploadError , opts.uploadError1 , opts.progress]);		}
}


function $validateSignature(file , opts , $fileRef) {

	const fileReader = new FileReader();

	fileReader.onloadend = function(evt) {

		if (evt.target.readyState === FileReader.DONE) {

			const uint = new Uint8Array(evt.target.result);

			let bytes = [];

			uint.forEach((byte) => {	bytes.push(byte.toString(16))	});

			const hex = bytes.join('').toUpperCase();

			var signatureType = getTypeFromMagicNumber(hex);

		if (signatureType.indexOf('image') == -1) {

	$clearText([opts.message , opts.uploadError , opts.uploadError1 , opts.progress]);

	$setButton(opts.add , true , 'disabled' , 'btn-options');

	$setText(opts.uploadError1 , 'Only Photo or Image is allowed to be uploaded in this field.' , 'block');

	$fileRef.photo.type = true;

				return false;		}	  }		}

		if (file)	{

		const blob = file.slice(0, 4);

		fileReader.readAsArrayBuffer(blob);		}		
}



function $uploadImage(signedUrl , data , opts , $fileRef) {

	$fileRef.photo.url = `${signedUrl.data.url}/${signedUrl.data.fields.key}`;

	var $myFormData = new FormData();

	for (var key in signedUrl.data.fields) {

			$myFormData.append(key , signedUrl.data.fields[key]);
	}

	$myFormData.append('file' , data.photo);

$xhrUpload = new XMLHttpRequest();

$xhrUpload.upload.onprogress = function(evt) {
												
if (evt.lengthComputable) {
	
	var percentComplete = evt.loaded / evt.total;
	
			percentComplete = parseInt(percentComplete * 100);
	
	var progress = Math.round(percentComplete);

			$setText(opts.percent , `${progress}`  , 'inline-block');		}
};

$xhrUpload.upload.onload = function(res) {

};

$xhrUpload.upload.onerror = function(evt) {

			$setElement(opts.elem , false);
	
			$setButton(opts.add , false , 'btn-options' , 'disabled');
	
			$showButton(opts.can , 'none');
	
			$clearText([opts.message , opts.percent , opts.text , opts.progress]);
	
			$setText(opts.uploadError , 'An error has occured. Please try again.' , 'block');
};

$xhrUpload.upload.onabort = function(evt) {

		$setElement(opts.elem , false);

		$setButton(opts.add , false , 'btn-options' , 'disabled');

		$clearText([opts.message , opts.percent , opts.text , opts.progress]);

		$setText(opts.message , 'Photo upload cancelled. You can now upload another photo.' , 'inline');

};

$xhrUpload.upload.ontimeout = function(evt) {

		$setElement(opts.elem , false);
	
		$setButton(opts.add , false , 'btn-options' , 'disabled');
	
		$showButton(opts.can , 'none');
	
		$clearText([opts.message , opts.percent , opts.text , opts.progress]);
	
		$setText(opts.uploadError , 'File upload has has timed-out. Please try again.' , 'block');
};

$xhrUpload.onload = function(res) {

if (res.target.readyState == 4 && res.target.status == 201) {

			$showButton(opts.add , 'none');
			
			$setButton(opts.del , false , 'btn-options' , 'disabled');
			
			$showButton(opts.del , 'block');
			
			$clearText([opts.message , opts.percent , opts.text , opts.progress]);
			
			$setText(opts.text , 'Photo successfully uploaded.' , 'block');
			
			$showButton(opts.can , 'none');
			
			$setElement(opts.can , false);

		var $subUpload = new XMLHttpRequest();

		$subUpload.open('POST' , '/api/upload/');

		$subBody = { 'Key' : $fileRef.key 	};

		$subUpload.setRequestHeader('Content-Type' , 'application/json;charset=UTF-8');

		$subBody = JSON.stringify($subBody);

		$subUpload.send($subBody);

		$subUpload.onload = function(res) { return true; } 		

			return false;		}	};

$xhrUpload.open('POST' , signedUrl.data.url);

$xhrUpload.send($myFormData);	};


function $removeImage(key , opts) {

	var $xhrRemove = new XMLHttpRequest();

	$xhrRemove.onload = function(res) {

			if (res.target.status == 200) {

				$setElement(opts.elem , false);
				
				$setButton(opts.add , false , 'btn-options' , 'disabled');

				$showButton(opts.del , 'none');
				
				$showButton(opts.add , 'block');
				
				$setText(opts.message , 'Photo successfully deleted. You can now upload another photo.' , 'block');

						return false;		}

				if (true) {

					$clearText([opts.message , opts.uploadError , opts.progress]);
					
					$setButton(opts.del , false , 'btn-options' , 'disabled');
					
					$setText(opts.uploadError , 'An error has occured. Please try again.' , 'block');

						return false;	}	};

	$xhrRemove.ontimeout = function(e) {

						$clearText([opts.message , opts.text , opts.uploadError , opts.progress]);
					
						$setButton(opts.del , false , 'btn-options' , 'disabled');
					
						$setText(opts.uploadError , 'An error has occured while removing image. Please try again.' , 'block');	};

	$xhrRemove.open('DELETE' , '/api/o/photo/' + key);

	$xhrRemove.timeout = 30000;

	$xhrRemove.send();

}