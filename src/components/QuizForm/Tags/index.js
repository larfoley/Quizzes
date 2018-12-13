import React from 'react'
import Tag from './Tag'

const Tags = ({ tags, deleteTag }) => (
  tags ? tags.map((tag, key) => <Tag key={key} name={tag.tagName} deleteTag={deleteTag}/>) : null
)

export default Tags
