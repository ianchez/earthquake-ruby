import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Select from 'react-select';
import useEarthquakes, { DEFAULT_VALUES as QUAKE_DEFAULTS } from "./hooks/useEarthquakes";

const selectorOptions = [
  { value: "all", label: "All"},
  ...QUAKE_DEFAULTS.magType.map((type) => ({ value: type, label: type }))
];

const EarthquakesScreen = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(QUAKE_DEFAULTS.page);
  const [perPage, setPerPage] = useState(QUAKE_DEFAULTS.perPage);
  const [magTypeSelectOptions, setMagTypeSelectOptions] = useState([selectorOptions[0]]);
  const [allSelected, setAllSelected] = useState(true);

  // convert to string to avoid infine loop
  const magTypeSelected = magTypeSelectOptions.map(op => op.value).join(',');

  const { earthquakes, loading, totalPages } = useEarthquakes({
    magType: allSelected ? '' : magTypeSelected,
    page,
    perPage
  });

  const handlePageChange = (e) => {
    setPage(Number(e.target.value));
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
  };

  const handleMagTypeSelectorChange = (options) => {
    const alreadyAll = magTypeSelectOptions.find(option => option.value === "all");

    if (options.length > 1) {
      if (alreadyAll) {
        setMagTypeSelectOptions(options.filter(option => option.value !== "all"));
        setAllSelected(false);
        return;
      }

      const includesAll = options.find(option => option.value === "all");
      if (includesAll) {
        setMagTypeSelectOptions([selectorOptions[0]]);
        setAllSelected(true);
        return;
      }
    }

    setMagTypeSelectOptions(options);
    setAllSelected(false);
  };

  const handleItemPress = (id) => {
    navigate(`/earthquakes/${id}`);
  }

  return (
    <div className="screen">
      <Link to="/">Go back to Home</Link><br />

      <h1>Earthquakes</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <label>
          Page:<br />
          <input type="number" value={page} onChange={handlePageChange} />
          <span> of {totalPages}</span>
        </label>

        <label>
          Items per Page:<br />
          <input type="number" value={perPage} onChange={handlePerPageChange} />
        </label>

      </div>
      
      <label className="w100">
        Magnitude Type:
        <Select
          isMulti
          defaultValue={selectorOptions[0]}
          options={selectorOptions}
          onChange={handleMagTypeSelectorChange}
          value={magTypeSelectOptions}
        />
      </label>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {earthquakes.map((earthquake) => (
              <li className="pressable" key={earthquake.id} onClick={() => handleItemPress(earthquake.id)}>
                {earthquake.attributes.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default EarthquakesScreen;
