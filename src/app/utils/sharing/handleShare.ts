export const handleShare = async (title: string, description: string, url: string, ogImage: string) => {
  if (!navigator.share) {
    alert("We're sorry, but it appears that your browser doesn't support sharing 😔");
    return;
  }

  try {
    // const blob = await fetch(ogImage, {
    //   headers: {},
    //   cache: 'default',
    //   keepalive: true,
    //   mode: 'no-cors',
    // }).then((response) => response.blob());

    // const ogImageFile = new File([blob], 'og_image.webp', { type: 'image/webp' });

    await navigator.share({
      title,
      text: description,
      url,
      // files: [ogImageFile],
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
};
