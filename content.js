
//id de los elementos que contienen las ads o publicidades
const teaserIds = ['teaser1', 'teaser2', 'teaser3', 'teaser5', 'teaser4', 'ad-container', 'ad-container2', "ad-container3", "ad-container4", "bannerApp", "pop-up-webpush-background", "pop-up-webpush-sub", "cookie-banner"];
const adsClasses = ['b-widget-left'];

function removerAds() {
    const selectorIds = teaserIds.map(id => `#${id}`).join(', ');
    const selectorClasses = adsClasses.map(cls => `.${cls}`).join(', ');
    const fullSelector = `${selectorIds}, ${selectorClasses}`;

    const elementos = document.querySelectorAll(fullSelector);
    
    elementos.forEach(el => {
        console.log(`Eliminado: ${el.id || el.className}`);
        el.remove();
    });
}

// Función para templescanesp.net
function clickTemplescanesp() {
    // Solor en templescanesp.net
    if (!window.location.hostname.includes('templescanesp.net')) {
        return false;
    }
    const divContenedor = document.querySelector('div.relative.size-full.overflow-hidden');
    
    if (divContenedor) {
        const enlace = divContenedor.querySelector('a[href]');
        if (enlace) {
            console.log('[Templescanesp] Enlace encontrado:', enlace.href);
            // Hacer clic en el enlace
            enlace.click();
            return true;
        }
    }
    return false;
}

// Función para ikigaimangas.com
function clickIkigaiMangas() {
    // Solo ikigaimangas.com
    if (!window.location.hostname.includes('ikigaimangas.com')) {
        return false;
    }
    const divs = document.querySelectorAll('div.hover\\:border-white');
    
    for (const div of divs) {
        if (div.textContent.trim() === 'Nuevo dominio') {
            console.log('[IkigaiMangas] Div "Nuevo dominio" encontrado');
            // Hacer clic en el div
            div.click();
            return true;
        }
    }
    return false;
}

// Ejecutar los 2
function ejecutarAutoClick() {
    clickTemplescanesp();
    clickIkigaiMangas();
}

//removemos
removerAds();

//si el dom cambia, usaremos un mutation para observar los cambios
const observar = new MutationObserver((mutations) => {
    let huboCambios = false;
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            huboCambios = true;
            break; 
        }
    }
    if (huboCambios) {
        observar.disconnect();
        removerAds();
        ejecutarAutoClick(); // hacer click si hay cambios
        conectar();
    }
});

function conectar() {
    observar.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// click si el elemento está
setTimeout(() => {
    ejecutarAutoClick();
}, 1000);

// click por con retraso por si no está
setTimeout(() => {
    ejecutarAutoClick();
}, 3000);

conectar();
