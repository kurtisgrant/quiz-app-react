import axios from 'axios';

export default (id) => {
  return axios({
    method: 'get',
    url: `http://localhost:8080/users/${id}`
  }).catch(err => {
    console.log("Error in setUserHelper: ", err);
  });
};
