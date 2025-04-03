'use client';

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment, isValidElement } from 'react';
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { EditIcon } from '../../icons/Edit/index.js';
import { LinkIcon } from '../../icons/Link/index.js';
import { PlusIcon } from '../../icons/Plus/index.js';
import { SwapIcon } from '../../icons/Swap/index.js';
import { XIcon } from '../../icons/X/index.js';
import { Link } from '../Link/index.js';
import { Popup } from '../Popup/index.js';
import { Tooltip } from '../Tooltip/index.js';
import './index.scss';
const icons = {
  chevron: ChevronIcon,
  edit: EditIcon,
  link: LinkIcon,
  plus: PlusIcon,
  swap: SwapIcon,
  x: XIcon
};
const baseClass = 'btn';
export const ButtonContents = ({
  children,
  icon,
  showTooltip,
  tooltip
}) => {
  const BuiltInIcon = icons[icon];
  return /*#__PURE__*/_jsxs(Fragment, {
    children: [tooltip && /*#__PURE__*/_jsx(Tooltip, {
      className: `${baseClass}__tooltip`,
      show: showTooltip,
      children: tooltip
    }), /*#__PURE__*/_jsxs("span", {
      className: `${baseClass}__content`,
      children: [children && /*#__PURE__*/_jsx("span", {
        className: `${baseClass}__label`,
        children: children
      }), icon && /*#__PURE__*/_jsxs("span", {
        className: `${baseClass}__icon`,
        children: [/*#__PURE__*/isValidElement(icon) && icon, BuiltInIcon && /*#__PURE__*/_jsx(BuiltInIcon, {})]
      })]
    })]
  });
};
export const Button = props => {
  const {
    id,
    type = 'button',
    'aria-label': ariaLabel,
    buttonStyle = 'primary',
    children,
    className,
    disabled,
    el = 'button',
    enableSubMenu,
    icon,
    iconPosition = 'right',
    iconStyle = 'without-border',
    newTab,
    onClick,
    onMouseDown,
    ref,
    round,
    size = 'medium',
    SubMenuPopupContent,
    to,
    tooltip,
    url
  } = props;
  const [showTooltip, setShowTooltip] = React.useState(false);
  const classes = [baseClass, className && className, icon && `${baseClass}--icon`, iconStyle && `${baseClass}--icon-style-${iconStyle}`, icon && !children && `${baseClass}--icon-only`, size && `${baseClass}--size-${size}`, icon && iconPosition && `${baseClass}--icon-position-${iconPosition}`, tooltip && `${baseClass}--has-tooltip`, !SubMenuPopupContent && `${baseClass}--withoutPopup`].filter(Boolean).join(' ');
  function handleClick(event) {
    setShowTooltip(false);
    if (type !== 'submit' && onClick) {
      event.preventDefault();
    }
    if (onClick) {
      onClick(event);
    }
  }
  const styleClasses = [buttonStyle && `${baseClass}--style-${buttonStyle}`, disabled && `${baseClass}--disabled`, round && `${baseClass}--round`, SubMenuPopupContent ? `${baseClass}--withPopup` : `${baseClass}--withoutPopup`].filter(Boolean).join(' ');
  const buttonProps = {
    id,
    type,
    'aria-disabled': disabled,
    'aria-label': ariaLabel,
    className: !SubMenuPopupContent ? [classes, styleClasses].join(' ') : classes,
    disabled,
    onClick: !disabled ? handleClick : undefined,
    onMouseDown: !disabled ? onMouseDown : undefined,
    onPointerEnter: tooltip ? () => setShowTooltip(true) : undefined,
    onPointerLeave: tooltip ? () => setShowTooltip(false) : undefined,
    rel: newTab ? 'noopener noreferrer' : undefined,
    target: newTab ? '_blank' : undefined
  };
  let buttonElement;
  let prefetch;
  switch (el) {
    case 'anchor':
      buttonElement = /*#__PURE__*/_jsx("a", {
        ...buttonProps,
        href: !disabled ? url : undefined,
        ref: ref,
        children: /*#__PURE__*/_jsx(ButtonContents, {
          icon: icon,
          showTooltip: showTooltip,
          tooltip: tooltip,
          children: children
        })
      });
      break;
    case 'link':
      if (disabled) {
        buttonElement = /*#__PURE__*/_jsx("div", {
          ...buttonProps,
          children: /*#__PURE__*/_jsx(ButtonContents, {
            icon: icon,
            showTooltip: showTooltip,
            tooltip: tooltip,
            children: children
          })
        });
      }
      buttonElement = /*#__PURE__*/_jsx(Link, {
        ...buttonProps,
        href: to || url,
        prefetch: prefetch,
        children: /*#__PURE__*/_jsx(ButtonContents, {
          icon: icon,
          showTooltip: showTooltip,
          tooltip: tooltip,
          children: children
        })
      });
      break;
    default:
      const Tag = el // eslint-disable-line no-case-declarations
      ;
      buttonElement = /*#__PURE__*/_jsx(Tag, {
        ref: ref,
        type: "submit",
        ...buttonProps,
        children: /*#__PURE__*/_jsx(ButtonContents, {
          icon: icon,
          showTooltip: showTooltip,
          tooltip: tooltip,
          children: children
        })
      });
      break;
  }
  if (SubMenuPopupContent) {
    return /*#__PURE__*/_jsxs("div", {
      className: styleClasses,
      children: [buttonElement, /*#__PURE__*/_jsx(Popup, {
        button: /*#__PURE__*/_jsx(ChevronIcon, {}),
        buttonSize: size,
        className: disabled && !enableSubMenu ? `${baseClass}--popup-disabled` : '',
        disabled: disabled && !enableSubMenu,
        horizontalAlign: "right",
        id: `${id}-popup`,
        noBackground: true,
        render: ({
          close
        }) => SubMenuPopupContent({
          close: () => close()
        }),
        size: "large",
        verticalAlign: "bottom"
      })]
    });
  }
  return buttonElement;
};
//# sourceMappingURL=index.js.map