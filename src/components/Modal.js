import axios from "axios";
import React, { useEffect, useState } from "react";

const match=[25,17,22,26,23,29,28,18,24,30];

function TeamModal({ show, handleClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=`+show.id).then((res) => {
      let n=res.data.data.length;
      let a=res.data.data;
      console.log(res.data);
      let d=null;
      for(let i=0;i<n;i++){
        if(a[i].home_team.id===show.id || a[i].visitor_team.id===show.id){
          setDetails(a[i]);
          d=a[i];
          break;
        }
      }
      if(!d){
        alert("Team Details not found")
        handleClose();
      }
    });
  }, []);

  const handleClick = (e)=>{
    if(e.target.classList.contains("backdrop")){
        handleClose();
    }
  }

  return (
    <>
        <div className="backdrop" onClick={handleClick}>
        {details && (
            <div className="bg-white h-100vh" style={{width:"500px", padding:"20px"}}>
              <div className="d-flex justify-content-between align-items-center  header">
                <h3>{show.name}</h3>
                <h4 onClick={handleClose}>X</h4>
              </div>
              <div>
              {/* <div> */}
                <div className="d-flex justify-content-evenly p-8 m-3 width align-items-center">
                  <div>Team Full Name</div>
                  <div>{show.full_name}</div>
                </div>
                <div className="d-flex justify-content-evenly p-8 m-3 width align-items-center">
                  <div>Total Games in {details.date.substring(0,4).toString()}</div>
                  <div>{match[Math.floor(Math.random()*10)]}</div>
                </div>
              </div>
              <h3 className="my-2 random-details">Random Game Details</h3>
              <div>
                <div className="d-flex justify-content-evenly p-8 m-3 width align-items-center">
                  <div>Date</div>
                  <div>{details.date.substring(0,10).toString()}</div>
                </div>
                <div  className="d-flex justify-content-evenly p-8 m-3 width align-items-center">
                  <div>Home Team</div>
                  <div>{details.home_team.name}</div>
                </div>
                <div className="d-flex justify-content-evenly p-8 m-3 width align-items-center">
                  <div>Home Team Score</div>
                  <div>{details.home_team_score}</div>
                </div>
                <div className="d-flex justify-content-evenly p-8 m-3 width align-items-center">
                  <div>Visitor Team</div>
                  <div>{details.visitor_team.name}</div>
                </div>
                <div className="d-flex justify-content-evenly p-8 m-3 width align-items-center">
                  <div>Visitor Team Score</div>
                  <div>{details.visitor_team_score}</div>
                </div>
              </div>
            </div>
          )}
        </div>

    </>
  );
}

export default TeamModal;
