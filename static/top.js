function formatTime(seconds) {
    seconds = Number(seconds) || 0;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`
}

function parseHash() {
    const raw = window.location.hash.replace('#', '');
    if (!raw) return null;

    const parts = decodeURI(raw).split(',');
    const vards = (parts[0] || '').trim();
    const klikski = Number(parts[1]);
    const laiks = Number(parts[2]);
    if (!vards || Number.isNaN(klikski) || Number.isNaN(laiks)) return null;
    return {vards, klikski, laiks};
 }

 async function iegutDatusNoApi(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP kļūda! Statuss: ${response.status}`);
    }
    return await response.json();
 }

 function iztiritTabulu() {
    const tabula = document.querySelector('.tops');
    //tikai virsraksta rinda
    tabula.innerHTML = `
        <tr>
            <td>Spēlētājs</td>
            <td>Klikšķi</td>
            <td>Laiks</td>
            <td>Datums</td>
        </tr>`;
 }

 function aizpilditTabulu(ieraksti) {
    const tabula = document.querySelector('.tops');
    ieraksti.forEach(ieraksts => {
        tabula.innerHTML += `
            <tr>
                <td>${ieraksts.vards}</td>
                <td>${ieraksts.klikski}</td>
                <td>${formatTime(ieraksts.laiks)}</td>
                <td>${ieraksts.datums}</td>
            </tr>`;
    });
 }

 async function atlasitTop() {
    try {
        const topJson = await iegutDatusNoApi('/topData');
        iztiritTabulu();
        aizpilditTabulu(topJson);
    } catch (kluda) {
        console.error("Kļūda iegūstot top datus", kluda);
    }
 }

 async function pievienotiesTopam(rezultats) {
    const poga = document.querySelector('#pievienotTopam');
    const statuss = document.querySelector('#pievienotStatuss');
    try {
        if (poga) poga.disable = true;
        if (statuss) statuss.textContent = 'Saglabā...';
        const payload = {
            varads: rezultats.vards,
            klikski: rezultats.klikski,
            laiks: rezultats.laiks,
            datums: new Date().toISOString().split('T')[0]
        };
        const response = await fetch('/pievienot-rezultatu', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Neizdevās saglabāt! Statuss: ${response.status}`);
        }

        if (statuss) statuss.textContent = "Rezultāts ir pievienots TOPam!";
        await atlasitTop();
    } catch (e) {
        console.error(e);
        if (statuss) statuss.textContent = "Kļūda, neizdevās pievienot rezultātu topam.";
        if (poga) poga.disabled = false;
    }
 }


 document.addEventListener('DOMContentLoaded', async () => {
    await atlasitTop();
    const rezultats = parseHash();
    const konteiners = document.querySelector('#rezultatsKonteiners');
    const poga = document.querySelector('#pievienotTopam');

    if (rezultats && konteiners) {
        konteiners.style.display = 'block';
        document.querySelector('#rezVards'),textContent = rezultats.vards;
        document.querySelector('#rezKlikski').textContent = rezultats.klikski;
        document.querySelector('#rezLaiks').textContent = formatTime(rezultats.laiks);

        if (poga) {
            poga.addEventListener('click', () => pievienotiesTopam(rezultats));
        }


    } else {
        //ja nav spēles rezultāta, poga netiek rādīta (konteiners paliek display:none)
    }
 });