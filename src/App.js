import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import axios from 'axios';
import Placeholder from './components/Placeholder';
import logo from './images/logo.png';
import './scss/App.scss';

const QUERY_CHARACTER = 'https://rickandmortyapi.com/api/character/';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalCharacters: '',
      items: [],
      gender: [],
      status: [],
      isLoading: false,
      error: null,
      page: 1
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get(QUERY_CHARACTER)
      .then(results => {
        const gender = results.data.results.map(el => {
          return el.gender;
        });
        const status = results.data.results.map(el => {
          return el.status;
        });

        this.setState({
          gender: [...new Set(gender)],
          status: [...new Set(status)],
          actualStatus: '',
          totalCharacters: results.data.info.count,
          items: results.data.results,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }

  handleChange = event => {
    event.preventDefault();
    const status = event.target.value;
    axios
      .get(`${QUERY_CHARACTER}?status=${status}`)
      .then(results => {
        this.setState({
          items: results.data.results,
          actualStatus: status
        });
      })
      .catch(error =>
        this.setState({
          error
        })
      );
  };

  handleLoad = () => {
    const items = [...this.state.items];
    const newPage = this.state.page + 1;
    const status =
      this.state.actualStatus !== ''
        ? `&status=${this.state.actualStatus}`
        : '';
    axios
      .get(`${QUERY_CHARACTER}?page=${newPage}${status}`)
      .then(results => {
        const gender = results.data.results.map(el => {
          return el.gender;
        });
        const status = results.data.results.map(el => {
          return el.status;
        });

        this.setState({
          gender: [...new Set(gender)],
          status: [...new Set(status)],
          items: [...items, ...results.data.results],
          page: newPage
        });
      })
      .catch(error =>
        this.setState({
          error
        })
      );
  };

  render() {
    const { items, status } = this.state;
    return (
      <>
        <header className="App-header">
          <h1>
            <img src={logo} alt="" />
          </h1>
        </header>

        <form>
          {status.map((item, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={item}
                onChange={this.handleChange}
              />
              {item}
            </label>
          ))}
        </form>

        <section className="content">
          {items.map(item => (
            <LazyLoad
              height={300}
              key={item.id}
              offset={[-200, 0]}
              placeholder={<Placeholder />}
            >
              <div className="character">
                <div
                  className="character__image"
                  style={{ backgroundImage: `url(${item.image})` }}
                  alt={item.name}
                />
                <h2 className="character__name">{item.name}</h2>
                <span>
                  <strong>Status : </strong>
                  {item.status}
                </span>
                <span>
                  <strong>Species : </strong>
                  {item.species}
                </span>
              </div>
            </LazyLoad>
          ))}
        </section>
        <button onClick={this.handleLoad}>Load more</button>
      </>
    );
  }
}

export default App;
