import React from "react";

export default function ReaderPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1>Conteúdo do ID: {params.id}</h1>
    </div>
  );
}