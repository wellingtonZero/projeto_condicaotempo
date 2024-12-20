"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector('#tempo-info');
//o ? significa se não for nulo faça
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return; //aqui se for verdadeiro ele terminar e não vai pra baixo
    const localizacao = input.value.trim();
    if (localizacao.length < 3) {
        alert('O local precisa ter, pelo menos, 3 letras.');
        return;
    }
    try {
        //agora vamos fazer a requição da api
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=b3ef9acaeedf2a19ebfb0a851196627f`);
        const dados = yield response.json();
        console.log(dados);
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
    }
    catch (err) {
        console.log('Deu um erro na obtenção dos dados da API', err);
    }
}));
