document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('imageInput').addEventListener('change', handleImageUpload);
});

function handleImageUpload() {
    var input = document.getElementById('imageInput');
    var originalPreview = document.getElementById('originalImagePreview');
    
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            originalPreview.innerHTML = `<img src="${e.target.result}" alt="Original Image">`;
        };
        reader.readAsDataURL(file);
    } else {
        originalPreview.innerHTML = '<p>No image selected</p>';
    }
}

function processImage() {
    var input = document.getElementById('imageInput');
    var originalImage = document.getElementById('originalImagePreview').querySelector('img');
    var processedImagePreview = document.getElementById('processedImagePreview');

    if (!originalImage) {
        alert('Please select an image first.');
        return;
    }

    var worker = new Worker('scripts/imageProcessor.js');

    worker.postMessage(originalImage.src);

    worker.onmessage = function (e) {
        var processedImageBlob = e.data;

        // Create an object URL for the Blob
        var processedImageURL = URL.createObjectURL(processedImageBlob);

        // Display the processed image
        processedImagePreview.innerHTML = `<img src="${processedImageURL}" alt="Processed Image">`;

        // Create a download link for the processed image
        var downloadLink = document.createElement('a');
        downloadLink.href = processedImageURL;
        downloadLink.download = 'processed_image.png';
        downloadLink.innerHTML = 'Download Processed Image';
        processedImagePreview.appendChild(downloadLink);
    };

    worker.onerror = function (error) {
        console.error('Error in Web Worker:', error.message);
    };
}
