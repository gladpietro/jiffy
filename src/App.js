import React, {Component} from 'react' 
// here we import in our loader spinner as an images
import loader from './images/loader.svg'
import Gif from './Gif'

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length)
  return arr[randIndex]
}

const Header = () => (
 <div className="header grid">
  <h1 className="title">Jiffy</h1>
 </div>
)

const UserHint = ({loading, hintText}) => (
  <div className='user-hint'>
    {/* here we check whether we have a loading state and render out 
    either our spinner or hintText based on that, using a ternary operator
    if/else */}
    {loading ? 
    <img className='block mx-auto' src={loader} /> : 
    hintText}
  </div>
)



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      hintText: '',
      gif: null,
      // we have un array of gifs
      gifs: []
    }
  }

  // we want a function that seaches the giphy api using
  // fetch and puts the search term into the query url and
  // then we can do something with the results


  // we can also write async methods into our components
  // that let us use the async/await style of function
  searchGiphy = async searchTerm => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=o7IyuSKkLiR728rSCOE3Pov4refIv10F&q=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`)
      // hrere we convert our raw response into json date
      // {data = data.data}
      // const {data} gets the .data part of our response
      const {data} = await response.json()

      // here we grab a random results from our images
      const randomGif = randomChoice(data)

      // console.log(randomGif)
      // console.log(data)

      this.setState((prevState, props) => ({
        ...prevState,
        gif: randomGif,
        // here we use our spread to take the previous gifs and
        // spread them out, and then add our new random gif
        // onto the end
        gifs:[...prevState.gifs, randomGif]
      }))

        // if our fetch fails, we catch it down
    } catch (error) {

    }
  }

  // with create react app we can write our methods as arrow
  // functions, meaning we don't need the constructor and bind
  handleChange = event => {
    const {value} = event.target
    // by settings the searchTerm in our state and also using that
    // on the input as a value, we have created that is called
    // a controled input
    this.setState((prevState, props) => ({
      // we take our olg props and spread them out here
      ...prevState,
      // and then we overwrite the ones we want ofter
      searchTerm: value,
      // we set the hint text only when we have more than 2 characters
      // in our input, otherwise we maike it an empty string
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }))

  }

  // when we have 2 or more characters in a serarch box
  // and we have also pressed enter, we then want to run a search
  handleKeyPress = event => {
    const {value} = event.target

    if(value.length > 2 && event.key === 'Enter') {
      // here we call our searchGiphy fucntion using the searchTerm
      this.searchGiphy(value)
    }
    //console.log(event.key)
  }

  render() {
    // const searchTerm = this.state.searchTerm
    const {searchTerm, gif} = this.state
    return (
      <div className='page'>
        <Header/>
        <div className='search grid'>
          {/* our stack of gif images */}
          {/* its only goint to render our video when we have a gif 
          in the state, we can test for it using && */}
          {/* {gif && (
            <video
              className='grid-item video'
              autoPlay
              loop
              src={gif.images.original.mp4} 
            />
          )} */}

          {/* here we loop overs our array of gif images from our state and we create multiple videos from it */}
          {this.state.gifs.map(gif => (
            <Gif {...gif} />
          ))}
          
          <input 
            className='input grid-item' 
            placeholder='Type something' 
            onChange={this.handleChange} 
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
        {/* here we pass our userHint all of our state using a spread */}
        <UserHint {...this.state} />
      </div>
    );
  } 
}

export default App;
