import React from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import Layout from "../components/Layout";

const Home = ({ username }) => {
  return (
    <Layout>
      <Header username={username} />
      <TodoList />
    </Layout>
  );
};

export default Home;
