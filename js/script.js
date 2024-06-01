document.getElementById('subscribeButton').addEventListener('click', function() {
    if (this.classList.contains('btn-danger')) {
        this.classList.remove('btn-danger');
        this.classList.add('btn-secondary');
        this.textContent = 'Suscrito';
    } else {
        this.classList.remove('btn-secondary');
        this.classList.add('btn-danger');
        this.textContent = 'Suscribirse';
    }
});