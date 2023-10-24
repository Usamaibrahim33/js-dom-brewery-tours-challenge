const root = 'https://api.openbrewerydb.org/v1//breweries?by_state='
const FilterByTypeRoot = 'https://api.openbrewerydb.org/v1/breweries?by_type='
const FilterByNameRoot = 'https://api.openbrewerydb.org/v1/breweries?by_name='

const FormToSearchBrewry = document.querySelector('#select-state-form')
const ContainerForList = document.querySelector('#breweries-list')
const h1 = document.querySelector('h1')
const filterMenu = document.querySelector('.filters-section')
const FilterByTypeForm = document.querySelector('.filter-by-type-form')
const Filter = document.querySelector('#filter-by-type')

const CityForm = document.createElement('form')
CityForm.className = 'filter-by-city-form'

const state = {
    ListOfBreweries: []
}

// FUNCTION TO DELETE ALL THE ELEMENT IN THE LISTCONTAINER MAIN PAGE
const DeleteAllLitContainer = () => {
    const deleteall = ContainerForList.querySelectorAll('*')
    deleteall.forEach((child) => child.remove())
}

const DeleteAllCityForm = () => {
    // const Deleteallcity = CityForm.querySelector('*')
    // Deleteallcity.forEach((child) => child.remove())
    CityForm.innerHTML = ''
}

// FUNCTION FOR CREATING EACH BREWEYR
const CreateEachBrewey = () => {
    state.ListOfBreweries.forEach((brewery) => {
        // console.log(brewery.city)

        if (brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub') {
            const li = document.createElement('li')
            const h2 = brewery.name
    
    
            const div = document.createElement('div')
            div.setAttribute('class', 'type')
            div.innerText = brewery.brewery_type
    
            const AddressSection = document.createElement('section')
            AddressSection.setAttribute('class', 'address')
            const h3 = document.createElement('h3')
            h3.innerText = 'Address:'
    
            const AddressP = document.createElement('p')
            AddressP.innerText = brewery.address_1
    
            const CityAndPostCodeP = document.createElement('p')
            const Strong = document.createElement('strong')
            Strong.innerText = brewery.state_province
            Strong.innerText += '' + brewery.postal_code
            CityAndPostCodeP.append(Strong)
    
            AddressSection.append(h3)
            AddressSection.append(AddressP)
            AddressSection.append(CityAndPostCodeP)
    
    
            const PhoneSection = document.createElement('section')
            PhoneSection.setAttribute('class', 'phone')
    
            const Phoneh3 = document.createElement('h3')
            Phoneh3.innerText = 'Phone'
            const PhoneNumber = document.createElement('p')
            PhoneNumber.innerText = brewery.phone
    
            PhoneSection.append(Phoneh3)
            PhoneSection.append(PhoneNumber)
    
    
    
            const LinkSection = document.createElement('section')
            LinkSection.setAttribute('class', 'link')
            const WebsiteLink = document.createElement('a')
            WebsiteLink.href = brewery.website_url
            WebsiteLink.target = '_blank'
            WebsiteLink.innerText = 'Visit Website'
    
    
            LinkSection.appendChild(WebsiteLink)
    
    
      
            
            li.append(h2)
            li.append(div)
            li.append(AddressSection)
            li.append(PhoneSection)
            li.append(LinkSection)
    
            ContainerForList.append(li)
        }
})
}


// FUNCTION TO MAKE A GET REQUEST BY STATE AND STORING IT IN MY SOURCE OF TRUTH "STATE"
const FetchAndCreateData = (UserChoise) => {
    fetch(`${root}${UserChoise}`) 
    .then((response) => response.json())
    .then((data) => {
      state.ListOfBreweries = data
    //   console.log(state.ListOfBreweries[0].city)
      DeleteAllLitContainer()
      DeleteAllCityForm()
      CreateEachBrewey()
      ShowAllCities()
    })
}


FormToSearchBrewry.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('i am being clicked ')
    const UserChoise =   event.target[0].value
    if (UserChoise === '') {
        console.log('cant be empty')
        MakeAGeneralRequest()
    }  else {
        FetchAndCreateData(UserChoise)
    }
    // console.log(UserChoise)


})

// FUNCTION FOR MAKING A GET REQUEST BY JUST BREWEY TYPE, USER CHOOSE THERE CHOICE
const FilterByType = (SelectedOption) => {
    fetch(`${FilterByTypeRoot}${SelectedOption}`) 
      .then((response) => response.json())
      .then((data) => {
        state.ListOfBreweries = data
        // console.log(state.ListOfBreweries)
        CreateEachBrewey()
      })

}


// const Filter = document.querySelector('#filter-by-type')
// console.log(Filter)


Filter.addEventListener('change', (event) => {
    event.preventDefault()

    const SelectedOption = event.target.value

    if (SelectedOption === 'micro') {
        console.log('i am ', SelectedOption)
        DeleteAllLitContainer()
        FilterByType(SelectedOption)
    

    } else if (SelectedOption === 'regional'){
        console.log('i am the ', SelectedOption)
        DeleteAllLitContainer()
        FilterByType(SelectedOption)


    } else if (SelectedOption === 'brewpub') {
        console.log('i am the ', SelectedOption)
        DeleteAllLitContainer()
        FilterByType(SelectedOption)

    } else {
        DeleteAllLitContainer()
    }

})




// fetch(`${FilterByNameRoot}Anthem`)

const FetchByNameSearch = (mainvalue) => {
    fetch(`${FilterByNameRoot}${mainvalue}`)
       .then((response) => response.json())
       .then((data) => {
        state.ListOfBreweries = data
        console.log(state.ListOfBreweries)
        CreateEachBrewey()          
       })
}


const CreatSerachByName = () => {
    const Header = document.createElement('header')
    Header.className = 'search-bar'

    const SearchBreweryByName = document.createElement('form')
    SearchBreweryByName.id = 'search-breweries-form'
    SearchBreweryByName.autocomplete = 'off'

    const Label = document.createElement('label')
    Label.id = 'search-breweries'
    const SearchH2 = document.createElement('h2')
    SearchH2.innerText = 'Search Breweries:'
    Label.append(SearchH2)

    const input = document.createElement('input')
    input.id = 'search-breweries'
    input.name = 'search-breweries'
    input.type = 'text'
    input.placeholder = 'search by name'

    input.addEventListener('input', (event) => {
        event.preventDefault()
        DeleteAllLitContainer()

        const SeachName = event.target.value
        const mainvalue = SeachName
        console.log(mainvalue)
        FetchByNameSearch(mainvalue)
        

    })

    SearchBreweryByName.append(Label)
    SearchBreweryByName.append(input)
    Header.append(SearchBreweryByName)

    h1.append(Header)
}

CreatSerachByName()


const filterByCityHeader = () => {
    const CityDiv = document.createElement('div')
    CityDiv.className = 'filter-by-city-heading'

    const Citiesh3 = document.createElement('h3')
    Citiesh3.innerText = 'Cities'

    const button = document.createElement('button')
    button.className = 'clear-all-btn'
    button.innerText = 'Clear All'

    button.addEventListener('click', (event) => {
        event.preventDefault()
        DeleteAllCityForm()
    })

    CityDiv.append(Citiesh3)
    CityDiv.append(button)

    filterMenu.append(CityDiv)
}

filterByCityHeader()


const ShowAllCities = () => {
    const citySet = new Set()
    // const CityForm = document.createElement('form')
    state.ListOfBreweries.forEach((item) => {
        const CityName = item.city

        if (!citySet.has(CityName)) {
                const InputForCity = document.createElement('input')
                InputForCity.type = 'checkbox'
                InputForCity.name =  item.city
                InputForCity.value = item.city
            
                const labelForCity = document.createElement('label')
                labelForCity.innerText = item.city
                const br = document.createElement('br')
                
            
                CityForm.append(InputForCity)
                CityForm.append(labelForCity)
                CityForm.append(br)

                citySet.add(CityName)
        }
    

    })
    filterMenu.append(CityForm)
}






const MakeAGeneralRequest = () => {
    fetch('https://api.openbrewerydb.org/v1/breweries')
   .then((response) => response.json())
   .then((data) => {
      state.ListOfBreweries = data
      DeleteAllLitContainer()
      CreateEachBrewey()
   })
}
      
 