import React from "react";
// import PhylotreeApplication from "./components/PhylotreeApplication";
// import PhylotreeApplication from "react-phylotree/PhylotreeApplication"
import SVG from "./components/svg";
// import "bootstrap/dist/css/bootstrap.min.css";
import Phylotree from "react-phylotree";
import { scaleLinear } from "d3-scale";
import PhylotreeApplication from "./components/PhylotreeApplication";
import TooltipContainer from "./components/tooltip_container"
import "./components/styles/phylotree.css"
function App() {
  
 const cd2_relax = "((((Pig{Test}:0.147969,Cow{Test}:0.21343){Test}:0.085099,Horse{Test}:0.165787,Cat{Test}:0.264806):0.058611,((RhMonkey{Reference}:0.002015,Baboon{Reference}:0.003108){Reference}:0.022733,(Human{Reference}:0.004349,Chimp{Reference}:0.000799){Reference}:0.011873):0.101856):0.340802,Rat:0.050958,Mouse:0.09795);";
  const size_props = { width: 900, height: 900};
      // const color_branch = {stroke: 'red'}
  return (
    <div style={{ maxWidth: 1140, padding: 10 }} className="container-fluid">
   <PhylotreeApplication/>
  </div>
    // React.createElement("hr", null), React.createElement("h4", null, "Custom"), React.createElement("p", null, "Requires foreknowledge of annotations."), React.createElement(SVG, null, React.createElement(Phylotree, {
    //   newick: newick,
    //   highlightBranches: {
    //     Test: "red",
    //     Reference: "black"
    //   }
    // }))
  );
}

export default App;