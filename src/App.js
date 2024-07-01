import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

class App extends Component {
  state = {
    tourPlaces: [],
    isLoading: true,
    apiStatus: '',
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    id: data.id,
    imgUrl: data.image_url,
    heading: data.name,
    description: data.description,
  })

  getProductData = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages' // Remove the comma here

    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.packages.map(this.getFormattedData)
        this.setState({tourPlaces: updatedData, isLoading: false})
      } else {
        this.setState({apiStatus: 'Data fetch failed', isLoading: false})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({apiStatus: 'Network error', isLoading: false})
    }
  }

  render() {
    const {tourPlaces, isLoading, apiStatus} = this.state

    return (
      <div>
        <h1>Travel Guide</h1>
        {isLoading ? (
          <Loader type="Circle" color="#0b69ff" height={50} width={50} />
        ) : apiStatus ? (
          <p>{apiStatus}</p>
        ) : (
          <ul>
            {tourPlaces.map(place => (
              <li key={place.id}>
                <img src={place.imgUrl} alt={place.heading} />
                <h2>{place.heading}</h2>
                <p>{place.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default App
