import { ResponseError } from "@seg-apps-web/api-interfaces";

export class HTTP {
  constructor(public baseURL: string) { }
  async get<T>(url = '') {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(this.baseURL + url, {
      method: 'GET',
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      // credentials: 'omit', // include, *same-origin, omit
      headers: {
       /*  'Content-Type': 'application/json' */
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    const payload = await response.json()

    if (response.ok) {
      return {
        ok: true as const,
        payload: payload as T
      }
    }

    return {
      ok: false as const,
      payload: payload as ResponseError
    }

  }

  async post<T>(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(this.baseURL + url, {
      method: 'POST',
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      // credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    const payload = await response.json()

    if (response.ok) {
      return {
        ok: true as const,
        payload: payload as T
      }
    }

    return {
      ok: false as const,
      payload: payload as ResponseError
    }

  }
}