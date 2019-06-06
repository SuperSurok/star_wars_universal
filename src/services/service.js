export default class SwapiService {
    _apiBase = `https://swapi.co/api/`;

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

    _transformStarShip = (ship) => {
        return {
            id: this._extractId(ship),
        }
    };
}