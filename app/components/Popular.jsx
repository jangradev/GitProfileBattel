import * as React from 'react';
import PropTypes from 'prop-types';
import { languagesApi } from '../utils/api.js';
import Table from './Table.jsx';

function LangNav({ selected, updateLanguages }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <select onChange={(e) => updateLanguages(e.target.value)} selected={selected}>
      {languages.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
LangNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateLanguages: PropTypes.func.isRequired,
};
export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: 'All',
      error: null,
      repos: null,
    };
    this.updateLanguages = this.updateLanguages.bind(this);
  }
  componentDidMount() {
    this.updateLanguages(this.state.languages);
  }
  updateLanguages(selectLang) {
    // need to update state
    // Also error set to null in case error in previous fetching
    this.setState({
      languages: selectLang,
      error: null,
    });
    // Also responsible for fetch data
    languagesApi(selectLang)
      .then((repos) => {
        //console.log(repos);
        // Set result of this promise to state
        this.setState({ repos, error: null });
      })
      .catch((error) => {
        console.log('Error in load data', error);
        this.setState({
          error: 'Error in fetching languages',
        });
      });
  }

  render() {
    const { repos, error } = this.state;
    return (
      <main className='stack main-stack animate-in'>
        <div className='split'>
          <h1>Popular</h1>
          <LangNav updateLanguages={this.updateLanguages} selected={this.state.languages} />
        </div>
        {error && <p className='text-center error'>{error}</p>}
        {repos && <Table repos={repos} />}
      </main>
    );
  }
}
