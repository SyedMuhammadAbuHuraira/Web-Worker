onmessage = async function (e) {
    var originalImageSrc = e.data;
    
    // Perform image processing (e.g., applying filters) in the background
    var processedImageBlob = await applyFilters(originalImageSrc);

    postMessage(processedImageBlob);
};

async function applyFilters(originalImageSrc) {
    var response = await fetch(originalImageSrc);
    var blob = await response.blob();
    var img = await createImageBitmap(blob);

    var canvas = new OffscreenCanvas(img.width, img.height);
    var ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;



    

    // Apply a simple grayscale filter
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }

    // Apply a sepia filter
    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];

        data[i] = 0.393 * r + 0.769 * g + 0.189 * b;
        data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b;
        data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b;
    }

    // Apply a brightness filter
    var brightnessFactor = 1.5;
    for (var i = 0; i < data.length; i += 4) {
        data[i] *= brightnessFactor;
        data[i + 1] *= brightnessFactor;
        data[i + 2] *= brightnessFactor;
    }

    ctx.putImageData(imageData, 0, 0);

    // Convert the processed image on the canvas to a Blob
    return canvas.convertToBlob();
}
