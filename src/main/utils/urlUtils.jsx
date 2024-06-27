export const getLanguageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang');
  };
  