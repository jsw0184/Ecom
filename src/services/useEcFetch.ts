import endPoint from './endPoints';

const useEcFetch = () => {
  const baseUrl = endPoint.baseUrl;

  const fetchUrl = (url: string, body?: string | undefined) => {
    const mainUrl = url.indexOf('http') > -1 ? url : `${baseUrl}${url}`;
    return fetch(mainUrl, {
      method: body ? 'POST' : 'GET',
      body: JSON.stringify(body),
    }).then(res => res.json());
  };
  return fetchUrl;
};
export default useEcFetch;
