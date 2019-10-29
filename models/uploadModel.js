// Function that would post file to the server
// upload(subjectCode, formData)

var upload = function(subjectCode, formData){
    let branch = subjectCode.substring(0,2);

    let endpoint = `https://arpbackend.firebaseapp.com/studyResouces/${branch}/subjects/${subjectCode}`;
    let resource = formData.get("resource_file");


    //document.querySelector('[type=file]').files
    // Add a new document with a generated id.
    // File or Blob named mountains.jpg
    // File or Blob named mountains.jpg
    var file = resource.pdf;

    // Create the file metadata
    var metadata = {
    contentType: 'pdf'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('resources/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
    }
    }, function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
    case 'storage/unauthorized':
    // User doesn't have permission to access the object
    break;

    case 'storage/canceled':
    // User canceled the upload
    break;

    case 'storage/unknown':
    // Unknown error occurred, inspect error.serverResponse
    break;
    }
    }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    });
    });

    formData.append("downloadLink",downloadURL);
    	$.ajax({
					url : endpoint,
  				method : "POST",
					data : formData,
					contentType : false,
					processData : false
				}).done(function(response){
                    console.log("Success");
				}).fail(function(){
                    alert("fail!");
				}).always(function(){
					//alert("AJAX request finished!");
				});
};
