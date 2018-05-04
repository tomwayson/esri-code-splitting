import React, { Component }  from 'react';
import { loadModules } from 'esri-loader';

export default class Map extends Component {
  // set initial state
  state = { mapLoaded: false };

  componentDidMount() {
    // NOTE: since this is a simple, read-only application
    // we've included a few non-standard performance optimizations
    loadModules(['esri/config'], {
      // also lazy load the CSS for this version
      // NOTE: using view.css instead of main.css to save a few bytes
      css: 'https://js.arcgis.com/4.7/esri/css/view.css'
    }).then(([esriConfig]) => {
      // we're not using secure services
      // so save some bytes by not loading/using the identity manager
      // NOTE: this has to be done before even _loading_ other modules
      esriConfig.request.useIdentity = false;
      // now we can load the Map and MapView modules
      loadModules(['esri/Map', 'esri/views/MapView'])
      .then(([Map, MapView]) => {
        // create a map at a DOM node in this component
        var map = new Map({
          basemap: 'streets'
        })
        new MapView({
          container: 'map',
          map: map,
          zoom: 4,
          center: [15, 65] // longitude, latitude
        }).when(() => {
          // once the map is loaded
          // hide the loading indicator
          // NOTE: this will trigger a rerender
          this.setState({
            mapLoaded: true
          })
        })
      })
    }).catch(err => {
      this.setState({
        mapLoaded: true,
        error: err.message || err
      })
    })
  }

  render() {
    // show any map errors
    const error = this.state.error
    if (error) {
      return <div className='container'>
        <div className='alert alert-danger alert-map'>{error}</div>
      </div>
    }
    // otherwise, show map
    // show a loading indicator until the map is loaded
    const loadingStyle = {
      display: this.state.mapLoaded ? 'none' : 'block'
    }
    // set up the DOM to attach the map to
    return <div>
      <div id='map' style={{height: 'calc(100vh - 190px)'}} />
      <div className='loading' style={loadingStyle}>Loading...</div>
    </div>
  }
}
