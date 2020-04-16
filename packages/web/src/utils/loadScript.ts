export const loadScript = (
  src: string,
  position: HTMLElement | null,
  id: string
) => {
  if (!position) {
    return;
  }

  const scripts = Array.from(document.querySelectorAll('script'));

  if (!!scripts.find((s) => s.src.includes('https://maps.googleapis.com'))) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
};
