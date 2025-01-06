import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <button className="btn btn-primary w-40 rounded-full">Click</button>
      </div>
    </>
  );
}

export default App;
