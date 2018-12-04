import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';

const Home = () => <div data-testid="home-route">Home</div>;
const About = () => <div data-testid="about-route">About</div>;
const NoMatch = () => <div data-testid="no-match-route">No match</div>;

class Main extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export {Main};
