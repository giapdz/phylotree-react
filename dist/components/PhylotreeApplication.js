"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _OverlayTrigger = _interopRequireDefault(require("react-bootstrap/OverlayTrigger"));

var _Tooltip = _interopRequireDefault(require("react-bootstrap/Tooltip"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _show_label = _interopRequireDefault(require("./styles/show_label.png"));

var _icon_length = _interopRequireDefault(require("./styles/icon_length.png"));

var _phylotree = _interopRequireDefault(require("./phylotree"));

var _tooltip_container = _interopRequireDefault(require("./tooltip_container"));

require("./styles/phylotree.css");

require("bootstrap/dist/css/bootstrap.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const saveSvgAsPng = require('save-svg-as-png');

const imageOptions = {
  scale: 5,
  encoderOptions: 1,
  backgroundColor: 'white'
};

function Button(props) {
  return /*#__PURE__*/_react.default.createElement(_OverlayTrigger.default, {
    placement: "top",
    overlay: /*#__PURE__*/_react.default.createElement(_Tooltip.default, null, props.title)
  }, /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
    variant: "secondary"
  }, props), props.children));
}

function Reload(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    style: {
      fontSize: 10
    },
    title: "Reload tree"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faRedo,
    size: "lg"
  }));
}

function HorizontalExpansionButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    style: {
      fontSize: 10
    },
    title: "Expand horizontally"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faArrowLeft
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 2,
    icon: _freeSolidSvgIcons.faArrowRight
  }));
}

function HorizontalCompressionButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    style: {
      fontSize: 10
    },
    title: "Compress horizontally"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faArrowRight
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 2,
    icon: _freeSolidSvgIcons.faArrowLeft
  }));
}

function VerticalExpansionButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    style: {
      fontSize: 10,
      display: "flex",
      flexDirection: "column"
    },
    title: "Expand vertically"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faArrowUp
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 2,
    icon: _freeSolidSvgIcons.faArrowDown
  }));
}

function VerticalCompressionButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    style: {
      fontSize: 10,
      display: "flex",
      flexDirection: "column"
    },
    title: "Compress vertically"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faArrowDown
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 2,
    icon: _freeSolidSvgIcons.faArrowUp
  }));
}

function AscendingSortButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    title: "Sort in ascending order"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faSortAmountUp,
    flip: "vertical"
  }));
}

function DescendingSortButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    title: "Sort in descending order"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faSortAmountUp
  }));
}

function AlignTipsRightButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    title: "Align tips to right"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faAlignRight
  }));
}

function AlignTipsLeftButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    title: "Align tips to left"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faAlignLeft
  }));
}

function DownloadImagetButton(props) {
  return /*#__PURE__*/_react.default.createElement(Button, _extends({
    title: "Save image"
  }, props), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    key: 1,
    icon: _freeSolidSvgIcons.faImage,
    flip: "vertical"
  }));
}

function TooltipContents(props) {
  return /*#__PURE__*/_react.default.createElement(_tooltip_container.default, _extends({
    tooltip_width: 10,
    tooltip_height: 50
  }, props), /*#__PURE__*/_react.default.createElement("rect", {
    x: 0,
    y: 0,
    width: 180,
    height: 20,
    fill: "bisque"
  }), /*#__PURE__*/_react.default.createElement("text", {
    x: 90,
    y: 15,
    fill: "cadetblue",
    textAnchor: "middle"
  }, "Length:  ", props.data.attribute));
}

class PhylotreeApplication extends _react.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "toggleDimension", (dimension, direction) => {
      const new_dimension = this.state[dimension] + (direction === "expand" ? 100 : -100),
            new_state = {};
      new_state[dimension] = new_dimension;
      this.setState(new_state);
      console.log([dimension]);
    });

    _defineProperty(this, "handleSort", direction => {
      this.setState({
        sort: direction
      });
    });

    _defineProperty(this, "alignTips", direction => {
      this.setState({
        alignTips: direction
      });
    });

    _defineProperty(this, "myChangeHandler", event => {
      this.setState({
        nodeName: event.target.value
      });
    });

    _defineProperty(this, "labelStyler", branch => {
      var rx = new RegExp(this.state.nodeName, "i");
      const identifier = branch.name.search(rx);

      if (this.state.nodeName !== '') {
        const fill = identifier !== -1 ? 'red' : 'black';
        return {
          fill
        };
      }
    });

    _defineProperty(this, "handleClick", () => {
      saveSvgAsPng.saveSvgAsPng(document.getElementById('svg-chart'), 'shapes.png', imageOptions);
    });

    _defineProperty(this, "openDropdown", props => {
      return /*#__PURE__*/_react.default.createElement("div", {
        class: "dropdown-menu",
        role: "menu",
        style: _objectSpread({}, props)
      }, "      ", /*#__PURE__*/_react.default.createElement("a", {
        class: "dropdown-item",
        tabindex: "-1",
        onClick: () => {
          this.setState({
            reroot: props.node
          });
        }
      }, "Reroot on this node"), /*#__PURE__*/_react.default.createElement("div", {
        class: "dropdown-divider"
      }), /*#__PURE__*/_react.default.createElement("a", {
        class: "dropdown-item"
      }, "Swap on this subtree"), /*#__PURE__*/_react.default.createElement("a", {
        class: "dropdown-item"
      }, "Flip on this subtree"));
    });

    this.state = {
      tree: null,
      width: _props.width,
      height: _props.height,
      sort: null,
      reroot: null,
      internal: false,
      newick: _props.newick,
      support: _props.support,
      nodeName: '',
      showlabel: true
    };
    this.baseState = this.state;
  } // useEffect(()=>{
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


  render() {
    const {
      padding
    } = this.props;
    const {
      width,
      height
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      class: "container"
    }, /*#__PURE__*/_react.default.createElement("h1", null, "React Phylotree"), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "inline-block",
        width: 800
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ButtonGroup.default, null, /*#__PURE__*/_react.default.createElement(Reload, {
      onClick: () => {
        this.setState(this.baseState);
      }
    }), /*#__PURE__*/_react.default.createElement(HorizontalExpansionButton, {
      onClick: () => this.toggleDimension("width", "expand")
    }), /*#__PURE__*/_react.default.createElement(HorizontalCompressionButton, {
      onClick: () => this.toggleDimension("width", "compress")
    }), /*#__PURE__*/_react.default.createElement(VerticalExpansionButton, {
      onClick: () => this.toggleDimension("height", "expand")
    }), /*#__PURE__*/_react.default.createElement(VerticalCompressionButton, {
      onClick: () => this.toggleDimension("height", "compress")
    }), /*#__PURE__*/_react.default.createElement(AscendingSortButton, {
      onClick: () => this.handleSort("ascending")
    }), /*#__PURE__*/_react.default.createElement(DescendingSortButton, {
      onClick: () => this.handleSort("descending")
    }), /*#__PURE__*/_react.default.createElement(AlignTipsLeftButton, {
      onClick: () => this.alignTips("left")
    }), /*#__PURE__*/_react.default.createElement(AlignTipsRightButton, {
      onClick: () => this.alignTips("right")
    }), /*#__PURE__*/_react.default.createElement(Button, {
      style: {
        fontSize: 10,
        width: 40
      },
      title: "Toggle the display of taxa names",
      onClick: () => this.setState({
        showlabel: !this.state.showlabel
      })
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _show_label.default,
      width: "18"
    })), /*#__PURE__*/_react.default.createElement(Button, {
      style: {
        fontSize: 10,
        width: 40
      },
      title: "Toggle the display of branch lengths",
      onClick: () => this.setState({
        attribute: !this.state.attribute
      })
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: _icon_length.default,
      width: "20"
    })), /*#__PURE__*/_react.default.createElement(DownloadImagetButton, {
      onClick: this.handleClick
    })), /*#__PURE__*/_react.default.createElement("form", {
      style: {
        display: "inline-block",
        float: "right"
      }
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "find node",
      placeholder: "Search tree",
      style: {
        height: 40,
        textAlign: "center"
      },
      onChange: this.myChangeHandler
    })), /*#__PURE__*/_react.default.createElement("div", {
      class: "row align-items-start",
      style: {
        width: 470
      }
    }, this.state.support.split('/')[0] ? /*#__PURE__*/_react.default.createElement("div", {
      class: "col"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      onChange: () => this.setState({
        value1: !this.state.value1
      }),
      style: {
        marginRight: 5
      }
    }), /*#__PURE__*/_react.default.createElement("text", null, this.state.value1 ? 'Hide' : 'Show', " ", this.state.support.split('/')[0])) : null, this.state.support.split('/')[1] ? /*#__PURE__*/_react.default.createElement("div", {
      class: "col"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      onChange: () => this.setState({
        value2: !this.state.value2
      }),
      style: {
        marginRight: 5
      }
    }), /*#__PURE__*/_react.default.createElement("text", null, this.state.value2 ? 'Hide' : 'Show', " ", this.state.support.split('/')[1])) : null, this.state.support.split('/')[2] ? /*#__PURE__*/_react.default.createElement("div", {
      class: "col"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      onChange: () => this.setState({
        value3: !this.state.value3
      }),
      style: {
        marginRight: 5
      }
    }), /*#__PURE__*/_react.default.createElement("text", null, this.state.value3 ? 'Hide' : 'Show', " ", this.state.support.split('/')[2])) : null, this.state.support.split('/')[3] ? /*#__PURE__*/_react.default.createElement("div", {
      class: "col"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      onChange: () => this.setState({
        value4: !this.state.value4
      }),
      style: {
        marginRight: 5
      }
    }), /*#__PURE__*/_react.default.createElement("text", null, this.state.value4 ? 'Hide' : 'Show', " ", this.state.support.split('/')[3])) : null, this.state.support.split('/')[4] ? /*#__PURE__*/_react.default.createElement("div", {
      class: "col"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      onChange: () => this.setState({
        value5: !this.state.value5
      }),
      style: {
        marginRight: 5
      }
    }), /*#__PURE__*/_react.default.createElement("text", null, this.state.value5 ? 'Hide' : 'Show', " ", this.state.support.split('/')[4])) : null))), /*#__PURE__*/_react.default.createElement(_phylotree.default, {
      width: width,
      height: height,
      transform: "translate(".concat(padding, ", ").concat(padding, ")"),
      labelStyler: this.labelStyler,
      newick: this.state.newick,
      alignTips: this.state.alignTips,
      sort: this.state.sort,
      reroot: this.state.reroot,
      showAttributes: this.state.attribute,
      showLabels: this.state.showlabel,
      showValue1: this.state.value1,
      showValue2: this.state.value2,
      showValue3: this.state.value3,
      showValue4: this.state.value4,
      showValue5: this.state.value5,
      tooltip: TooltipContents,
      isOpen: this.openDropdown,
      includeBLAxis: true
    }));
  }

}

PhylotreeApplication.defaultProps = {
  padding: 100,
  height: 600,
  width: 600,
  support: "value 1/value 2/value 3/value 4/value 5"
};
var _default = PhylotreeApplication;
exports.default = _default;