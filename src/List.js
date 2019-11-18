import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const List = ({ list, onChange }) => (
  <div>
    {list &&
      list.items &&
      list.items.map((item, index) => (
        <label key={list.name + list.description + index}>
          <Checkbox
            color="primary"
            type="checkbox"
            name={'check-' + index}
            key={index}
            onChange={onChange}
            data-key={index}
          />
          <span />
          {item}
        </label>
      ))}
  </div>
);

export default List;
