export const handleShare = async (title: string, description: string, url: string, ogImage: string) => {
  if (!navigator.share) {
    alert("We're sorry, but it appears that your browser doesn't support sharing 😔");
    return;
  }

  try {
    await navigator.share({
      title,
      text: description,
      url,
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
};
