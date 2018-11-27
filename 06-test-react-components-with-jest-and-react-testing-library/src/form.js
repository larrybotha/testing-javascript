import React from 'react';

const Form = ({isAccessible}) => (
  <form>
    {isAccessible ? <label htmlFor="username">Username</label> : null}
    <input id="username" placeholder="username" name="username" />
  </form>
);

export {Form};
