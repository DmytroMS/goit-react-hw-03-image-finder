import react, { Component } from "react";

class Searchbar extends Component {
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.props.onSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={this.props.query}
            onChange={this.props.handleChange}
            name="query"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
