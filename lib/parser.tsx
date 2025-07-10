import React from 'react'

import { XMLParser } from 'fast-xml-parser'
import ReactMarkdown from 'react-markdown'

export const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
  parseTagValue: true,
  allowBooleanAttributes: true,
})

function renderXMLTag(tag: string, content: string | string[]) {
  // If content is an array, render each element
  if (Array.isArray(content)) {
    return content.map((c, i) => <React.Fragment key={i}>{renderXMLTag(tag, c)}</React.Fragment>)
  }
  // Otherwise, treat as string
  switch (tag) {
    case 'TITLE':
      return <h2 className="mb-2 text-xl font-bold">{content}</h2>
    case 'OPENING_REMARKS':
      return (
        <div className="mb-2 italic">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )
    case 'CLOSING_REMARKS':
      return (
        <div className="mt-2 italic">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )
    case 'INSERTION':
      return (
        <div className="my-1 rounded bg-green-50 px-2 py-1 text-green-700">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )
    case 'DELETION':
      return (
        <div className="my-1 rounded bg-red-50 px-2 py-1 text-red-700 line-through">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )
    case 'REPLACEMENT':
      return (
        <div className="my-1 rounded bg-blue-50 px-2 py-1 text-blue-700">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )
    case 'BRAINSTORMING':
      return (
        <div className="my-1 border-l-4 border-yellow-400 bg-yellow-50 p-2">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )
    case 'SUMMARY':
      return (
        <div className="my-1 rounded bg-gray-50 px-2 py-1 font-medium">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )
    case 'EXPLANATORY_REMARKS':
      return (
        <div className="mt-2 text-sm text-gray-600">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )
    default:
      return <div>{content}</div>
  }
}

// Recursively render the XML (for flat, non-nested structure)
export function renderParsedXML(parsed: Record<string, unknown>) {
  if (typeof parsed === 'string') return parsed
  return Object.entries(parsed).map(([tag, content], i) => (
    <div key={i}>{renderXMLTag(tag as string, content as string)}</div>
  ))
}
