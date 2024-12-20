const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector('#tempo-info');
//o ? significa se não for nulo faça
form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!input || !sectionTempoInfo) return; //aqui se for verdadeiro ele terminar e não vai pra baixo
    const localizacao = input.value.trim();
    if (localizacao.length < 3) {
        alert('O local precisa ter, pelo menos, 3 letras.');
        return;
    }

    try{
        //agora vamos fazer a requição da api
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=b3ef9acaeedf2a19ebfb0a851196627f`);
    const dados = await response.json();
    //console.log(dados);
    //local onde pegaremos o dados
    const infos = {
        temperatura: Math.round(dados.main.temp - 273.15),
        local: dados.name,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
    };

    sectionTempoInfo.innerHTML = `
        <div class="tempo-dados">
            <h2>${infos.local}</h2>
            <span>${infos.temperatura}ºC</span>
        </div>
        <img src="${infos.icone}"/>
    `;
    }catch (err){
        console.log('Deu um erro na obtenção dos dados da API',err);
    }
    
    
});