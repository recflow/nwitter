import React, { useState } from "react";

const Home = () => {
  const [neweet, setNeweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNeweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={neweet}
          onChange={onChange}
          type="text"
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={140}
        />
        <input type="submit" value="NEWeet" />
      </form>
    </div>
  );
};
export default Home;
