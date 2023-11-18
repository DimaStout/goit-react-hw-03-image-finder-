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
    const { query, page } = this.state;

    if (prevState.query !== query || (prevState.page !== page && page !== 1)) {
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
  }

  updateQuery = query => {
    this.setState({ query, page: 1, hits: [] });
  };

  updatePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  formFetch = async query => {
    if (query === '') {
      return;
    } else {
      this.setState({ loading: true });
      const { totalHits, hits } = await APIRequest(query, this.state.page);
      this.setState(prevState => ({
        totalHits,
        hits: [...prevState.hits, ...hits],
        loading: false,
      }));

      window.scrollBy({
        top: document.body.clientHeight,
        behavior: 'smooth',
      });
    }
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
