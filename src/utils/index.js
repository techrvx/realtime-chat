import { theme } from "utils/theme";

export const SOCKET_SERVER_URL = "https://pager-hiring.herokuapp.com/";

export const GIPHY_API_KEY = "kwFHkASHqO7Gcka5RlwbIrPdXC9B5jCb";

export const getUIAvatarsUrl = (name) =>
  `https://ui-avatars.com/api/?name=${name}&size=40&font-size=0.4&background=${theme.colors.lighterGray.slice(
    1
  )}`;

export const getGiphyApiUrl = (query) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=1`;
