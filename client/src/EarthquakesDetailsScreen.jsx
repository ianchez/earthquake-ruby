import { useParams, Link } from "react-router-dom";
import useEarthquakeById from "./hooks/useEarthquakeById";

const EarthquakesDetailsScreen = () => {
  const { id } = useParams();
  const { earthquake, loading } = useEarthquakeById(id);

  return (
    <div className="screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/earthquakes">Go back to Earthquakes</Link><br />

          <h1>{earthquake.attributes.title}</h1>
          <p>
            Magnitude: {earthquake.attributes.magnitude} {earthquake.attributes.mag_type}<br/>
            Time: {new Date(earthquake.attributes.time).toLocaleString()}<br />
            Place: {earthquake.attributes.place}<br />
            Tsunami: {earthquake.attributes.tsunami ? 'Yes' : 'No'}<br/>
          </p>

          <p>
            Coordinates <br />
            Latitude: {earthquake.attributes.coordinates.longitude}<br />
            Longitude: {earthquake.attributes.coordinates.latitude}
          </p>

          <p>
            More Info: <a
              href={earthquake.links.external_url}
              target="_blank"
              rel="noreferrer"
            >
              USGS Event Page
            </a>
          </p>

          <form>
            <label className="left w100">
              Add a comment:<br/>
              <textarea />
            </label>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default EarthquakesDetailsScreen;
