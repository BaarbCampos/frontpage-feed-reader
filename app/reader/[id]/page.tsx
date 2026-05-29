import React from 'react'

export default function ReaderPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1>Lendo item: {params.id}</h1>
    </div>
  )
}