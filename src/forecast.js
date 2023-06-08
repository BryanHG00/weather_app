const key = 'MjTml39KQXl2qWfydd6r5QiI2S8916Lh';

const getCity = async (city) =>{

    const baseURL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(baseURL + query);

    const data = await response.json();



    return data;
}

const getClima = async (id) =>{

    const baseURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(baseURL + query);

    const data = await response.json();



    return data[0];

}

export {getCity,getClima};