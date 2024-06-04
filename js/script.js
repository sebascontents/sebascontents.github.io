const apiEndpoint = '/api/subscribers';
let subscriberCount = 0;

const subscribeButton = document.getElementById('subscribeButton');
const notificationButton = document.getElementById('notificationButton');
const bellIcon = document.getElementById('bellIcon');
const countElement = document.getElementById('count');

// Function to load the subscriber count from the server
async function loadSubscriberCount() {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        subscriberCount = data.subscriberCount || 0;
        countElement.textContent = subscriberCount;
    } catch (error) {
        console.error('Error loading subscriber count:', error);
    }
}

// Function to save the subscriber count to the server
async function saveSubscriberCount() {
    try {
        await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscriberCount }),
        });
    } catch (error) {
        console.error('Error saving subscriber count:', error);
    }
}

// Initialize the subscriber count display
loadSubscriberCount();

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
    saveSubscriberCount();
});

notificationButton.addEventListener('click', function() {
    if (bellIcon.classList.contains('fa-bell')) {
        bellIcon.classList.remove('fa-bell');
        bellIcon.classList.add('fa-bell-slash');
    } else {
        bellIcon.classList.remove('fa-bell-slash');
        bellIcon.classList.add('fa-bell');
    }
});
