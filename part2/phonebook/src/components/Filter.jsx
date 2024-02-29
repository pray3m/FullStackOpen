const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input type="text" value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
