import { BACKEND_URL } from "../config/constants";

type RequestConfig = {
  path: string
}

export class SambaRequests {
  public async get<T>(config: RequestConfig): Promise<T> {
    const resp = await fetch(`${BACKEND_URL}/${config.path}`);
    const json = await resp.json();
    return json as T;
  };
};

export default SambaRequests;
