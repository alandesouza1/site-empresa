// Lista de sites com nomes e URLs
var sites = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
    { name: 'YouTube', url: 'https://www.youtube.com' },
    { name: 'GitHub', url: 'https://www.github.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' }
];

var currentIndex = 0;
var timer;
var remainingTime = 5000; // 5 segundos para exemplo
var isPaused = false;

function loadSite(index) {
    var iframe = document.getElementById('content-frame');
    iframe.src = sites[index].url;
    highlightActiveSite(index);
}

function startTimer() {
    clearInterval(timer); // Limpa qualquer temporizador anterior
    timer = setInterval(function() {
        currentIndex = (currentIndex + 1) % sites.length; // Passa para o próximo site, volta ao início ao terminar
        loadSite(currentIndex);
    }, remainingTime);
}

function pauseRotation() {
    if (isPaused) {
        startTimer();
        document.getElementById('pauseBtn').textContent = 'Pausar';
    } else {
        clearInterval(timer);
        document.getElementById('pauseBtn').textContent = 'Retomar';
    }
    isPaused = !isPaused;
}

function showPreviousSite() {
    currentIndex = (currentIndex - 1 + sites.length) % sites.length;
    loadSite(currentIndex);
}

function showNextSite() {
    currentIndex = (currentIndex + 1) % sites.length;
    loadSite(currentIndex);
}

function adjustTime() {
    var newTime = prompt("Insira o novo tempo de rotação em segundos:", remainingTime / 1000);
    if (newTime !== null && !isNaN(newTime) && newTime > 0) {
        remainingTime = newTime * 1000; // Converte segundos para milissegundos
        if (!isPaused) {
            startTimer();
        }
    } else {
        alert("Por favor, insira um valor válido.");
    }
}

function openInNewTab() {
    var currentSite = sites[currentIndex];
    window.open(currentSite.url, '_blank');
}

function highlightActiveSite(index) {
    var siteButtons = document.querySelectorAll('#site-list button');
    siteButtons.forEach(function(button, i) {
        button.style.backgroundColor = (i === index) ? '#0056b3' : '#007BFF';
    });
}

function createSiteList() {
    var siteList = document.getElementById('site-list');
    sites.forEach(function(site, index) {
        var li = document.createElement('li');
        var button = document.createElement('button');
        button.textContent = site.name; // Exibe o nome do site
        button.onclick = function() {
            currentIndex = index;
            loadSite(currentIndex);
            clearInterval(timer); // Pausa a rotação automática ao clicar manualmente
            document.getElementById('pauseBtn').textContent = 'Retomar';
            isPaused = true;
        };
        li.appendChild(button);
        siteList.appendChild(li);
    });
}

// Inicializa a interface ao carregar a página
window.onload = function() {
    createSiteList();
    loadSite(currentIndex);
    startTimer();

    document.getElementById('pauseBtn').onclick = pauseRotation;
    document.getElementById('prevBtn').onclick = showPreviousSite;
    document.getElementById('nextBtn').onclick = showNextSite;
    document.getElementById('adjustTimeBtn').onclick = adjustTime;
    document.getElementById('openInNewTabBtn').onclick = openInNewTab;
};