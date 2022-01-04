import React from "react";
import "./FindFriend.css";
import { PeopleContext } from "./../../context/peopleContext";
import { UserContext } from "../../context/userContext";
import SearchInput from "./../../components/search_input/SearchInput";
import PeopleYouKnow from "../../components/people_you_know/PeopleYouKnow";
import People from "./../../components/people/People";
import httpAgent from "../../utils/httpAgent";

function FindFriend() {
  const userContext = React.useContext(UserContext);
  const peopleContext = React.useContext(PeopleContext);
  const people = peopleContext.people;
  const userId = userContext.user._id;
  const limitRef = React.useRef(20);
  const offsetRef = React.useRef(0);
  const queryRef = React.useRef("");
  const rootRef = React.useRef();

  const fetchPeople = async () => {
    try {
      const option = {
        headers: { Accept: "application/json" },
        body: null,
      };
      const limit = limitRef.current;
      const offset = offsetRef.current;
      const query = queryRef.current;
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/people/?q=${query}&limit=${limit}&offset=${offset}`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        const people = jsonResponse["payload"];
        peopleContext.setPeople(prevState => {
          return [...prevState, ...people["result"]];
        });
        return people["remaining"];
      } else {
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
    return 0;
  };

  const callback = async (entries, observer) => {
    if (entries[0].isIntersecting) {
      observer.unobserve(entries[0].target);
      const result = await fetchPeople();
      if (result > 0) {
        const peopleList = document.querySelectorAll(".People");
        const target = peopleList[peopleList.length - 1];
        observer.observe(target);
        offsetRef.current += 20;
      }
    }
  };

  const infiniteScroll = () => {
    const options = {
      root: rootRef.current,
      threshold: 1.0,
    };
    const peopleList = document.querySelectorAll(".People");
    const target = peopleList[peopleList.length - 1];
    const interSectionObserver = new IntersectionObserver(callback, options);
    interSectionObserver.observe(target);
  };

  React.useEffect(() => {
    const fetchAsync = async () => {
      await fetchPeople();
      infiniteScroll();
      offsetRef.current += 20;
    };
    fetchAsync();
    return () => {
      peopleContext.setPeople([]);
    };
  }, []);
  return (
    <div className="FindFriend">
      <div className="FindFriend-heading">
        <h4>Find Friend</h4>
        <span className="material-icons-outlined">person_add</span>
      </div>
      <div className="FindFriend-search">
        <SearchInput name="people" placeholder="Find new people" />
      </div>

      <div className="FindFriend-people-know">
        <h4>People you may know</h4>
        <PeopleYouKnow />
      </div>

      <div ref={rootRef} className="FindFriend-people">
        {people.map(person => {
          if (person._id !== userId) {
            return <People key={person._id} person={person} />;
          }
        })}
      </div>
    </div>
  );
}

export default FindFriend;
