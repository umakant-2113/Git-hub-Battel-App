import React from 'react';
import Header from './Header';

class Popular extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 'All',
      data: null,
    };
  }

  componentDidMount() {
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${this.state.active}&sort=stars&order=desc&type=Repositories`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data });
      });
  }

  handAllData = (e) => {
    let value = e.target.innerText;
    this.setState({ data: null});
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${value}&sort=stars&order=desc&type=Repositories`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data, active: value });
      });
  };

  render() {
    let tagBOx = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    if (!this.state.data) {
      return <h1> loading... </h1>;
    }
    return (
      <>
        <main className='container'>
          <div className='tag-box' onClick={this.handAllData}>
            {tagBOx.map((elm) => {
              return (
                <p
                  className={this.state.active === elm ? 'Active' : 'no-active'}
                >
                  {elm}
                </p>
              );
            })}
          </div>

          <div className='big-box'>
            {this.state.data.items.map((elm, index) => {
              return (
                <div className='item-box'>
                  <h1 className='h1'># {index + 1} </h1>
                  <figure className='figure'>
                    <img src={elm.owner.avatar_url} alt='' />
                  </figure>
                  <h2 className='name'>{elm.owner.login}</h2>
                  <div className='sm-box'>
                    <h3>
                      <i class='fa-solid fa-user'></i> {elm.owner.login}{' '}
                    </h3>
                    <p>
                      {' '}
                      <i class='fa-solid fa-star'></i>{' '}
                      {String(elm.watchers).slice(0, 3) +
                        ',' +
                        String(elm.watchers).slice(3)}
                    </p>
                    <p>
                      {' '}
                      <i class='fa-solid fa-code-fork '></i> {elm.forks}
                    </p>
                    <p>
                      <i class='fa-solid fa-triangle-exclamation'></i>{' '}
                      {elm.open_issues}{' '}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </>
    );
  }
}

export default Popular;
