import { useEffect, useState } from "react";
import TeamModal from "./Modal";

function NBATable({ teams, text }) {
  const [show, setShow] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const [sorted, setSorted] = useState(false);

  const openModal = (e) => {
    setBgColor(e);
    setShow(e);
  };

  const handleClose = () => {
    setShow(null);
    setBgColor(null);
  };

  useEffect(() => {
    const p = Math.ceil(
      teams.filter((val) => {
        if (text === "") {
          return val;
        } else if (val.name.toLowerCase().includes(text.toLowerCase())) {
          return val;
        }
        return null;
      }).length / 7
    );
    setTotalPage(p);
    setPage(0);
  }, [text]);

  if (teams === null) return <h1>loading...</h1>;
  return (
    <>
      <br />
      <button
        className="btn btn-primary my-2 p-2 text-white sort"
        style={{ width: "200px" }}
        onClick={() => setSorted((prev) => !prev)}
      >
        {" "}
        {sorted ? "Unsort" : "Sort By Team Name"}
      </button>
      <table className="table mt-2">
        <thead className="text-white" style={{ backgroundColor: "#074684" }}>
          <tr>
            <th>Teams Name</th>
            <th>City</th>
            <th>Abbreviation</th>
            <th>Conference</th>
            <th>Division</th>
          </tr>
        </thead>
        <tbody className="mt-2 tbody">
          {teams === null ? (
            <h1>loading...</h1>
          ) : (
            []
              .concat(
                teams.filter((val) => {
                  if (text === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(text.toLowerCase())
                  ) {
                    return val;
                  }
                  return null;
                })
              )
              .sort((a, b) => {
                if (!sorted) {
                  return 0;
                }
                return a.name > b.name ? 1 : -1;
              })
              .slice(page, page + 7)
              .map((team) => {
                return (
                  <tr
                    key={team.id}
                    onClick={() => openModal(team)}
                    style={{
                      backgroundColor: bgColor === team.id ? "gray" : "",
                    }}
                  >
                    <td>{team.name}</td>
                    <td>{team.city}</td>
                    <td>{team.abbreviation}</td>
                    <td>{team.conference}</td>
                    <td>{team.division}</td>
                  </tr>
                );
              })
          )}
        </tbody>
      </table>

      {/* pagination */}
      <div className="d-flex justify-content-end pagination m-2">
        <button
          className="btn-1"
          onClick={() => setPage((prev) => prev - 7)}
          disabled={page < 7}
        >
          {"<"}
        </button>
        <button className="btn-2" onClick={() => setPage(0)}>
          1
        </button>
        <button className="btn-3" onClick={() => setPage((totalPage - 1) * 7)}>
          {totalPage}
        </button>
        <button
          className="btn-4"
          onClick={() => setPage((prev) => prev + 7)}
          disabled={page >= (totalPage - 1) * 7}
        >
          {">"}
        </button>
      </div>

      {show && <TeamModal show={show} handleClose={handleClose} />}
    </>
  );
}

export default NBATable;
