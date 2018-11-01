import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/style.css'

const title = 'Choresy';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();
