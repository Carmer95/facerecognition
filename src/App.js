import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css';


class App extends Component {
  constructor() {	
		super();
		this.state = {
			input: '',
      imageURL: '',
      box: {},
		}
	}

  calculateFaceLocation = (data) => {
    const clarifaiFace = 	data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(data, width, height, '42');
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
        if (result.outputs) {
          calculateFaceLocation(result);
          const regions = result.outputs[0].data.regions;
  
          regions.forEach((region) => {
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);
  
            region.data.concepts.forEach((concept) => {
              const name = concept.name;
              const value = concept.value.toFixed(4);
  
              console.log(
                `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
              );
            });
          });
        }
      })
      .catch((error) => console.log('error', error));
  };
  

    render() {
      return (
        <div className="App">
          <ParticlesBg color="" num={130} type="cobweb" bg={true} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition imageURL={this.state.imageURL}/>
        </div>
    );
  }
}

export default App;