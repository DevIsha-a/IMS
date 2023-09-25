import TodoList from "../../Components/TodoList/TodoList";
import "./Home.css";

const Home = () => {
  return <>
  {/* <div>
    <div className="side-panel">
      <h5>DASHBOARD</h5>
      <ul className="list-unstyled">
        <li>Todo List</li>
        <li>IMS</li>
      </ul>
    </div>
  </div> */}
    <TodoList />
  </>
}

export default Home;