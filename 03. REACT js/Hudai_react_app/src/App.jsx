import Clock from "./Clock"


function App() {
  console.log("App component rendered") ; //to check if the component is re-rendered or not

  return (
    <div><Clock locale= "bn-BD"/></div>
  )
}

export default App
