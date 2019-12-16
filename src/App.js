import React from 'react';
import './App.css';
import './customStyles.css';
import Banner from './components/Banner';
import Overview from './components/Overview';
import Details from './components/Details';
import Add from './components/Add';
import Edit from './components/Edit';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      view: '',
      params: {},
    }
  }

  changeView(view='', params={}){
    this.setState({
      view,
      params
    })
  }

  render(){
    const { view } = this.state;

    let ActiveView;

    switch(view){
      case 'overview':
        ActiveView = Overview;
        break;
      case 'details':
          ActiveView = Details;
          break;
      case 'add':
          ActiveView = Add;
          break;
      case 'edit':
          ActiveView = Edit;
          break;
      default:
        ActiveView = Overview;
        break;
    }

    return (
      <>
        <Banner changeView={this.changeView.bind(this)}/>
        <main className="container">
          <ActiveView {...this.state.params} changeView={this.changeView.bind(this)}/>
        </main>
      </>
    );
  }
}

export default App;
