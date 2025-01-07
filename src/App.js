import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


class App extends Component {
  constructor() {	
		super();
		this.state = {
			input: '',
      imageURL: '',
      box: {},
      route: 'signin'
		}
	}

  calculateFaceLocation = (data) => {
    const clarifaiFace = 	data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({ imageURL: this.state.input });
  
    const requestBody = {
      user_app_id: {
        user_id: 'carmer95',
        app_id: 'Face-Recognition-Brain',
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
        },
      ],
    };
  
    fetch('http://localhost:5000/api/clarifai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // if (result.outputs) {
        //   const regions = result.outputs[0].data.regions;
  
        //   regions.forEach((region) => {
        //     const boundingBox = region.region_info.bounding_box;
        //     const topRow = boundingBox.top_row.toFixed(3);
        //     const leftCol = boundingBox.left_col.toFixed(3);
        //     const bottomRow = boundingBox.bottom_row.toFixed(3);
        //     const rightCol = boundingBox.right_col.toFixed(3);
  
        //     region.data.concepts.forEach((concept) => {
        //       const name = concept.name;
        //       const value = concept.value.toFixed(4);
  
        //       console.log(
        //         `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
        //       );
        //     ;
        //     });
        //   });
        // }
        this.displayFaceBox(this.calculateFaceLocation(result))
      })
      .catch((error) => console.log('error', error));
  };
  
  onRouteChange = (route) => {
    this.setState({route: route})
  }

    render() {
      return (
        <div className="App">
          <ParticlesBg color="" num={130} type="cobweb" bg={true} />
          <Navigation onRouteChange={this.onRouteChange} />
          { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
            </div>
          : (
            this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange}/>
          )
          } 
        </div>
    );
  }
}

export default App;