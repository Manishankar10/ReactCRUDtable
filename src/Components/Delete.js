import React from "react";

export default function Delete(props) {
  const handleButton1=(e)=> {
    let index=props.allData.findIndex(x=>x.id===props.data.id)
    props.allData.splice(index, 1);
    props.handleButton(props.allData);
    e.stopPropagation();
  }
  return (
    <div>
      <button className="bd" onClick={(e) => handleButton1(e, props.data)}>Delete</button>
    </div>
  );
}
