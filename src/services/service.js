export default class SwapiService {
    _apiBase = `https://swapi.co/api/`;
    _imageBase = `https://starwars-visualguide.com/assets/img`;


    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Could not fetch with ${this._apiBase}${url} with status ${response.status}`
            );
        }

        return await response.json();
    };

     getAllPeople = async () => {
        const response = await this.getResource(`people`);
        return response.results.map(this._transformPerson);
    };

     getPerson = async (id) => {
        const person = await this.getResource(`people/${id}`);
        return this._transformPerson(person)
    };

     getAllPlanets = async () => {
        const response = await this.getResource(`planets`);
        return response.results.map(this._transformPlanet);
    };

     getPlanet = async (id) => {
        const planet = await this.getResource(`planets/${id}`);
        return this._transformPlanet(planet);
    };

     getAllStarShips = async () => {
        const response = await this.getResource(`starships`);
        return response.results;
    };

     getStarShip = async (id) => {
        const ship = await this.getResource(`starships/${id}`);
        return this._transformStarShip(ship);
    };

     getPersonImage = ({id}) => {
        return `${this._imageBase}/characters/${id}.jpg`
     };

     getStarshipImage = ({id}) => {
         return `${this._imageBase}/starships/${id}.jpg`
     };

     getPlanetImage = ({id}) => {
         return `${this._imageBase}/planets/${id}.jpg`
     };

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.orbital_period,
            diameter: planet.diameter
        };
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            birthYear: person.birth_year,
            eyeColor: person.eye_color,
            gender: person.gender

        };
    };

    _transformStarShip = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        }
    };
}