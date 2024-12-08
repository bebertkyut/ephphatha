// Simulate progress with localStorage
const tabs = document.querySelectorAll('.tab-button');
const sections = document.querySelectorAll('.module-section');

// Add click event to tabs
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach((t) => t.classList.remove('active'));

    // Add active class to the clicked tab
    tab.classList.add('active');

    // Hide all sections
    sections.forEach((section) => section.classList.add('hidden'));

    // Show the targeted section
    const target = document.getElementById(tab.getAttribute('data-target'));
    target.classList.remove('hidden');

    // Hide Learner and Ready sections when in Beginner tab
    if (tab.getAttribute('data-target') === 'beginner-module') {
      document.getElementById('learner-module').classList.add('hidden');
      document.getElementById('ready-module').classList.add('hidden');
    } else if (tab.getAttribute('data-target') === 'learner-module') {
      document.getElementById('beginner-module').classList.add('hidden');
      document.getElementById('ready-module').classList.add('hidden');
    } else if (tab.getAttribute('data-target') === 'ready-module') {
      document.getElementById('beginner-module').classList.add('hidden');
      document.getElementById('learner-module').classList.add('hidden');
    }
  });
});

// Initially show only the beginner section
document.getElementById('beginner-module').classList.remove('hidden');
document.getElementById('learner-module').classList.add('hidden');
document.getElementById('ready-module').classList.add('hidden');
