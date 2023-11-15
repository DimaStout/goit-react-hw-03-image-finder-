import { Component } from 'react';

import APIRequest from './API';
import Button from './Button';
import ImageGallery from './ImageGallery/';
import { SearchBar } from './SearchBar';
import Loader from './Loader';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { AppStyled } from './App.styled';

export class App extends Component {
  state = { query: '', page: 1, totalHits: 0, hits: [], loading: false };

  componentDidUpdate(past, prevState) {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
    let { query, page } = this.state;
    if (prevState.query !== query) {
      this.formFetch(query);
    }
    if (this.state.query === '') {
      toast(`!!! Please enter a request !!!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (prevState.page !== page && page !== 1) {
      this.loadMore(prevState, page);
    }
  }

  updateQuery = query => {
    this.setState({ query });
  };

  updatePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
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
    const query = this.state.query;
    const { hits } = await APIRequest(query, page);
    this.setState({ hits: [...prevState.hits, ...hits], page });
    this.setState({ loading: false });
  };
  render() {
    const { hits, page, totalHits, loading } = this.state;
    const maxPage = Math.ceil(+totalHits / 12);
    return (
      <AppStyled>
        <SearchBar updateQuery={this.updateQuery} />
        <ImageGallery images={hits} imageClick={this.showBigImage} />
        {page < maxPage && (
          <Button title="Load more" onClick={this.updatePage} />
        )}
        {loading && <Loader />}
      </AppStyled>
    );
  }
}
