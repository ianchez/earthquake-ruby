import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import useEarthquakeById from "./hooks/useEarthquakeById";
import useQuakeComments from "./hooks/useQuakeComments";

const EarthquakesDetailsScreen = () => {
  const { id } = useParams();
  const { earthquake, loading } = useEarthquakeById(id);
  const {
    comments,
    loading: commentsLoading,
    createComment,
  } = useQuakeComments(id);

  const [comment, setComment] = useState('');

  const handleTextAreaChange = (e) => {
    setComment(e.target.value);
  }

  const handleCreateComment = (e) => {
    e.preventDefault();
    createComment(comment);
    setComment('');
  }

  const disableSubmit = !comment || comment === '';

  return (
    <div className="screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/earthquakes">Go back to Earthquakes</Link><br />

          <h2>{earthquake.attributes.title}</h2>
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

          <form onSubmit={handleCreateComment}>
            <label className="left w100">
              Add a comment:<br/>
              <textarea name="comment" onChange={handleTextAreaChange} value={comment}/>
            </label>
            <button className="w100" type="submit" disabled={disableSubmit}>Add</button>
          </form>

          {commentsLoading ? (
            <p>Loading comments...</p>
          ) : (
            comments.length ? (
              <>
                <h3 style={{ margin: 10, width: "100%" }}>Comments</h3>
                <ul className="comments-list">
                  {comments?.map((comment) => (
                    <li key={comment.id} className="comment">
                      <span className="comment-date">
                        {new Date(comment.created_at).toLocaleString()}<br />
                      </span>
                      {comment.body}
                    </li>
                  ))}
                </ul>
              </>
            ) : null
          )}
        </>
      )}
    </div>
  );
}

export default EarthquakesDetailsScreen;
