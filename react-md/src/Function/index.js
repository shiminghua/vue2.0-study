import React, { Component } from 'react';

function Repeat(props) {
  let item = [];
  console.log(props);
  for (let i = 0, len = props.numTimes; i < len; i++) {
    item.push(props.children(i));
  }
  return <div>{item}</div>
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list.</div>}
    </Repeat>
  );
}

export default ListOfTenThings;
