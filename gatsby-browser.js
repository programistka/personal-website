import React from 'react'
import { PoseGroup } from 'react-pose'

export const replaceComponentRenderer = ({ props }) => {
  const { component } = props.pageResources;
  return (
    // <PoseGroup>
        React.createElement(component, props)
    // </PoseGroup>
  )
};