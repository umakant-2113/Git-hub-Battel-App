import Header from './Header';
import { useState } from 'react';
import Popular from './Popular';
import Battel from './Battel';
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className='container'>
        <Header item={count} item2={setCount} />
      </div>
      {count === 0 ? <Popular /> : ''}
      {count === 1 ? <Battel /> : ''}
    </>
  );
};

export default App;
