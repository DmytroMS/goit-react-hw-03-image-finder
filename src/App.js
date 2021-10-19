import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
// import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Button from "./components/Button/Button";
import { Component } from "react";
// import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import { getPictures } from "./servises/api-services";
import Loader from "react-loader-spinner";
import s from "./App.module.css";

class App extends Component {
  state = {
    query: "",
    images: [],
    showModal: false,
    largeImageURL: "",
    page: "",
    isLoading: false,
  };

  handleChangeQuery = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    getPictures(this.state.query, 1).then((res) =>
      // console.log('res', res)
      this.setState({
        images: res,
        largeImageURL: res.largeImageURL,
        page: 1,
      })
    );
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  handleSetLargeImageURL = (largeImageURL) => {
    this.setState(largeImageURL);
  };

  loadMorePicsBttn = () => {
    const { page, query } = this.state;
    const options = { query, page };

    this.setState({ isLoading: true });

    getPictures(options)
      .then((hits) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => {
        return this.setState({ isLoading: false });
      });
  };

  componentDidUpdate(prevState) {
    const { page } = this.state;

    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  render() {
    const { showModal, largeImageURL, isLoading, images } = this.state;
    const renderLoadMoreBttn = images.length > 0 && !isLoading;

    return (
      <div className={s.App}>
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

        {renderLoadMoreBttn && <Button onLoadMore={this.loadMorePicsBttn} />}

        <div className={s.loaderwrapper}>
          {isLoading && (
            <Loader
              type="Rings"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
        </div>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
