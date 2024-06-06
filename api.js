export async function fetchArtworkLink() {
  const url = "https://api.artic.edu/api/v1/artworks?fields=image_id,title";
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  const { data } = await res.json();

  const links = data.map((imageResponse) =>
    convertIdToImageLink(imageResponse.image_id)
  );

  return pickRandomThingFromList(links);
}

function convertIdToImageLink(id) {
  return `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
}

function pickRandomThingFromList(list) {
  const chosenIndex = Math.ceil(Math.random() * list.length);
  return list[chosenIndex];
}
