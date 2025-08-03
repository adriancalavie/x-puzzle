import "./App.css";
import { Grid } from "./components/grid";
import { TilesProvider } from "./components/providers/tiles-provider";

function App() {
  return (
    <>
      <TilesProvider rank={5}>
        <Grid />
      </TilesProvider>
    </>
  );
}

export default App;
