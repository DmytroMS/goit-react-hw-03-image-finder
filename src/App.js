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
import { ToastContainer, Flip, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
    query: "",
    images: [],
    showModal: false,
    largeImageURL: "",
    page: 1,
    isLoading: false,
  };

  handleChangeQuery = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
       toast.warn('Please, specify your search');
      return;
    }
    this.setState({ page: 1 });
    getPictures(this.state.query, this.state.page).then((res) =>
      // console.log('res', res.page)
      this.setState({
        images: res,
        largeImageURL: res.largeImageURL,
        page:  this.state.page + 1,
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
    const page = this.state.page;
    const query = this.state.query
    // const { page, query } = this.state;
    // const options = { query, page };

    this.setState({ isLoading: true });
    console.log('page', page);
    console.log('query', query );
    getPictures(query,page)
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

    if (page > 2) {
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
        <ToastContainer position="top-right"
          transition={Flip}
          autoClose={3000}
          theme={'dark'}/>
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
