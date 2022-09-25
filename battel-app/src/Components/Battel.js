import React from 'react';
export default class Battel extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      user1: '',
      data2: [],
      user2: '',
    };
  }
  user1Submit = (e) => {
    e.preventDefault();
    let value = e.target[0].value;
    let form1 = document.getElementById('form1');
    form1.style.display = 'none';
    let div = document.querySelector('.user1-data');
    div.style.display = 'inline-block';
    fetch(`https://api.github.com/users/${value}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: [...this.state.data, data] });
      });
    this.setState({ user1: '' });
  };

  user2Submit = (e) => {
    e.preventDefault();
    let form2 = document.getElementById('form2');
    form2.style.display = 'none';
    let div2 = document.querySelector('.user2-data');
    div2.style.display = 'inline-block';
    let value = e.target[0].value;
    let btn = document.getElementById('bettal-btn');
    btn.style.display = 'block';

    fetch(`https://api.github.com/users/${value}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data2: [...this.state.data2, data] });
      });
    this.setState({ user2: '' });
  };

  bettal = () => {
    let container = document.getElementById('main');
    container.style.display = 'none';
    let displayBox = document.getElementById('userdata-display');
    displayBox.style.display = 'block';
    this.setState({
      user1: '',
      user2: '',
    });
  };
  reset = () => {
    let container = document.querySelector('#main');
    container.style.display = 'block';
    let displayBox = document.getElementById('userdata-display');
    displayBox.style.display = 'none';
    let user1 = document.querySelector('.user1-data');
    let user2 = document.querySelector('.user2-data');
    let form1 = document.getElementById('form1');
    let form2 = document.getElementById('form2');
    user1.style.display = 'none';
    user2.style.display = 'none';
    form1.style.display = 'block';
    form2.style.display = 'block';
  };

  user1Form = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  user2From = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  displayForm1 = () => {
    let div = document.querySelector('.user1-data');
    div.style.display = 'none';
    let form1 = document.getElementById('form1');
    form1.style.display = 'block';
  };

  displayForm2 = () => {
    let div = document.querySelector('.user2-data');
    div.style.display = 'none';
    let form1 = document.getElementById('form2');
    form1.style.display = 'block';
  };

  render() {
    let value1 = Math.floor(Math.random() * 100);
    let value2 = Math.floor(Math.random() * 100);

    return (
      <>
        <main className='container' id='main'>
          <div className='battel-div'>
            <h2>Instruction </h2>
          </div>
          <div className='battel-box'>
            <div className='div'>
              <h2> Enter two Github users</h2>
              <div className='battel-div2'>
                <i class='fa-solid fa-user-group'></i>
              </div>
            </div>
            <div className='div'>
              <h2>Battle</h2>
              <div className='battel-div2'>
                <i class='fa-solid fa-jet-fighter'></i>
              </div>
            </div>
            <div className='div'>
              <h2>See the winner </h2>
              <div className='battel-div2'>
                {' '}
                <i class='fa-solid fa-trophy'></i>
              </div>
            </div>
          </div>

          {/*  player section */}

          <div>
            <h2 className='player'> Player</h2>
            <div className='form-div'>
              {/* form one section */}

              <form className='flex-50' id='form1' onSubmit={this.user1Submit}>
                <input
                  className='input'
                  type='text'
                  value={this.state.user1}
                  name='user1'
                  placeholder='Github Username'
                  onChange={this.user1Form}
                />
                <input className='submit-btn' type='submit' value='Submit' />
              </form>
              <div className='user1-data'>
                <div className='user1'>
                  {(this.state.data.length > 0 ? this.state.data : []).map(
                    (elm) => {
                      return (
                        <>
                          <img
                            className='user1-img'
                            src={elm.avatar_url}
                            alt=''
                          />
                          <p>{elm.login} </p>
                        </>
                      );
                    }
                  )}
                  <span onClick={this.displayForm1}>❌</span>
                </div>
              </div>

              {/* form 2 section  */}

              <form className='flex-50' id='form2' onSubmit={this.user2Submit}>
                <input
                  className='input'
                  type='text'
                  value={this.state.user2}
                  name='user2'
                  placeholder='Github Username'
                  onChange={this.user2From}
                />
                <input className='submit-btn' type='submit' value='Submit' />
              </form>

              <div className='user2-data'>
                <div className='user2'>
                  {(this.state.data2.length > 0 ? this.state.data2 : []).map(
                    (data) => {
                      return (
                        <>
                          <img
                            className='user1-img'
                            src={data.avatar_url}
                            alt=''
                          />
                          <p>{data.login} </p>
                        </>
                      );
                    }
                  )}
                  <span onClick={this.displayForm2}>❌ </span>
                </div>
              </div>
            </div>
            <div id='bettal-btn'>
              <button onClick={this.bettal}>Bettal</button>
            </div>
          </div>
        </main>

        {/* 
        bettal section  */}

        <div id='userdata-display'>
          <section className='display-section'>
            <div className='flex-30'>
              {value1 > value2 ? (
                <h1 className='h1'> Winner</h1>
              ) : (
                <h1 className='h1'>Lossser</h1>
              )}

              {this.state.data.map((elm) => {
                return (
                  <div className='battel-data-div'>
                    <img className='bettal-img' src={elm.avatar_url} alt='' />
                    <h2 className='score'> Score :{value1} </h2>
                    <h3 className='user-name'>{this.state.user1} </h3>
                    <p className='login-user'>
                      <i class='fa-solid fa-user'></i> {elm.login}
                    </p>

                    <p className='location'>
                      <i class='fa-solid fa-compass'></i>
                      {elm.location}
                    </p>
                    <p className='followers'>
                      <i class='fa-solid fa-users'></i>
                      Followers:
                      {elm.followers}
                    </p>
                    <p className='following'>
                      {' '}
                      <i class='fa-solid fa-users-line'></i>
                      Followings:
                      {elm.following}
                    </p>
                    <p className='repo'>
                      {' '}
                      <i class='fa-solid fa-code'></i>
                      Repositories :{elm.public_repos}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className='flex-30'>
              {value1 < value2 ? (
                <h1 className='h1'> Winner</h1>
              ) : (
                <h1 className='h1'>Lossser</h1>
              )}

              {this.state.data2.map((elm) => {
                return (
                  <div className='battel-data-div'>
                    <img className='bettal-img' src={elm.avatar_url} alt='' />
                    <h2 className='score'>Score {value2} </h2>
                    <h3 className='user-name'>{this.state.user2} </h3>
                    <p className='login-user'>
                      {' '}
                      <i class='fa-solid fa-user'></i> {elm.login}
                    </p>
                    <p className='location'>
                      <i class='fa-solid fa-compass'></i> {elm.location}
                    </p>
                    <p className='followers'>
                      <i class='fa-solid fa-users'></i> Followers:
                      {elm.followers}
                    </p>
                    <p className='following'>
                      <i class='fa-solid fa-users-line'></i>
                      Followings:
                      {elm.following}
                    </p>
                    <p className='repo'>
                      {' '}
                      <i class='fa-solid fa-code'></i>
                      Repositories :{elm.public_repos}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
          <div className='display-btn'>
            <button onClick={this.reset}> Reset</button>
          </div>
        </div>
      </>
    );
  }
}
