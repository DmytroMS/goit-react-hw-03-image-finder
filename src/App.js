import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
// import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Button from "./components/Button/Button";
import { Component } from "react";
// import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import { getPictures } from "./servises/api-services";

class App extends Component {
  state = {
    query: "",
    images: [],
    showModal: false,
    largeImageURL: '',
  };

  handleChangeQuery = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    getPictures(this.state.query, 1).then((res) =>
      //  console.log('res', res)
      this.setState({
        images: res,
        largeImageURL: res.largeImageURL,
      })
    );
  };

  toggleModal = () => {
    this.setState(state  => ({
      showModal: !state.showModal,
    }));
  };

  handleSetLargeImageURL = (largeImageURL) => {
    this.setState(largeImageURL);
}

  render() {
    const { showModal, largeImageURL } = this.state;

    return (
      <div>
        <Searchbar
          query={this.state.query}
          handleChange={this.handleChangeQuery}
          onSubmit={this.handleSubmit}
        />
        <ImageGallery
          images={this.state.images}
          toggleModal={this.toggleModal}
          handleSetLargeImageURL={this.handleSetLargeImageURL}
        />

        <Button />
        {/* <Loader /> */}
        {showModal && (
          <Modal
            onClick={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
