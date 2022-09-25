const Header = (props) => {
  console.log(props);
  
  function lightMood() {
    let div = document.getElementById('light');
    div.style.display = 'none';
    let div2 = document.getElementById('bulb');
    div2.style.display = 'inline-block';
    let div3 = document.getElementById('root');
    div3.style.backgroundColor = 'black';
  }

  function darkMood() {
    let div = document.getElementById('light');
    div.style.display = 'inline-block';
    let div2 = document.getElementById('bulb');
    div2.style.display = 'none';
    let div3 = document.getElementById('root');
    div3.style.backgroundColor = 'white';
  }

  function popular() {
    let value = 0;
    props.item2(value);
  }

  function bettal() {
    let value = 1;
    props.item2(value);
  }

  return (
    <>
      <div className='header-div'>
        <div className='header'>
          <p onClick={popular} className={props.item == 0 ? 'Active' : ''}>
            Popular
          </p>
          <p onClick={bettal} className={props.item === 1 ? 'Active' : ''}>
            Battel
          </p>
        </div>
        <div>
          <div onClick={lightMood} id='light'>
            Light Mood 🔦
          </div>
          <div id='bulb' onClick={darkMood}>
            Dark Mood 💡
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
