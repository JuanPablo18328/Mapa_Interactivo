const ten_millions = 10000000,
one_hundred_millions = 100000000,
blue_light = 'rgb(187,210,245',
blue_medium = 'rgb(118,157,227',
blue_strong = 'rgb(31,101,228'


class CountryCollection{

    constructor(items){
        this.items = items
    }

    first(){
        return new CountryPath(this.items[0])
    }

    find(index){
        return new CountryPath(this.items[index]) 
    }

    static get(){
        return new CountryCollection(document.querySelectorAll('path'))
    }

    for(funct){
        this.items.forEach(item => {
            funct( new CountryPath(item) )
        });
    }
}

class CountryPath{

    constructor(element){
        this.element = element

        this.setTooltip(`Country: ${this.element.getAttribute('title')}`)

    }


    fill(color){
        this.element.setAttribute('fill', color)
    }

    name(){
        return this.element.getAttribute('id')
    }

    setPopulation(population){
        this.element.setAttribute("population", population)
    }

    setTooltip(string){
        this.element.setAttribute('title',string)
    }
    static findByName(name){
        return new CountryPath(document.getElementById(name))
    }

    
}

class Response{
    constructor(object){
        this.object = object
    }

    population(){
     return this.object.population
    }

    region(){
        return this.object.region
    }

    subregion(){
        return this.object.subregion
    }

    area(){
        return this.object.area
    }
     
}

class CountryAPI{
    static async findByName(name){
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    
        if(response.status == 404){
            throw Error(`Country ${name} not found`)
        }

        return new Response((await response.json())[0])
    }
}

CountryCollection.get().for(async countryPath => {

   const response = await CountryAPI.findByName( countryPath.name() )

   
    if(response.population() < ten_millions){
        countryPath.fill(blue_light)
        return
    }

    if(response.population() < one_hundred_millions){
        countryPath.fill(blue_medium)
        return
    }

   
    countryPath.fill(blue_strong)
})
