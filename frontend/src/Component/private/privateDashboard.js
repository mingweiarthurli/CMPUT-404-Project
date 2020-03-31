import React, { useState, useEffect } from "react";
import { getCurrentUsers } from "../../ApiFetchers/getters/Axios";

const PrivateDashboard = () => {
  const [current, setCurrent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCurrentUsers()
      .then(authorData => {
        console.log(authorData);
        setCurrent(authorData);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  /*useEffect(() => {
    const profileList = async () => {
      setIsLoading(true);
      try {
        let followersFetcher = await getCurrentUsers().then(response => {
          console.log(response.data);
        }); //get data from api's url
        //console.log(followersFetcher.data);
        setCurrent(followersFetcher);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    profileList();
  }, []);*/
  return <div>{isLoading ? <p>Loading</p> : <p>{current}</p>}</div>;
};
export default PrivateDashboard;
