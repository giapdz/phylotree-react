import React, {Component} from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import RBButton from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, faArrowUp, faArrowDown, faArrowRight,
  faSortAmountUp, faAlignRight, faAlignLeft,faRedo, faImage
} from "@fortawesome/free-solid-svg-icons";
import showLabel from "./styles/show_label.png"
import showLength from "./styles/icon_length.png"
import Phylotree from "./phylotree";
import TooltipContainer from "./tooltip_container";
import "./styles/phylotree.css"
import "bootstrap/dist/css/bootstrap.min.css";
const saveSvgAsPng = require('save-svg-as-png')

const imageOptions = {
  scale: 5,
  encoderOptions: 1,
  backgroundColor: 'white',
}

function Button(props) {
  return (<OverlayTrigger
    placement="top"
    overlay={<Tooltip>
      {props.title}
    </Tooltip>}
  >
    <RBButton
      variant="secondary"
      {...props}
    >
      {props.children}
    </RBButton>
  </OverlayTrigger>);
}
function Reload(props) {
  return (
    <Button
    style={{fontSize: 10}}
    title="Reload tree"
    {...props}
    >
      <FontAwesomeIcon icon={faRedo} size="lg" />
    </Button>
  )
}
function HorizontalExpansionButton(props) {
  return (<Button
    style={{ fontSize: 10 }}
    title="Expand horizontally"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowLeft} />
    <FontAwesomeIcon key={2} icon={faArrowRight} />
  </Button>);
}

function HorizontalCompressionButton(props) {
  return (<Button
    style={{ fontSize: 10 }}
    title="Compress horizontally"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowRight} />
    <FontAwesomeIcon key={2} icon={faArrowLeft} />
  </Button>);
}

function VerticalExpansionButton(props) {
  return (<Button
    style={{fontSize: 10, display: "flex", flexDirection: "column"}}
    title="Expand vertically"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowUp} />
    <FontAwesomeIcon key={2} icon={faArrowDown} />
  </Button>);
}

function VerticalCompressionButton(props) {
  return (<Button
    style={{fontSize: 10, display: "flex", flexDirection: "column"}}
    title="Compress vertically"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowDown} />
    <FontAwesomeIcon key={2} icon={faArrowUp} />
  </Button>);
}


function AscendingSortButton(props) {
  return (<Button
    title="Sort in ascending order"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faSortAmountUp} flip="vertical"/>
  </Button>);
}


function DescendingSortButton(props) {
  return (<Button
    title="Sort in descending order"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faSortAmountUp}/>
  </Button>);
}


function AlignTipsRightButton(props) {
  return (<Button
    title="Align tips to right"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faAlignRight}/>
  </Button>);
}


function AlignTipsLeftButton(props) {
  return (<Button
    title="Align tips to left"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faAlignLeft}/>
  </Button>);
}
function DownloadImagetButton(props) {
  return (<Button
    title="Save image"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faImage} flip="vertical"/>
  </Button>);
}

function TooltipContents(props) {
  return  (<TooltipContainer 
    tooltip_width={10}
    tooltip_height={50}
    
    {...props}
  >
    <rect
      x={0}
      y={0}
      width={180}
      height={20}
      
      fill='bisque'
    />
    <text
      x={90}
      y={15}
      fill="cadetblue"
      textAnchor="middle"
    >
     Length:  {props.data.attribute}
    </text>
  </TooltipContainer>) ;
}

class PhylotreeApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: null,
      width: props.width,
      height: props.height,
      sort: null,
      reroot:null,
      collapsed:null,
      internal: false,
      newick: props.newick,
      support: props.support,
      nodeName:'',
      showlabel: true,
    };
    this.baseState = this.state;
    
  }
 
  
  toggleDimension =(dimension, direction) => {
    const new_dimension = this.state[dimension] +
      (direction === "expand" ? 100 : -100),
      new_state = {};
    new_state[dimension] = new_dimension;
    this.setState(new_state);
    console.log([dimension])
  }
  handleSort= (direction) => {
    this.setState({sort: direction});
  }
  alignTips = (direction) => {
    this.setState({alignTips: direction});
  }
  myChangeHandler = (event) => {
    this.setState({nodeName: event.target.value});
    
  }
  toggleCollapse(node) {
    if (this.state.collapsed) {
      this.setState({collapsed: null})
      this.setState({isNodeCollapsed: false})
    } else {
      this.setState({collapsed: node})
      this.setState({isNodeCollapsed: true})
    }
  
  }
  
 labelStyler =(branch) => {
      var rx = new RegExp (this.state.nodeName,"i");
      const identifier = branch.name.search(rx)
      if(this.state.nodeName !== '') {
      const  fill = identifier!== -1 ? 'red' : 'black'
      return { fill };
      }
    }
   handleClick = () => {
      saveSvgAsPng.saveSvgAsPng(document.getElementById('svg-chart'), 'shapes.png', imageOptions);
    }
   openDropdown= (props) =>{
    
      return ( 
        <div class="dropdown-menu" role="menu"
        style= {{...props}}
        >    <a class="dropdown-item" tabindex="-1" onClick={()=> this.toggleCollapse(props.nodeC)}
        >{this.state.isNodeCollapsed ?'Expand Subtree' : 'Collapse Subtree'}</a>  
             <div class="dropdown-divider"></div>
              <a class="dropdown-item" tabindex="-1" onClick={()=> {this.setState({reroot: props.node});
              }}>Reroot on this node</a>
               
             </div> 
             
      )
    }
    render() {
    const { padding } = this.props;
    const { width, height } = this.state;
    return (<div class="container" >
      <div style={{display: "inline-block",  width:800}} >
        <div>
        <ButtonGroup >
          <Reload
          onClick={() => {
            this.setState(this.baseState)}}
          />
          <HorizontalExpansionButton
            onClick={()=>this.toggleDimension("width", "expand")}
          />
          <HorizontalCompressionButton
            onClick={()=>this.toggleDimension("width", "compress")}
          />
          <VerticalExpansionButton
            onClick={()=>this.toggleDimension("height", "expand")}
          />
          <VerticalCompressionButton
            onClick={()=>this.toggleDimension("height", "compress")}
          />
          <AscendingSortButton
            onClick={()=>this.handleSort("ascending")}
          />
          <DescendingSortButton
            onClick={()=>this.handleSort("descending")}
          />
          <AlignTipsLeftButton
            onClick={()=>this.alignTips("left")}
          />
          <AlignTipsRightButton
            onClick={()=>this.alignTips("right")}
          />
          <Button
          style={{fontSize: 10, width: 40}}
          title="Toggle the display of taxa names"
          onClick={()=>this.setState({showlabel: !this.state.showlabel})}
          >
          <img src={showLabel} width= "18" />
          </Button>
          <Button
          style={{fontSize: 10, width:40}}
          title="Toggle the display of branch lengths"
          onClick={()=>this.setState({attribute: !this.state.attribute})}
          >
          <img src={showLength} width= "20" />
          </Button>
          <DownloadImagetButton onClick={this.handleClick} />
        </ButtonGroup>
        
        <form style={{display: "inline-block", float: "right"}}>
      <input
      type='text'
      name='find node'
      placeholder='Search tree'
      style={{height:40, textAlign:"center"}}
      onChange={this.myChangeHandler}
      />
    </form>
        
        <div class="row align-items-start" style={{width: 470}} >
        {
          (this.state.support.split('/')[0]) ?
          (<div class="col">
          <input
            type='checkbox'
            onChange={()=>this.setState({value1: !this.state.value1})}
            style={{marginRight: 5}}
          />
           <text>{this.state.value1 ? 'Hide' : 'Show' } {this.state.support.split('/')[0]}</text>
           </div>
          )
          : null
        }
          
          
          {
          (this.state.support.split('/')[1]) ?
          (<div class="col">
          <input
            type='checkbox'
            onChange={()=>this.setState({value2: !this.state.value2})}
            style={{marginRight: 5}}
          />
           <text>{this.state.value2 ? 'Hide' : 'Show' } {this.state.support.split('/')[1]}</text>
           </div>
          )
          : null
        }
            {
          (this.state.support.split('/')[2]) ?
          (<div class="col">
          <input
            type='checkbox'
            onChange={()=>this.setState({value3: !this.state.value3})}
            style={{marginRight: 5}}
          />
           <text>{this.state.value3 ? 'Hide' : 'Show' } {this.state.support.split('/')[2]}</text>
           </div>
          )
          : null
        }
        
          
        {
          (this.state.support.split('/')[3]) ?
          (<div class="col">
          <input
            type='checkbox'
            onChange={()=>this.setState({value4: !this.state.value4})}
            style={{marginRight: 5}}
          />
           <text>{this.state.value4 ? 'Hide' : 'Show' } {this.state.support.split('/')[3]}</text>
           </div>
          )
          : null
        }
             {
          (this.state.support.split('/')[4]) ?
          (<div class="col">
          <input
            type='checkbox'
            onChange={()=>this.setState({value5: !this.state.value5})}
            style={{marginRight: 5}}
          />
           <text>{this.state.value5 ? 'Hide' : 'Show' } {this.state.support.split('/')[4]}</text>
           </div>
          )
          : null
        }
        </div>
        
        </div>
      </div>
        <Phylotree
          width={width}
          height={height}
          transform={`translate(${padding}, ${padding})`}
          labelStyler={this.labelStyler}
          newick={this.state.newick}
          alignTips={this.state.alignTips}
          sort={this.state.sort}
          reroot={this.state.reroot}
          collapsed={this.state.collapsed}
          showAttributes={this.state.attribute}
          showLabels ={this.state.showlabel}
          showValue1={this.state.value1}
          showValue2={this.state.value2}
          showValue3={this.state.value3}
          showValue4={this.state.value4}
          showValue5={this.state.value5}
          tooltip ={TooltipContents}
          isOpen={this.openDropdown}
          includeBLAxis
        />
   
    </div>); 
  }
}
PhylotreeApplication.defaultProps = {
  padding: 100,
  height: 600,
  width: 600,
  support: "value 1/value 2/value 3/value 4/value 5"
};

export default PhylotreeApplication;

