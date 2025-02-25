document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const resizeBtn = document.getElementById('resizeBtn');
    const outputPath = document.getElementById('outputPath');

    resizeBtn.addEventListener('click', async () => {
        if (!imageInput.files[0]) {
            alert('Please select an image');
            return;
        }

        if (!widthInput.value || !heightInput.value) {
            alert('Please enter both width and height');
            return;
        }

        try {
            const result = await window.electronAPI.resizeImage({
                imagePath: imageInput.files[0].path,
                width: widthInput.value,
                height: heightInput.value
            });

            outputPath.textContent = `Photo is saved to: "${result}"`;
        } catch (error) {
            alert('Error resizing image: ' + error.message);
        }
    });
}); 