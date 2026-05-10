const fetchFileAsFileObject = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new File([blob], filename, {
      type: blob.type,
      lastModified: Date.now(),
    });
  } catch {
    return null;
  }
};

export { fetchFileAsFileObject };
