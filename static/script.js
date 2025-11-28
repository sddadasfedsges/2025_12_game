function saktSpeli() {
    let ievaditsVards = document.querySelector("#vards").value;
    if (ievaditsVards === '') {
        alert('Ievadi vārdu!')
    } else {
        window.location = 'spele#' + ievaditsVards;
    }
}