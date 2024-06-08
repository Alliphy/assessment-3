export async function fetchArtworkImageIds() {
  const url = "https://api.artic.edu/api/v1/artworks?fields=image_id,title";
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  const { data } = await res.json();

  const imageIds = data
    .filter(
      (imageResponse) =>
        typeof imageResponse.image_id === "string" &&
        imageResponse.image_id.length > 0
    )
    .map((imageResponse) => imageResponse.image_id);

  return imageIds;
}
