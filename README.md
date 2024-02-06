# Image Processing Tool using Web Worker

This is a simple image processing tool that applies various filters to an input image using a web worker. The tool utilizes JavaScript and HTML5 Canvas to perform the image processing operations.

## Instructions

1. Clone the repository or download the source code to your local machine.

2. Open the `index.html` file in a web browser.

3. Select an image file using the "Choose File" button. The selected image will be displayed on the page.

4. Click the "Process Image" button to apply filters to the selected image. The processed image will be displayed once the processing is complete.

5. The processed image will be generated using a web worker, which performs the image processing operations in the background. This ensures that the main thread remains responsive during the processing.

## Customization

If you want to customize the image processing filters or add new filters, you can modify the `applyFilter` function in the `script.js` file. The provided code includes examples of grayscale conversion, color enhancement, sharpening, noise reduction, and blur effects. You can experiment with different algorithms and parameters to achieve the desired results.

Please note that a basic understanding of JavaScript programming and image processing concepts is recommended for making modifications to the code.

## Compatibility

The image processing tool is compatible with modern web browsers that support HTML5 features such as the `<canvas>` element and web workers. It has been tested on the latest versions of Chrome, Firefox, and Safari.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code for both commercial and non-commercial purposes. See the `LICENSE` file for more details.
