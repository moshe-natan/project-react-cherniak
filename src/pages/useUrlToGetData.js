import React from 'react';
const useUrlToGetData = (url) => {
    try {
        let data;
        fetch(url)
          .then(res => res.json())
          .then(json => data = json)
          return data
    } catch {
        console.log('Error');
    }
}
 
export default useUrlToGetData;