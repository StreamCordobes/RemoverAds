
//id de los elementos que contienen las ads o publicidades
const teaserIds=['teaser1', 'teaser2', 'teaser3', 'teaser5', 'teaser4', 
    'ad-container', 'ad-container2', "ad-container3", "ad-container4"];

function removerAds(){
    teaserIds.forEach(id =>{
        const elementos = document.getElementById(id);
        if(elementos){
            elementos.remove();
            console.log(`Se ha removido el siguiente ID: '${id}'`);
        }
    });
}

//si los divs estan presentes, ejecutamos la funcion
removerAds();

//si el dom cambia, usaremos un mutation para observar los cambios
const observar = new MutationObserver((mutationLista, observar) =>{
    for (const mutation of mutationLista){
        if(mutation.type === 'childList'){
            if(mutation.addedNodes && mutation.addedNodes.length > 0){
                mutation.addedNodes.forEach(node => {
                if(node.nodeType === 1 && teaserIds.includes(node.id)){
                    removerAds();
                }
            });
            }
        }
    }
});

observar.observe(document.body, {
    childList: true,
    subtree: true
});