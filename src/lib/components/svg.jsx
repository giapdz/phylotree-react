import React from "react";

function SVG(props) {
    const { width, height, padding } = props,
        new_props = {
            width: width - 2 * padding,
            height: height - 2 * padding,
            transform: `translate(${padding}, ${0})`,
        };
    return React.createElement(
        "svg",
        {
            width: width,
            height: height,
            id: "svg-chart",
            style: {
                borderStyle: props.borderStyle,
                borderWidth: props.borderWidth,
                borderColor: props.borderColor,
            },
        },
        React.cloneElement(props.children, new_props)
    );
}

SVG.defaultProps = {
    padding: 50,
    margin: 20,
    borderColor: "lightgrey",
    id: "svg-chart",
};
export default SVG;
