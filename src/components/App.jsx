import React, { Component } from 'react';
import APIRequest from './API';
import Button from './Button';
import ImageGallery from './ImageGallery/';
import { SearchBar } from './SearchBar';
import Loader from './Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppStyled } from './App.styled';

class App extends Component {
  state = { query: '', page: 1, totalHits: 0, hits: [], loading: false };

  componentDidUpdate(prevProps, prevState) {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });

    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.formFetch(query);
    }

    if (query === '') {
      toast('Please enter a request', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

    if (prevState.page !== page && page !== 1) {
      this.loadMore(prevState, page);
    }
  }

  updateQuery = query => {
    this.setState({ query });
  };

  updatePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  formFetch = async query => {
    if (query === '') {
      return;
    } else {
      this.setState({ loading: true });
      const { totalHits, hits } = await APIRequest(query, 1);
      this.setState({ totalHits, hits, page: 1, loading: false });
    }
  };

  loadMore = async (prevState, page) => {
    this.setState({ loading: true });
    const { query } = this.state;
    const { hits } = await APIRequest(query, page);
    this.setState({ hits: [...prevState.hits, ...hits], page, loading: false });
  };

  render() {
    const { hits, page, totalHits, loading } = this.state;
    const maxPage = Math.ceil(+totalHits / 12);

    return (
      <AppStyled>
        <SearchBar updateQuery={this.updateQuery} />
        <ImageGallery images={hits} />
        {page < maxPage && (
          <Button title="Load more" onClick={this.updatePage} />
        )}
        {loading && <Loader />}
      </AppStyled>
    );
  }
}

export default App;
