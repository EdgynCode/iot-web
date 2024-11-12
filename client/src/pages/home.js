import React from "react";
import Header from "../components/header/Header";
import TodoList from "../components/TodoList";

const Home = ({ username }) => {
  return (
    <>
      <Header username={username} />
      <TodoList />
    </>
  );
};

export default Home;
