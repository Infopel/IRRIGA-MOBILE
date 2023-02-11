type Data = {
  [x: string]: number | boolean | string
}

interface Params<T extends Data> {
  url: string
  data?: T
}
export function getForm(): Params<any> {
  return {
    url: `/getForm`,
  }
}
export function getDistrictsByProvince(fielterId: string, id: number): Params<any> {
  return {
    url: `/filterControlWithId/?Id=${fielterId}&name=${id}`,
  }
}
