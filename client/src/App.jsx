import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Latest Earthquakes </h1>

        <p>
          Welcome to the app where you can find the latest earthquakes, 
          and add comments to them for future reference
        </p>
        <p>
          The data gets updated from <a
            href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/"
            target='_blank'
            rel="noreferrer"
          >
            USGS Latest 30 days Feed
          </a> every day, so expect 1 day delay between the feed and this app data
        </p>
      </header>
    </div>
  );
}

export default App;
