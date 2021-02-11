export async function readFile(file: File) {
  const data = await new Response(file).text();
  return data;
}
