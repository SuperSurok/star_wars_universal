export default class SwapiResource {
    _apiBase = `https://swapi.co/api/`;

    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Could not fetch with ${this._apiBase}${url} with status ${response.status}`
            );
        }

        return await response.json();
    }

    async getAllPeople() {
        const response = await this.getResource(`people`);
        return response.results.map(this._transformPerson);
    }

    async getPerson(id) {
        const person = await this.getResource(`people/${id}`);
        return this._transformPerson(person)
    }

    async getAllPlanets() {
        const response = await this.getResource(`planets`);
        return response.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`planets/${id}`);
        return this._transformPlanet(planet);
    }

    async getAllStarShips() {
        const response = await this.getResource(`starships`);
        return response.results;
    }

    async getStarShip(id) {
        const ship = await this.getResource(`starships/${id}`);
        return this._transformStarShip(ship);
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet(planet) {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.orbital_period,
            diameter: planet.diameter
        };
    }

    _transformPerson(person) {
        return {
            id: this._extractId(person),
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color

        };
    }

    _transformStarShip(ship) {
        return {
            id: this._extractId(ship),
        }
    }
}