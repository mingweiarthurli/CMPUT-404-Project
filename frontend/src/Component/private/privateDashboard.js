import React, { useState, useEffect } from "react";
import { getIdUsers } from "../../ApiFetchers/getters/Axios";
import { SliceLocalID } from "../../ClassSupport/APICalls/SliceLocalID";
import ProfileForm from "../Fragments/Profile";
import TopBar from "../Fragments/TopBar";
import { Segment } from "semantic-ui-react";
import BottomBar from "../Fragments/BottomBar";

const PrivateDashboard = () => {
  const [current, setCurrent] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const profileList = async () => {
      setIsLoading(true);
      setIsError(false);
      let currentID = SliceLocalID();
      try {
        let fetcher = await getIdUsers(currentID).then(response => {
          let resdata = response.data;
          setCurrent(resdata);
          //console.log(resdata);
        }); //get data from api's url
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      setIsLoading(false);
    };
    profileList();
  }, []);
  return (
    <div>
      <TopBar />
      <Segment>
        {isError ? <p>An Error Occurred</p> : <br />}
        {isLoading ? <p> Loading </p> : <ProfileForm props={current} />}
      </Segment>
      <BottomBar />
    </div>
  );
};
export default PrivateDashboard;

/*for (let i in resdata) {
  console.log(`${i}: ${resdata[i]}`);
  setCurrent({ ...current, [i]: resdata[i] });
}*/
/*id: "",
  host: "",
  displayName: "",
  firstname: "",
  lastname: "",
  github: "",
  url: "",
  email: "",
  bio: ""
});*/
