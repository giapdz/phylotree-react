import React from "react";
import { line } from "d3-shape";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/phylotree.css"

function Branch(props) {

  const { xScale, yScale, colorScale, showLabel, setTooltip, showAttribute,tree, setIsOpen, showValue1, showValue2, showValue3, showValue4, showValue5, round1, round2, round3, round4, round5} = props,
    { source, target } = props.link,
    source_x = xScale(source.data.abstract_x),
    source_y = yScale(source.data.abstract_y),
    target_x = xScale(target.data.abstract_x),
    target_y = yScale(target.data.abstract_y),
    tracer_x2 = props.alignTips === "right" ?
      props.width - (target.data.text_width || 0) :
      target_x,
      round_1 = parseFloat(round1),
      round_2 = parseFloat(round2),
      round_3 = parseFloat(round3),
      round_4 = parseFloat(round4),
      round_5 = parseFloat(round5),
    data = [
      [source_x, source_y],
      [source_x, target_y],
      [target_x, target_y]
    ],
    data1 =[
      [target_x+18,target_y+10],
      [target_x-2,target_y],
      [target_x+18, target_y-10]
    ],
    branch_line = line()
      .x(d=>d[0])
      .y(d=>d[1]),
    computed_branch_styles = props.branchStyler ?
      props.branchStyler(target.data) :
    target.data.annotation && colorScale ? {
      stroke: colorScale(target.data.annotation)
    } : {},
    all_branch_styles = Object.assign(
      {}, props.branchStyle, computed_branch_styles
    ),
    label_style = target.data.name && props.labelStyler ?
      props.labelStyler(target.data) :
      {};
      if(target.hidden===true && target.collapsed===false && target.parent.hidden===true) return null;
      else if(target.hidden===true && target.collapsed===false && target.data.attribute !== '0') {
        return (
        <g class ="internal-node" >
        <path
      className="rp-branch"
      fill="none"
      d={branch_line(data)}
      {...all_branch_styles}

      onMouseMove={props.tooltip ? e => {
        setTooltip({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          data: target.data
        });
      } : undefined}
      onMouseOut={props.tooltip ? e => {
        setTooltip(false);
      } : undefined}
      onClick={ (e)=>{
        setIsOpen({
          left: e.nativeEvent.offsetX+50,
          top: e.nativeEvent.offsetY+80,
          position: 'absolute',
          display: 'block',
          node: target,
          nodeC: target
        })
      } }
    />
    <polygon points={data1}  fill="grey" 
         />
    {showAttribute ? <text
      x={source_x+(target_x-source_x)/2-20}
      y={target_y-8}
      textAnchor="start"
      alignmentBaseline="middle"
      className="rp-label"
    >{parseFloat(target.data.attribute).toFixed(4)}</text> : null }
    
    </g>)
      }
      else if(target.hidden===true && target.collapsed===false && target.data.attribute === '0') {
        return (
        <g class ="internal-node" >
        <path
      className="rp-branch"
      fill="none"
      d={branch_line(data)}
      {...all_branch_styles}

      onMouseMove={props.tooltip ? e => {
        setTooltip({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          data: target.data
        });
      } : undefined}
      onMouseOut={props.tooltip ? e => {
        setTooltip(false);
      } : undefined}
      onClick={ (e)=>{
        setIsOpen({
          left: e.nativeEvent.offsetX+50,
          top: e.nativeEvent.offsetY+80,
          position: 'absolute',
          display: 'block',
          nodeC: target
        })
      } }
    />
    <polygon points={data1}  fill="grey" 
         />
    {showAttribute ? <text
      x={source_x+(target_x-source_x)/2-20}
      y={target_y-8}
      textAnchor="start"
      alignmentBaseline="middle"
      className="rp-label"
    ></text> : null }
    
    </g>)
      }
     else if (target.hidden===true) return null;
      else {
   if(tree.isLeafNode(target)) {   
  return (
  <g className="node"
  >
    <path
      className="rp-branch"
      fill="none"
      d={branch_line(data)}
      {...all_branch_styles}
      
      onMouseMove={props.tooltip ? e => {
        setTooltip({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          data: target.data
        })
      } : undefined}
      onMouseOut={props.tooltip ? e => {
        setTooltip(false);
      } : undefined}
      onClick={props.isOpen ? (e)=>{
        setIsOpen({
          left: e.nativeEvent.offsetX+120,
          top: e.nativeEvent.offsetY+120,
          position: 'absolute',
          display: 'block',
          node: target
        })

      } : undefined }
    />
    {showAttribute ? <text
      x={source_x+(target_x-source_x)/2-20}
      y={target_y-8}
      textAnchor="start"
      alignmentBaseline="middle"
      className="rp-label"
    >{parseFloat(target.data.attribute).toFixed(4)}</text> : null }
    {showLabel ? <line
      x1={target_x}
      x2={tracer_x2}
      y1={target_y}
      y2={target_y}
      className="rp-branch-tracer"
    /> : null}
    {showLabel ? <text
      x={tracer_x2 + 5}
      y={target_y}
      textAnchor="start"
      alignmentBaseline="middle"
      {...Object.assign({}, props.labelStyle, label_style)}
      className="rp-label"
    >{target.data.name.split("/")[0].slice(0, props.maxLabelWidth)}</text> : null}
  </g>
  
);
    }
    
    else {
      return(
      <g class ="internal-node" >
        <path
      className="rp-branch"
      fill="none"
      d={branch_line(data)}
      {...all_branch_styles}

      onMouseMove={props.tooltip ? e => {
        setTooltip({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          data: target.data
        });
      } : undefined}
      onMouseOut={props.tooltip ? e => {
        setTooltip(false);
      } : undefined}
      onClick={ (e)=>{
        setIsOpen({
          left: e.nativeEvent.offsetX+50,
          top: e.nativeEvent.offsetY+80,
          position: 'absolute',
          display: 'block',
          node: target.data.attribute==='0'? null : target,
          nodeC: target,
        })
      } }
    />
    {showAttribute ? <text
      x={source_x+(target_x-source_x)/2-20}
      y={target_y-8}
      textAnchor="start"
      alignmentBaseline="middle"
      className="rp-label"
    >{target.data.attribute!=='0' ?  parseFloat(target.data.attribute).toFixed(4): null}</text> : null }
    {(()=>{ 
      if(target.data.name.includes('__reroot_top_clade')) {
        return null
      }
      else {
        if (target.data.name.split("/")[0]==='' && target.data.name.split("/")[1]!=='') {
          return null 
          }
      if ((!showValue5 && !showValue2 && !showValue3 && !showValue4) && showValue1) {return (<text
     x={source_x+(target_x-source_x)/2-13}
     y={target_y+10}
     textAnchor="start"
     alignmentBaseline="middle"
     className="rp-label"
     >
    {round_1=== -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}</text> )
     }
      if((!showValue5 && !showValue1 && !showValue3 && !showValue4) && showValue2) {
       return (
        <text
     x={source_x+(target_x-source_x)/2-13}
     y={target_y+10}
     textAnchor="start"
     alignmentBaseline="middle"
     className="rp-label"
     >
    {round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}</text> 
       )
     }
     
    if((!showValue1 && !showValue2 && !showValue4 && !showValue5) && showValue3) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-10}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}</text> 
      )
    }
    if((!showValue1 && !showValue2 && !showValue3 && !showValue5) && showValue4) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-10}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}</text> 
      )
    }
    if((!showValue1 && !showValue2 && !showValue3 && !showValue4) && showValue5) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-8}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue1 && showValue2) && !(showValue3 || showValue4 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-28}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}</text> 
      )
    }
    if((showValue1 && showValue3) && !(showValue2|| showValue4 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-28}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}</text> 
      )
    }
    if((showValue1 && showValue4) && !(showValue2 || showValue3 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-28}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}</text> 
      )
    }
    if((showValue1 && showValue5) && !(showValue3 || showValue4 || showValue2)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-28}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue2 && showValue3) && !(showValue1 || showValue4 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-28}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}</text> 
      )
    }
    if((showValue2 && showValue4) && !(showValue3 || showValue1 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-28}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}</text> 
      )
    }
    if((showValue2 && showValue5) && !(showValue3 || showValue4 || showValue1)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-28}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue3 && showValue4) && !(showValue1 || showValue2 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-20}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}</text> 
      )
    }
    if((showValue3 && showValue5) && !(showValue1 || showValue2 || showValue4)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-20}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue4 && showValue5) && !(showValue1 || showValue2 || showValue3)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-20}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue1 && showValue2 && showValue3) && !(showValue4 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-38}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}</text> 
      )
    }
    if((showValue1 && showValue2 && showValue4) && !(showValue3 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-38}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}</text> 
      )
    }
    if((showValue1 && showValue2 && showValue5) && !(showValue3 || showValue4)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-38}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue1 && showValue3 && showValue4) && !(showValue2 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-30}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}</text> 
      )
    }
    if((showValue1 && showValue3 && showValue5) && !(showValue2 || showValue4)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-34}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue1 && showValue4 && showValue5) && !(showValue2 || showValue3)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-38}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue2 && showValue3 && showValue4) && !(showValue1 || showValue5)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-30}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}</text> 
      )
    }
    if((showValue2 && showValue3 && showValue5) && !(showValue1 || showValue4)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-34}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue2 && showValue4 && showValue5) && !(showValue1 || showValue3)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-30}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue3 && showValue4 && showValue5) && !(showValue1 || showValue2)) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-30}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue1 && showValue2 && showValue3 && showValue4) && !showValue5) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-42}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}</text> 
      )
    }
    if((showValue1 && showValue2 && showValue3 && showValue5) && !showValue4) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-42}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue1 && showValue2 && showValue4 && showValue5) && !showValue3) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-42}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue1 && showValue3 && showValue4 && showValue5) && !showValue2) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-42}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if((showValue2 && showValue3 && showValue4 &&showValue5) && !showValue1) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-42}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
    if(showValue1 && showValue2 && showValue3 && showValue4 && showValue5) {
      return (
       <text
    x={source_x+(target_x-source_x)/2-48}
    y={target_y+10}
    textAnchor="start"
    alignmentBaseline="middle"
    className="rp-label"
    >
   {round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1)}/{round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2)}/{round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3)}/{round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4)}/{round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5)}</text> 
      )
    }
     else return null;
  }
    })()}
     
   </g>
      )}  
  } 
}

Branch.defaultProps = {
  branchStyle: {
    strokeWidth: 2,
    stroke: "grey"
  },
  labelStyle: {
  }
}

export default Branch;
