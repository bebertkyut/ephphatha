const img = document.querySelector('#photo');  
const file = document.querySelector('#file');       
const upload_btn = document.querySelector('#upload_btn'); 

file.addEventListener('change', function() {
    const chosenFile = this.files[0];
    if (chosenFile) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            img.setAttribute('src', reader.result); 
        });

        reader.readAsDataURL(chosenFile);  
    }
});
