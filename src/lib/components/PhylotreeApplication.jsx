import React, {Component} from "react";
import Button from 'react-bootstrap/Button'
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

function Reload(props) {
  return (
    <Button
    title="Reload tree"
    variant="secondary"
    {...props}
    >
      <FontAwesomeIcon icon={faRedo} size="lg" style={{width:15}}/>
    </Button>
  )
}
function HorizontalExpansionButton(props) {
  return (<Button
    title="Expand horizontally"
    variant="secondary"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowLeft} style={{width:10}}/>
    <FontAwesomeIcon key={2} icon={faArrowRight} style={{width:10}}/>
  </Button>);
}

function HorizontalCompressionButton(props) {
  return (<Button
    title="Compress horizontally"
    variant="secondary"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowRight} style={{width:10}} />
    <FontAwesomeIcon key={2} icon={faArrowLeft} style={{width:10}}/>
  </Button>);
}

function VerticalExpansionButton(props) {
  return (<Button
    style={{ fontSize: 12,display: "flex", flexDirection: "column"}}
    title="Expand vertically"
    variant="secondary"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowUp} />
    <FontAwesomeIcon key={2} icon={faArrowDown} />
  </Button>);
}

function VerticalCompressionButton(props) {
  return (<Button
    style={{fontSize: 12,display: "flex", flexDirection: "column"}}
    title="Compress vertically"
    variant="secondary"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowDown} />
    <FontAwesomeIcon key={2} icon={faArrowUp}/>
  </Button>);
}


function AscendingSortButton(props) {
  return (<Button
    title="Sort in ascending order"
    variant="secondary"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faSortAmountUp} flip="vertical"/>
  </Button>);
}


function DescendingSortButton(props) {
  return (<Button
    title="Sort in descending order"
    variant="secondary"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faSortAmountUp}/>
  </Button>);
}


function AlignTipsRightButton(props) {
  return (<Button
    title="Align tips to right"
    variant="secondary"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faAlignRight}/>
  </Button>);
}


function AlignTipsLeftButton(props) {
  return (<Button
    title="Align tips to left"
    variant="secondary"
    
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faAlignLeft}/>
  </Button>);
}
function DownloadImagetButton(props) {
  return (<Button
    title="Save image"
    variant="secondary"
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
      collapsed:[],
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
  findValue(haystack,needle) {
    for(const item of haystack) {
       if(item.data.name === needle.data.name && item.children[0].data.name===needle.children[0].data.name ) {
          return true;
       }
    }
    return false;
 }
  toggleCollapse(node) {
    
    if (this.findValue(this.state.collapsed,node)) {
      const newCollapsed = this.state.collapsed.filter(element => (element.children[0].data.name !== node.children[0].data.name && element.children[1].data.name !== node.children[1].data.name));
        this.setState({ collapsed: newCollapsed });
      
    } else if(!this.findValue(this.state.collapsed,node) || this.state.collapsed==[]) {
      this.setState(prevState => ({collapsed: [...prevState.collapsed, node]}))
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
        > {props.nodeC ? <a class="dropdown-item" tabindex="-1" onClick={()=> {this.toggleCollapse(props.nodeC)}}
        >{this.findValue(this.state.collapsed,props.nodeC) ?'Expand Subtree' : 'Collapse Subtree'}</a> : null }
             {props.nodeC ? <div class="dropdown-divider"></div>: null}
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
        <div style={{marginTop: 20}}>
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
        
          title="Toggle the display of taxa names"
          variant="secondary"
          onClick={()=>this.setState({showlabel: !this.state.showlabel})}
          >
          <img src={showLabel} width= "18" />
          </Button>
          <Button
          
          title="Toggle the display of branch lengths"
          variant="secondary"
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

