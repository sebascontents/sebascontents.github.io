document.addEventListener('DOMContentLoaded', () => {
    const favoriteBtn = document.getElementById('favoriteBtn');

    // Verificar el estado del botón en el localStorage
    const isFavorited = localStorage.getItem('isFavorited') === 'true';
    if (isFavorited) {
        favoriteBtn.classList.add('favorited', 'btn-danger');
        favoriteBtn.classList.remove('btn-primary');
        favoriteBtn.textContent = 'Quitar de Favoritos';
    }

    favoriteBtn.addEventListener('click', () => {
        const isCurrentlyFavorited = favoriteBtn.classList.toggle('favorited');
        if (isCurrentlyFavorited) {
            favoriteBtn.classList.add('btn-danger');
            favoriteBtn.classList.remove('btn-primary');
            favoriteBtn.textContent = 'Quitar de Favoritos';
        } else {
            favoriteBtn.classList.add('btn-primary');
            favoriteBtn.classList.remove('btn-danger');
            favoriteBtn.textContent = 'Agregar a Favoritos';
        }
        localStorage.setItem('isFavorited', isCurrentlyFavorited);
    });
});