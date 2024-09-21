document.getElementById('aboutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newAboutContent = document.getElementById('textInput').value;
    
    localStorage.setItem('aboutContent', newAboutContent);
    
    window.location.href = '/profile';
  });
  
  
  window.onload = function() {
    const savedContent = localStorage.getItem('aboutContent');
    
    if (savedContent) {
      const aboutText = document.getElementById('aboutDisplay');
      if (aboutText) {
        aboutText.textContent = savedContent;
      }
    }
  };
  