<script setup>
import { getCity,getClima } from './forecast';
import { ref } from 'vue';
//getCity('Monclova');
const ciudades = ref([]); 
const condiciones = ref([]);

const seleccionado = ref(false);
const ciudad = ref("");
const ciudadSeleccionada = ref("");
const cambiando = ref(false);
const status = ref("");
const nIcon = ref("");
const dia = ref(true);
const mostrar = ref(false);
const error = ref(false);

const consulta = (ciudad) =>{
  getCity(ciudad).then((data)=>{
    ciudades.value = data;
  }).catch(()=>{
    error.value = true;
    const element = document.getElementById('error')
    element.scrollIntoView({behavior:"smooth"});
  })
}

const consultarClima = (Key, cityName) =>{
  console.log("entra");
  const form = document.querySelector('form');
  ciudadSeleccionada.value = cityName;
  getClima(Key).then((data)=>{
    condiciones.value = data;
    status.value = data.Temperature.Metric.Value;
    nIcon.value = data.WeatherIcon;
    dia.value = data.IsDayTime;
    form.reset();
    sale();
  }).catch(()=>{
    error.value = true;
    const element = document.getElementById('error')
    element.scrollIntoView({behavior:"smooth"});
  })
}

const sale = () =>{
  cambiando.value = false;
  mostrar.value = true;
  const element = document.getElementById('CLIMACARD')
  element.scrollIntoView({behavior:"smooth"});
}
</script>

<template>
  <h2 id="error" class="text-muted text-center mt-4 error bg-danger" v-if="error">Se alcanzó el número de consultas diarias.</h2>
<div class="container my-5 mx-auto">
  <h1 class="text-muted text-center my-4">Clima app</h1>

  <form @submit.prevent class="change-location my-4 text-center text-muted">
    <label for="city">Ingresa alguna localización para conocer el clima:</label>
    <input type="text" name="city" class="form-control p-4" v-model="ciudad" :onInput="consulta(ciudad)" :onFocusin="()=>{cambiando=true}">
      <div class="lista-c " v-show="cambiando">
        <button v-for="c in ciudades" class="btn btn-light my-1 form-control p-4" @click="consultarClima(c.Key, `${c.LocalizedName}, ${c.AdministrativeArea.LocalizedName}, ${c.Country.LocalizedName}`)" :key="c.Key" :id="c.Key">
          {{ c.LocalizedName }}, {{ c.AdministrativeArea.LocalizedName }}, {{ c.Country.LocalizedName }}
        </button>
      </div>
  </form>

  <div class="card shadow-lg rounded" v-show="mostrar" id="CLIMACARD">
    <img :src="dia ? '../src/iconsWeather/wall/despertar.png' : '../src/iconsWeather/wall/dormir.png'" alt="" class="time card-img-top">
    <div class="icon bg-light mx-auto text-center">
      <img :src="`../src/iconsWeather/icons/${nIcon}.svg`" />
    </div>
    <div class="text-muted text-uppercase text-center details">
      <h5 class="my-3">{{ ciudadSeleccionada }}</h5>
      <div class="my-3">{{ condiciones.WeatherText }}</div>
      <div class="display-4 my-4">
        <span>{{ status }}</span>
        <span>&deg;C</span>
      </div>
    </div>
  </div>
</div>

<footer>
  Limitado en consultas por api
</footer>
</template>

<style>
  body{
    background-color: #eeedec;
    letter-spacing: 0.2em;
    font-size: 0.8em;
  }

  .container{
    max-width: 350px;
  }

  .btn{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
  }

  .lista-c{
    width: 320px;
    height: 150px;
    overflow-y:auto;
    position: absolute;
    z-index: 9999;
  }

  footer{
    display: flex;
    align-items: end;
    justify-content: center;
  }
</style>
