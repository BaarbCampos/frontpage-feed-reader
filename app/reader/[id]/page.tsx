export default function Page({ params }: { params: { id: string } }) {
  return <h1>Leitura: {params.id}</h1>;
}