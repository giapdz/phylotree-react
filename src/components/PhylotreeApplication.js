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
//const newick = "(LngfishAu:0.1712920518,(LngfishSA:0.1886950015,LngfishAf:0.1650939272):0.1074934723,(Frog:0.2567782559,((((Turtle:0.2218655584,(Crocodile:0.3063185169,Bird:0.2314909181):0.0651737381):0.0365470299,Sphenodon:0.3453327943):0.0204990607,Lizard:0.3867277545):0.0740995375,(((Human:0.1853482056,(Seal:0.0945218205,(Cow:0.0823893414,Whale:0.1013456886):0.0404741864):0.0252648881):0.0341157851,(Mouse:0.0584468890,Rat:0.0906222037):0.1219452651):0.0608099176,(Platypus:0.1922418336,Opossum:0.1511451490):0.0373121980):0.1493323365):0.1276903176):0.0942232386);"
//const newick = "(((EELA:0.150276,CONGERA:0.213019):0.230956,(EELB:0.263487,CONGERB:0.202633):0.246917):0.094785,((CAVEFISH:0.451027,(GOLDFISH:0.340495,ZEBRAFISH:0.390163):0.220565):0.067778,((((((NSAM:0.008113,NARG:0.014065):0.052991,SPUN:0.061003,(SMIC:0.027806,SDIA:0.015298,SXAN:0.046873):0.046977):0.009822,(NAUR:0.081298,(SSPI:0.023876,STIE:0.013652):0.058179):0.091775):0.073346,(MVIO:0.012271,MBER:0.039798):0.178835):0.147992,((BFNKILLIFISH:0.317455,(ONIL:0.029217,XCAU:0.084388):0.201166):0.055908,THORNYHEAD:0.252481):0.061905):0.157214,LAMPFISH:0.717196,((SCABBARDA:0.189684,SCABBARDB:0.362015):0.282263,((VIPERFISH:0.318217,BLACKDRAGON:0.109912):0.123642,LOOSEJAW:0.397100):0.287152):0.140663):0.206729):0.222485,(COELACANTH:0.558103,((CLAWEDFROG:0.441842,SALAMANDER:0.299607):0.135307,((CHAMELEON:0.771665,((PIGEON:0.150909,CHICKEN:0.172733):0.082163,ZEBRAFINCH:0.099172):0.272338):0.014055,((BOVINE:0.167569,DOLPHIN:0.157450):0.104783,ELEPHANT:0.166557):0.367205):0.050892):0.114731):0.295021)";
//const newick = "(KF790010:0.001247,CY147300:0.000623,((CY168239:0.001872,(CY171039:0.001874,KF790389:0.000623)Node7:0.000624)Node5:1e-10,((CY141224:0.001247,(CY147305:1e-10,KF790037:0.000623)Node13:0.000623)Node11:1e-10,(((KF790403:0.000623,KF761507:0.001876)Node18:1e-10,KC526205:0.000623)Node17:1e-10,((CY169303:1e-10,(KF789585:0.000623,CY141202:0.000623)Node25:0.000623)Node23:0.000623,(((KJ667974:0.002501,KJ938675:0.001873)Node30:0.000623,CY134876:1e-10)Node29:0.000623,((KF790414:0.001248,(KF790384:0.001245,KF790408:0.00125)Node37:1e-10)Node35:1e-10,((KF886352:0.001882,(KF790438:0.000623,CY134996:0.001873)Node43:0.000623)Node41:0.001875,(KF789591:0.001879,((KF790049:0.001255,(CY134956:0.000624,CY183153:0.000624)Node51:0.000626)Node49:0.001249,((CY168407:0.004394,CY183065:0.003128)Node55:1e-10,(KF598733:0.002501,((KC892174:1e-10,(KF685747:0.000624,CY168471:0.000625)Node63:0.00375)Node61:0.000624,(((KC892685:0.000624,KC892641:1e-10)Node68:0.001874,KC893110:0.001249)Node67:1e-10,(KC892480:1e-10,(JX913043:0.001249,(KF551075:0.00125,((CY114509:1e-10,(KC892889:1e-10,KC893018:0.002498)Node81:0.005006)Node79:0.001877,(((KC892519:1e-10,KC892498:0.000624)Node86:0.002497,KC892266:0.000623)Node85:0.001026,((KC892156:0.003756,(JX978746:0.001256,KC892407:0.001883)Node93:0.001875)Node91:0.00355,((KC535402:0.000623,(KC882488:0.002498,KC535387:0.001247)Node99:0.001872)Node97:1e-10,(KC535363:0.000623,((KC535396:0.000623,(KC882883:1e-10,KC882867:0.000623)Node107:0.003124)Node105:1e-10,((KC535378:0.001872,KC535375:0.002498)Node111:1e-10,(GQ385891:0.001248,((EU779522:0.001251,(CY037727:1e-10,FJ179354:0.003124)Node119:1e-10)Node117:0.000623,((GQ385889:0.005007,(FJ686933:0.001243,FJ179356:0.003117)Node125:1e-10)Node123:0.000622,(CY173095:0.001245,(((CY173191:1e-10,CY037703:0.001247)Node132:0.000622,CY035062:0.00249)Node131:1e-10,((CY173255:0.001871,(CY044748:1e-10,GQ385846:0.001247)Node139:0.000623)Node137:1e-10,((CY027075:0.000623,(EU199367:1e-10,CY172823:0.000623)Node145:1e-10)Node143:0.000623,(((CY172847:0.000623,CY025643:1e-10)Node150:0.000623,CY172839:0.000623)Node149:0.001247,(((CY026251:0.002497,CY092241:0.00125)Node156:0.000624,CY026019:0.000623)Node155:1e-10,((CY025341:0.002502,(CY172775:0.001247,CY172903:0.000623)Node163:0.001248)Node161:0.000622,(EU199255:0.003134,(CY172431:0.000621,((CY172223:0.003127,(CY172191:0.001254,CY020069:0.000628)Node173:0.000621)Node171:1e-10,((CY092217:0.003119,(CY025485:0.001283,EU516019:0.00059)Node179:0.008843)Node177:0.001868,(CY002080:0.000622,((CY002064:0.001873,(CY002456:0.000626,CY002048:0.002491)Node187:0.001243)Node185:0.003763,(AB434109:0.006307,(((CY088198:0.001245,CY088475:0.000621)Node194:1e-10,CY000257:0.000621)Node193:0.002494,((CY112957:0.003135,CY006859:0.001253)Node199:0.000616,((CY000721:0.001243,(CY114493:1e-10,CY090885:0.002483)Node205:0.002488)Node203:1e-10,((CY001792:0.000621,(CY001600:0.00062,CY002368:0.001865)Node211:1e-10)Node209:1e-10,((CY002304:0.002489,(CY006163:0.001242,CY003632:0.00062)Node217:1e-10)Node215:0.00062,(CY001920:0.003739,(CY001912:0.002498,((CY001504:1e-10,CY006060:0.001241)Node225:0.00062,((CY001744:1e-10,CY002136:0.00124)Node229:0.00062,((CY114309:0.003746,(CY006899:0.001874,CY112901:0.001863)Node235:0.002496)Node233:0.000618,(((CY006579:0.001245,CY006283:0.000621)Node240:0.001244,CY007979:0.001864)Node239:1e-10,((CY006499:0.001241,(CY006491:0.001863,CY006635:0.00124)Node247:1e-10)Node245:0.00062,(((CY036847:0.002495,CY010004:0.001867)Node252:0.000621,CY012200:0.000621)Node251:1e-10,(((CY010028:0.001242,CY009732:0.001242)Node258:1e-10,CY010012:0.002484)Node257:0.001875,(((CY010020:0.002497,CY011416:0.001237)Node264:0.001252,CY009484:0.00062)Node263:0.005658,((CY010036:1e-10,(CY039879:0.002489,CY039880:0.000621)Node271:0.002487)Node269:0.003109,((CY010628:0.000619,(CY010716:0.002485,CY010516:0.001239)Node277:1e-10)Node275:0.000619,((CY012728:1e-10,CY013701:0.000621)Node281:0.001243,(((CY012760:0.001239,CY013200:0.001239)Node286:1e-10,CY011888:0.005614)Node285:1e-10,((CY013693:0.000619,(CY012184:0.002484,CY013669:0.00124)Node293:0.00124)Node291:1e-10,((CY112669:0.004353,(CY112556:0.001861,CY011896:0.000619)Node299:0.00186)Node297:1e-10,(CY112605:0.001243,(CY012224:0.006953,((CY012512:0.000619,(CY012896:0.00062,CY012232:0.00062)Node309:0.000621)Node307:1e-10,(CY011848:1e-10,(((CY011328:1e-10,CY114221:0.000619)Node316:0.001241,CY011560:0.00124)Node315:1e-10,((CY012456:0.000619,CY011824:0.00124)Node321:1e-10,CY017283:0.000619)Node320:1e-10)Node314:1e-10)Node312:1e-10)Node306:0.002439)Node304:0.008263)Node302:0.000618)Node296:1e-10)Node290:1e-10)Node284:0.000617)Node280:0.012609)Node274:0.000619)Node268:0.001215)Node262:0.003782)Node256:0.000613)Node250:0.006878)Node244:1e-10)Node238:0.001862)Node232:1e-10)Node228:1e-10)Node224:0.001863)Node222:0.001862)Node220:0.001245)Node214:1e-10)Node208:0.001241)Node202:0.021084)Node198:0.000623)Node192:0.00065)Node190:0.003713)Node184:0.002495)Node182:1e-10)Node176:0.005637)Node170:0.00313)Node168:0.002515)Node166:0.001876)Node160:1e-10)Node154:0.000623)Node148:1e-10)Node142:0.003749)Node136:1e-10)Node130:1e-10)Node128:0.000623)Node122:0.000623)Node116:0.001872)Node114:0.002503)Node110:1e-10)Node104:1e-10)Node102:0.000623)Node96:0.001468)Node90:0.00189)Node84:0.002721)Node78:0.002524)Node76:1e-10)Node74:0.000624)Node72:1e-10)Node66:1e-10)Node60:1e-10)Node58:0.000623)Node54:0.001248)Node48:0.001255)Node46:0.000619)Node40:1e-10)Node34:1e-10)Node28:1e-10)Node22:0.000623)Node16:1e-10)Node10:1e-10)Node4:1e-10);"
//const newick = "(LngfishAu:0.1712138893,(LngfishSA:0.1885373538,LngfishAf:0.1650265537)100/100/1/1/100:0.1073914123,(Frog:0.2565028045,((((Turtle:0.2216133575,(Crocodile:0.3059513139,Bird:0.2312887033)97.5/96.2/1/1/97:0.0651150445)84.7/81.5/0.999/0.996/66:0.0364970999,Sphenodon:0.3448942625)40.7/57.9/0.713/0.563/46:0.0204216770,Lizard:0.3862031542)98.6/98/1/1/99:0.0740356018,(((Human:0.1852568653,(Seal:0.0945277642,(Cow:0.0824031617,Whale:0.1013229312)99.4/99.5/1/1/100:0.0404431628)68.5/71.9/0.994/0.984/73:0.0252309021)93.7/89.2/1/1/91:0.0341003893,(Mouse:0.0584684101,Rat:0.0906100828)100/100/1/1/100:0.1218660486)99.4/99.5/1/1/100:0.0607211254,(Platypus:0.1920880923,Opossum:0.1510405021)94.4/95.8/1/1/98:0.0373739973)100/100/1/1/100:0.1491410949)99.9/100/1/1/100:0.1275388133)99.7/99.9/1/1/100:0.0941439456);"
//const newick = "(A,(B,C),(D,(E,F)));"
//const newick = "((((Pig:0.147969,Cow:0.21343)Node3:0.085099,Horse:0.165787,Cat:0.264806)Node2:0.058611,((RhMonkey:0.002015,Baboon:0.003108)Node9:0.022733,(Human:0.004349,Chimp:0.000799)Node12:0.011873)Node8:0.101856)Node1:0.340802,Rat:0.050958,Mouse:0.09795)"
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
      internal: false,
      newick: props.newick,
      nodeName:'',
      showlabel: true,
    };
    this.baseState = this.state;
    
  }
  // useEffect(()=>{
  //   let l=0;
  //   for(let i of newick) {
  //     if(i===",") l++;
  //   }
  //   if(l<20) {
  //   this.setState({height: 640})
  //   this.setState({width: 640})
  //   }
  //   else if(l<50 && l>=20) {
  //     this.setState({height: l*20})
  //   this.setState({width: 640})
    
  //   }
  //   else {
  //     this.setState({height: l*10})
  //   this.setState({width: l*10})
    
  //   }
  // }) 
    // let l=0;
    // for(let i of this.state.newick) {
    //   if(i===",") l++;
    // }
    // if(l<20) {
    // this.setState({height: 640})
    // this.setState({width: 640})
    // }
    // else if(l<50 && l>=20) {
    //   this.setState({height: l*20})
    // this.setState({width: 640})
    // this.setState({textsize: 6})
    // }
    // else {
    //   this.setState({height: l*10})
    // this.setState({width: l*10})
    // this.setState({textsize: 6})
    // }
  
  // const toggleDimension =( direction)=> {
  //   const new_dimension = [dimension] +
  //     (direction === "expand" ? 100 : -100),
  //     new_state = {};
  //   new_state[dimension] = new_dimension;
  //   setDimension(new_state);
  //   // setState(new_state);
  // }
  toggleDimension =(dimension, direction) => {
    const new_dimension = this.state[dimension] +
      (direction == "expand" ? 20 : -20),
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
        >      <a class="dropdown-item" tabindex="-1" onClick={()=> {this.setState({reroot: props.node});
              }}>Reroot on this node</a>
               <div class="dropdown-divider"></div>
               <a class="dropdown-item">Collapse Subtree</a>
               <a class="dropdown-item" tabindex="-1">Hide this subtree</a>
             </div> 
             
      )
    }
    render() {
    const { padding } = this.props;
    const { width, height } = this.state;
    return (<div class="container" >
      <h1>React Phylotree</h1>
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
        {/* <input
            type='checkbox'
            checked={this.state.showlabel}
            onChange={()=>this.setState({showlabel: !this.state.showlabel})}
            style={{margin:10}}
          />
          {this.state.showlabel ? 'Hide' : 'Show' } labels */}
          
        <form style={{display: "inline-block", float: "right"}}>
      <input
      type='text'
      name='find node'
      placeholder='Search tree'
      style={{height:40, textAlign:"center"}}
      onChange={this.myChangeHandler}
      />
    </form>
        
        <div >
          {/* <input
            type='checkbox'
            onChange={()=>this.setState({attribute: !this.state.attribute})}
            style={{marginRight: 5}}
          />
          {this.state.attribute ? 'Hide' : 'Show' } branch length */}
          <input
            type='checkbox'
            onChange={()=>this.setState({value1: !this.state.value1})}
            style={{marginInline: 5}}
          />
          {this.state.value1 ? 'Hide' : 'Show' } support value 1
          <input
            type='checkbox'
            onChange={()=>this.setState({value2: !this.state.value2})}
            style={{marginInline: 5}}
          />
          {this.state.value2 ? 'Hide' : 'Show' } support value 2
          <input
            type='checkbox'
            onChange={()=>this.setState({value3: !this.state.value3})}
            style={{marginInline: 5}}
          />
          {this.state.showValue3 ? 'Hide' : 'Show' } support value 3
          </div>
          <div>
          
          <input
            type='checkbox'
            onChange={()=>this.setState({value4: !this.state.value4})}
            style={{marginInline: 5}}
          />
          {this.state.value4 ? 'Hide' : 'Show' } support value 4
          <input
            type='checkbox'
            onChange={()=>this.setState({value5: !this.state.value5})}
            style={{marginInline: 5}}
          />
          {this.state.value5 ? 'Hide' : 'Show' } support value 5
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
  width: 600
};

export default PhylotreeApplication;

