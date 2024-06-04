let subscriberCount = 0;
const subscribeButton = document.getElementById('subscribeButton');
const countElement = document.getElementById('count');

subscribeButton.addEventListener('click', function() {
    if (this.classList.contains('btn-danger')) {
        this.classList.remove('btn-danger');
        this.classList.add('btn-secondary');
        this.textContent = 'Suscrito';
        subscriberCount++;
    } else {
        this.classList.remove('btn-secondary');
        this.classList.add('btn-danger');
        this.textContent = 'Suscribirse';
        subscriberCount--;
    }
    countElement.textContent = subscriberCount;
});
