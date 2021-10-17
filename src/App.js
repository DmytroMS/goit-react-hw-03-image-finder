import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Button from "./components/Button/Button";
import { Component } from "react";
// import Loader from "./components/Loader/Loader";
// import Modal from './components/Modal/Modal';
import { getPictures } from './servises/api-services';

class App extends Component {

 state = {
   query: "",
   images: [],
  };

  handleChangeQuery = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    getPictures(this.state.query, 1).then(res =>
      this.setState({
      images: res
    }));
    
}


  render() {
    return (
    <div>
      <Searchbar
        query={this.state.query}
          handleChange={this.handleChangeQuery}
          onSubmit={this.handleSubmit}
      />
      <ImageGallery images={this.state.images} />
      
      <Button />
      {/* <Loader /> */}
      {/* <Modal /> */}
    </div>
  );
}

}

export default App;
