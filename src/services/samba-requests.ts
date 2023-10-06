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

  public async post<T>(config: RequestConfig, data: object): Promise<T> {
    const response = await fetch(`${BACKEND_URL}/${config.path}`,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    );
    const json = await response.json();
    return json as T;
  };

};

export default SambaRequests;
