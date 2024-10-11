document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('editBtn');
    const closeButton = document.getElementById('closeBtn');
    const modal = document.getElementById('pop-up');

    editButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    })
});