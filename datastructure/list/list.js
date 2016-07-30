'use strict';

import DataStructure from '../src/datastructure';

console.log(DataStructure);

let movieList = new DataStructure.List();

for (let i = 0; i < 10; i++) {
    movieList.append(i);
}

console.log(movieList.toString());

function displayList(list) {
    for (list.front(); list.currPos() < list.length() - 1; list.next()) {
        console.log(list.currPos(), list.getElement());
    }
    list.next();
    console.log(list.currPos(), list.getElement());
}
displayList(movieList);


