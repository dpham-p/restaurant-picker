import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    terms: []
  });

  const { terms } = settings;

  const onClick = e => {
    if (!e.target.className.includes('active')) {
      e.target.classList.add('active');
      setSettings({ ...settings, terms: [...terms, e.target.textContent] });
    } else {
      e.target.classList.remove('active');
      setSettings({
        ...settings,
        terms: terms.filter(term => e.target.textContent !== term)
      });
    }
  };

  console.log(terms);
  return (
    <div className='container'>
      <h3>Restaurant Types</h3>
      <div className='btn-group btn-group-* flex-wrap'>
        <button type='button' className='btn btn-light' onClick={onClick}>
          American
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          Chinese
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          French
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          Greek
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          Italian
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          Japanese
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          Korean
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          Mexican
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          Thai
        </button>
        <button type='button' className='btn btn-light' onClick={onClick}>
          Vietnamese
        </button>
      </div>
    </div>
  );
};

export default Settings;
