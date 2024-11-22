// Dynamically load the sidebar
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        // Inject the fetched sidebar content into the container
        document.getElementById('sidebar-container').innerHTML = data;

        // Select all the list items with icons and links AFTER sidebar is loaded
        const iconItems = document.querySelectorAll('.icon_items li');

        iconItems.forEach(item => {
            const link = item.querySelector('a');  // Find the link inside the list item
            const icon = item.querySelector('i');  // Find the icon inside the list item

            // Add click event to the icon
            if (icon && link) {
                icon.addEventListener('click', () => {
                    window.location.href = link.href; // Navigate to the link when the icon is clicked
                });
            }
        });
    })
    .catch(error => {
        console.error('Error loading sidebar:', error); // Handle fetch errors
    });
